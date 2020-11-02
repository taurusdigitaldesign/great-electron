import { BrowserWindow } from 'electron';

class GreatService extends BrowserWindow {
  constructor() {
    super({
      show: false,
      fullscreen: false,
      skipTaskbar: false,
      webPreferences: {
        nodeIntegration: true
      }
    });
  }
}

export default GreatService;
