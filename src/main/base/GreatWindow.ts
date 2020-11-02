import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import GreatApp from './GreatApp';

class GreatWindow extends BrowserWindow {
  constructor(options: BrowserWindowConstructorOptions) {
    super(options);
  }

  init(url: string) {
    this.loadFile(url);
    GreatApp.getInstance().config.openDevTool && this.webContents.openDevTools();
  }
}

export default GreatWindow;
