import * as log from 'electron-log';
import GreatWindow from '../../GreatWindow';
import IGreatPlugin from '../IGreatPlugin';

class GreatLog implements IGreatPlugin {

  create(mainWin: GreatWindow) {
    console.log('GreatLog:create');

    log.transports.file.level = 'silly';
    log.transports.console.level = 'silly';
    
    console.info = log.info;
    console.debug = log.debug;
    console.warn = log.warn;
    console.error = log.error;
  }

  willDestroy(app: any, mainWin: GreatWindow) {
    console.log('GreatLog:willDestroy');
  }
}

export { GreatLog };
