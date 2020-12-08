const { autoUpdater } = require('electron-updater');

import GreatApp from '../../GreatApp';
import IGreatPlugin from '../IGreatPlugin';

enum GreatUpdaterEvent {
  ERROR = 'error',
  CHECKING = 'checking-for-update',
  NOTAVAILABLE = 'update-not-available',
  AVAILABLE = 'update-available',
  DOWNLOADED = 'update-downloaded',
  DOWNLOADING = 'download-progress'
}

class GreatUpdater implements IGreatPlugin {
  // 安装包是否已经下载
  isDownLoaded: boolean = false;
  app: InstanceType<typeof GreatApp>;

  checkUpdate() {
    if(this.isDownLoaded) {
      this.sendUpdateStateToWin(GreatUpdaterEvent.DOWNLOADED)
    } else {
      autoUpdater.checkForUpdates()
    }
  }

  install() {
    if (this.isDownLoaded) {
      autoUpdater.quitAndInstall();
    }
  }

  private sendUpdateStateToWin(status, data?) {
    this.app.ipc.emit("checkUpdate", status, data)
  }

  private init() {
   
    // 检查更新
    this.app.ipc.on('checkUpdate', () => {
      this.checkUpdate();
    });

    // 下载更新
    this.app.ipc.on('downloadUpdate', () => {
      autoUpdater.downloadUpdate();
    }); 

    // 安装
    this.app.ipc.on('install', () => {
      autoUpdater.auitAndInstall();
    });

    autoUpdater.on(GreatUpdaterEvent.CHECKING, () =>
      console.info('GreatUpdater: Checking for update')
    );

    autoUpdater.on(GreatUpdaterEvent.ERROR, () => {
      console.info('GreatUpdater: An error occurred during updateing');
      //   dialog.showErrorBox(
      //     'An error occurred during updateing',
      //     `Application couldn't be updated. Please try again or contact the support team.`
      //   );
    });

    autoUpdater.on(GreatUpdaterEvent.AVAILABLE, (params) => {
      console.info('GreatUpdater: find a new version');
      this.sendUpdateStateToWin(GreatUpdaterEvent.AVAILABLE, params)
    });

    autoUpdater.on(GreatUpdaterEvent.NOTAVAILABLE, () => {
      console.info('GreatUpdater: it is lastest version');
      this.sendUpdateStateToWin(GreatUpdaterEvent.NOTAVAILABLE)
    });

    autoUpdater.on(GreatUpdaterEvent.DOWNLOADED, () => {
      console.info('GreatUpdater: install package is downloaded');
      this.sendUpdateStateToWin(GreatUpdaterEvent.DOWNLOADED)
    });

    autoUpdater.on(GreatUpdaterEvent.DOWNLOADING, (params) => {
      this.sendUpdateStateToWin(GreatUpdaterEvent.DOWNLOADING, params)
      // to do
    });
  }

  create(app: GreatApp) {
    console.info('GreatUpdater: create');
    this.app = app;

    autoUpdater.autoDownload = false;
    // console.info(autoUpdater.getFeedURL());
    this.init();
  }

  willDestroy(app: GreatApp) {
    console.info('GreatUpdater: willDestroy');
  }
}

export { GreatUpdater, GreatUpdaterEvent };
