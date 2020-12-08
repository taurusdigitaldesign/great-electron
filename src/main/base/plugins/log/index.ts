import * as log from 'electron-log';
import GreatApp from '../../GreatApp';
import GreatWinConfig from '../../GreatWinConfig';
import IGreatPlugin from '../IGreatPlugin';

class GreatLog implements IGreatPlugin {
  create(app: GreatApp) {
    console.info('GreatLog:create');

    log.transports.file.level = 'silly';
    log.transports.console.level = 'silly';

    if (GreatWinConfig.openDevTool) {
      console.info = log.info;
      console.debug = log.debug;
      console.warn = log.warn;
      console.error = log.error;
    }
  }

  willDestroy(app: GreatApp) {
    console.info('GreatLog:willDestroy');
  }
}

export { GreatLog };
