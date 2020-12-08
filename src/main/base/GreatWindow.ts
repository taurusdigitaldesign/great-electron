import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import GreatWinConfig from './GreatWinConfig';

class GreatWindow {
  // URL
  url: string = '';
  // 窗口对象
  win: BrowserWindow;

  constructor(url: string, options: BrowserWindowConstructorOptions) {
    this.url = url;
    this.win = new BrowserWindow(options);
    GreatWinConfig.loadUrl ? this.win.loadURL(url) : this.win.loadFile(url);
    GreatWinConfig.openDevTool && this.win.webContents.openDevTools();
  }
}

export default GreatWindow;
