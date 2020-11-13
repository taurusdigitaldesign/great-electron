const { autoUpdater } = require('electron-updater');

import GreatWindow from '../../GreatWindow';
import IGreatPlugin from '../IGreatPlugin';

class GreatUpdater implements IGreatPlugin {
  // 安装包是否已经下载
  isDownLoaded: boolean = false;

  checkUpdate() {
    this.isDownLoaded ? console.info('is downloaded') : autoUpdater.checkForUpdates();
  }

  install() {
    if (this.isDownLoaded) {
      autoUpdater.quitAndInstall();
    }
  }

  private init() {
    autoUpdater.on('checking-for-update', () => console.info('GreatUpdater: Checking for update'));

    autoUpdater.on('error', () => {
      console.info('GreatUpdater: An error occurred during updateing');
      //   dialog.showErrorBox(
      //     'An error occurred during updateing',
      //     `Application couldn't be updated. Please try again or contact the support team.`
      //   );
    });

    
  }

  create(mainWin: GreatWindow) {
    console.info('GreatUpdater: create');

    autoUpdater.autoDownload = false;
    console.info(autoUpdater.getFeedURL());
    this.init();
  }

  willDestroy(app: any, mainWin: GreatWindow) {
    console.info('GreatUpdater: willDestroy');
  }
}

export default GreatUpdater;
