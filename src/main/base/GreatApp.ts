import { app, BrowserWindow } from 'electron';
class GreatApp {
  static instance: GreatApp;

  app: any = app;

  constructor() {
    if (!GreatApp.instance) {
      GreatApp.instance = this;
    }
    return GreatApp.instance;
  }

  static getInstance() {
    return GreatApp.instance;
  }

  on(event, callback) {
    if (event === 'create') {
      app.whenReady().then(callback);
      app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) callback();
      });
      return;
    }
    app.on(event, callback);
  }
}

export default GreatApp;
