import {
  app as electron_app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  ipcMain
} from 'electron';

import GreatWindow from './GreatWindow';
import GreatService from './service';
import { IpcRender as IpcRenderWrapper, IpcMain as IpcMainWrapper } from './ipc';
import IGreatPlugin from './plugins/IGreatPlugin';

class GreatApp {
  static instance: GreatApp;

  app: any = electron_app;

  // 主窗口
  private mainWin: GreatWindow = null;
  private url: string = '';
  private mainWinOptions: BrowserWindowConstructorOptions = null;

  // 服务层
  private serviceWin: any = null;

  // 插件列表
  private plugins: Array<IGreatPlugin> = [];

  // 构造函数
  constructor(url: string, options: BrowserWindowConstructorOptions) {
    if (!GreatApp.instance) {
      this.url = url;
      this.mainWinOptions = options;
      this.app.ipcRenderWrapper = IpcRenderWrapper;
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
  start(callback?: Function) {
    const creat = () => {
      this.createMainWindow();
      this.serviceWin = new GreatService();
      IpcMainWrapper(ipcMain, this.mainWin.win, this.serviceWin);

      this.plugins.map((plugin) => plugin.create(this.mainWin));
      callback && callback();
    };

    this.app.whenReady().then(() => creat());
    // Mac平台
    this.app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) creat();
    });
  }

  on(event, callback) {
    this.app.on(event, callback);
  }

  // 创建主窗口
  private createMainWindow() {
    this.mainWin = new GreatWindow(
      this.url,
      this.mainWinOptions
    );
  }

  // 获取实例
  static getInstance() {
    return GreatApp.instance;
  }
}

export default GreatApp;
