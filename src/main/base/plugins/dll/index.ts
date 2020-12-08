import ffi from 'ffi-napi';
import fs from 'fs';

import GreatApp from '../../GreatApp';
import IGreatPlugin from '../IGreatPlugin';

class GreatDLL implements IGreatPlugin {
  // DLL路径
  private dllPath: string;
  // methods
  private methods;
  // dll object
  private dllObj;

  constructor(path, methods) {
    this.dllPath = path;
    this.methods = methods;
  }

  create(app: GreatApp) {
    console.info('GreatDLL:create');
    return this.loadDLL();
  }

  willDestroy(app: GreatApp) {
    console.info('GreatDLL:willDestroy');
  }

  getDllObj() {
    return this.dllObj;
  }

  private loadDLL() {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(this.dllPath)) {
        console.info('GreatDLL: ' + this.dllPath);
        resolve(null);
        return;
      }
      const t = Date.now();
      this.dllObj = ffi.Library(this.dllPath, this.methods);
      console.info('GreatDLL:load Finish:', Date.now() - t, 'ms');
      resolve(this.dllObj);
    });
  }
}

export { GreatDLL };
