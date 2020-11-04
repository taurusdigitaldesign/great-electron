import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import GreatApp from './GreatApp';

class GreatWindow {
  // URL
  url: string = '';
  // 窗口对象
  win: BrowserWindow = null;

  constructor(url: string, options: BrowserWindowConstructorOptions) {
    this.url = url;
    this.win = new BrowserWindow(options);
  }

  init(url: string) {
    this.win.loadFile(url);
    GreatApp.getInstance().config.openDevTool && this.win.webContents.openDevTools();
  }
}

export default GreatWindow;
