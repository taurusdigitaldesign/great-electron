import path from 'path';
import { BrowserWindow } from 'electron';

class GreatService extends BrowserWindow {
  constructor() {
    super({
      show: true,
      width: 500,
      height: 400,
      fullscreen: false,
      skipTaskbar: false,
      webPreferences: {
        enableRemoteModule: true,
        nodeIntegration: true,
        preload: path.join(__dirname, './public/preload/service.js')
      }
    });

    this.loadFile(path.join(__dirname, './public/preload/index.html'));
  }
}

export default GreatService;
