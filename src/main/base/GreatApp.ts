import { app as electron_app, BrowserWindow } from 'electron';
import GreatWindow from './GreatWindow';
import IGreatPlugin from './plugins/IGreatPlugin';
class GreatApp {
  static instance: GreatApp;

  app: any = electron_app;
  
  // 主窗口
  win: GreatWindow = null;

  // 插件列表
  plugins: Array<IGreatPlugin> = [];

  // 公共设置
  config = {
    // 是否打开调试面板
    openDevTool: false
  };

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
      this.app.whenReady().then(() => {
        this.win = callback();
        this.plugins.map(plugin => plugin.create(this.win));
      });
      // Mac平台
      this.app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) callback();
      });
      return;
    }
    this.app.on(event, callback);
  }
}

export default GreatApp;
