import {
  app as electron_app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  ipcMain
} from 'electron';
import { platform } from 'os';

import GreatWindow from './GreatWindow';
import GreatWinConfig from './GreatWinConfig';
import GreatService from './service';
import { IPCClient, IPCServer, IIPCServer } from './ipc';
import IGreatPlugin from './plugins/IGreatPlugin';

class GreatApp {
  static instance: GreatApp;

  app: any = electron_app;
  ipc: IIPCServer;

  // 主窗口
  private url: string = '';
  private mainWin: GreatWindow;
  private mainWinOptions: BrowserWindowConstructorOptions;

  // 服务层
  private serviceWin: GreatService;

  // 插件列表
  private plugins: Array<IGreatPlugin> = [];
  private servicePlugins: Array<IGreatPlugin> = [];

  // 构造函数
  constructor(url: string, options: BrowserWindowConstructorOptions) {
    if (!GreatApp.instance) {
      this.url = url;
      this.mainWinOptions = options;
      this.app.ipcRenderWrapper = IPCClient;
      GreatApp.instance = this;

      this.app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') this.app.quit();
      });
    }
    return GreatApp.instance;
  }

  isWin() {
    return platform().startsWith('win');
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
  }

  getPlugin(name: String) {
    return this.plugins.find(p => p.constructor.name == name);
  }

  useServicePlugin(plugins: IGreatPlugin | Array<IGreatPlugin>) {
    if (plugins instanceof Array) {
      this.servicePlugins = this.servicePlugins.concat(plugins);
    } else {
      this.servicePlugins.push(plugins);
    }
  }

  // 启动
  start(callback?: Function) {
    const creat = () => {
      this.createMainWindow();
      this.serviceWin = new GreatService();
      this.ipc = new IPCServer(ipcMain, this.mainWin.win, this.serviceWin);
      this.plugins.map((p) => p.create(this));
      callback && callback();
    };

    this.app.whenReady().then(() => creat());
    // Mac平台
    this.app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) creat();
    });
    // 硬件加速
    !GreatWinConfig.hardwareAcceleration && this.app.disableHardwareAcceleration();
    // 禁止多开程序
    const gotTheLock = this.app.requestSingleInstanceLock();
    if (!gotTheLock) {
      this.app.quit();
    } else {
      this.app.on('second-instance', () => {
        // 当运行第二个实例时, 将会聚焦到mainWindow这个窗口
        const win = this.mainWin.win;
        if (win) {
          win.isMinimized() && win.restore();
          win.focus();
          // win.show();
        }
      });
    }
  }

  // 关闭
  quit() {
    this.mainWin?.win?.destroy();
    this.serviceWin && this.serviceWin.destroy();
    !platform().startsWith('win') && this.app.quit();
  }

  // 原生事件
  on(event: string, callback) {
    this.app.on(event, callback);
  }

  // 创建主窗口
  private createMainWindow() {
    this.mainWin = new GreatWindow(this.url, this.mainWinOptions);
  }

  // 获取实例
  static getInstance() {
    return GreatApp.instance;
  }
}

export default GreatApp;
