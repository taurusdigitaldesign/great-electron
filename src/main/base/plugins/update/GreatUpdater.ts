const { autoUpdater } = require('electron-updater');

import GreatWindow from '../../GreatWindow';
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

  checkUpdate() {
    this.isDownLoaded ? console.info('is downloaded') : autoUpdater.checkForUpdates();
  }

  install() {
    if (this.isDownLoaded) {
      autoUpdater.quitAndInstall();
    }
  }

  private init() {
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

    autoUpdater.on(GreatUpdaterEvent.AVAILABLE, () => {
      console.info('GreatUpdater: find a new version');
    });

    autoUpdater.on(GreatUpdaterEvent.NOTAVAILABLE, () => {
      console.info('GreatUpdater: it is lastest version');
    });

    autoUpdater.on(GreatUpdaterEvent.DOWNLOADED, () => {
      console.info('GreatUpdater: install package is downloaded');
    });

    autoUpdater.on(GreatUpdaterEvent.DOWNLOADING, () => {
      // to do
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

export { GreatUpdater, GreatUpdaterEvent };
