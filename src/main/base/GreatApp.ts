import { join } from 'path';
import { app as electron_app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import isDev from 'electron-is-dev';
import GreatWindow from './GreatWindow';
import IGreatPlugin from './plugins/IGreatPlugin';

class GreatApp {
  static instance: GreatApp;

  app: any = electron_app;

  // 公共设置
  config = {
    // 是否打开调试面板
    openDevTool: false
  };

  // 主窗口
  private mainWin: GreatWindow = null;
  private url: string = '';
  private mainWinOptions: BrowserWindowConstructorOptions = null;

  // 插件列表
  private plugins: Array<IGreatPlugin> = [];

  // 构造函数
  constructor(url: string, options: BrowserWindowConstructorOptions) {
    if (!GreatApp.instance) {
      this.url = url;
      this.mainWinOptions = options;
      GreatApp.instance = this;

      this.app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') this.app.quit();
      });
    }
    return GreatApp.instance;
  }

  getMainWindow() {
    return this.mainWin.win;
  }

  usePlugin(plugins: IGreatPlugin | Array<IGreatPlugin>) {
    if (plugins instanceof Array) {
      this.plugins = this.plugins.concat(plugins);
    } else {
      this.plugins.push(plugins);
    }
    return this;
  }

  // 启动
  start(callback?:Function) {
    this.app.whenReady().then(() => {
      this.createMainWindow();
      this.plugins.map((plugin) => plugin.create(this.mainWin));
      callback && callback();
    });
    // Mac平台
    this.app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createMainWindow();
        this.plugins.map((plugin) => plugin.create(this.mainWin));
        callback && callback();
      }
    });
  }

  on(event, callback) {
    this.app.on(event, callback);
  }

  // 创建主窗口
  private createMainWindow() {
    this.mainWin = new GreatWindow(
      isDev ? join(this.app.getAppPath(), this.url) : this.url,
      this.mainWinOptions
    );
  }

  // 获取实例
  static getInstance() {
    return GreatApp.instance;
  }
}

export default GreatApp;
