const builder = require('electron-builder');
const Platform = builder.Platform;

const channels = ['1'];

const doPublish = (index) => {
  if (index > channels.length - 1) {
    return;
  } else {
    console.log(`begin build ${index} channel`);
  }

  builder.build({
    targets: Platform.WINDOWS.createTarget(),
    config: {
      extends: null,
      productName: 'GreatElectron',
      appId: 'cn.com.great.client',
      extraResources: {
        from: './dist/main/libs',
        to: 'libs'
      },
      directories: {
        output: 'release/${version}_setup_' + channels[index]
      },
      files: ['dist/main/**/*', 'dist/main/public', 'dist/render/**/*'],
      mac: {
        target: ['dmg', 'zip'],
        icon: 'dist/main/public/icon/icon_mac.png'
      },
      win: {
        requestedExecutionLevel: 'requireAdministrator',
        target: [
          {
            target: 'nsis',
            arch: ['x64', 'ia32']
          }
        ],
        artifactName: '${productName}_setup_${version}.${ext}',
        icon: 'dist/main/public/icon/icon_win.ico'
      },
      publish: [
        {
          provider: 's3',
          bucket: 'quickfox-pc'
        }
      ],
      nsis: {
        oneClick: false,
        perMachine: true,
        allowElevation: true,
        allowToChangeInstallationDirectory: true,
        deleteAppDataOnUninstall: true
      },
      afterAllArtifactBuild() {
        doPublish(index+1);
      }
    }
  });
}

doPublish(0);

