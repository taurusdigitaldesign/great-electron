import { app as electron_app, BrowserWindow } from 'electron';
class GreatApp {
  static instance: GreatApp;

  app: any = electron_app;

  constructor() {
    if (!GreatApp.instance) {
      GreatApp.instance = this;
      this.app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') this.app.quit();
      });
    }
    return GreatApp.instance;
  }

  static getInstance() {
    return GreatApp.instance;
  }

  on(event, callback) {
    if (event === 'create') {
      this.app.whenReady().then(callback);
      this.app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) callback();
      });
      return;
    }
    this.app.on(event, callback);
  }
}

export default GreatApp;
