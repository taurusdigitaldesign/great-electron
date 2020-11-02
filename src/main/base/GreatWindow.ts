import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
class GreatWindow extends BrowserWindow {
  constructor(options: BrowserWindowConstructorOptions) {
    super(options);
  }

  init(url: string) {
    this.loadFile(url);
    this.webContents.openDevTools();
  }
}

export default GreatWindow;
