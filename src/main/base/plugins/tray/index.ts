import GreatWindow from '../../GreatWindow';
import IGreatPlugin from '../IGreatPlugin';

class GreatTray implements IGreatPlugin {
  create(win: GreatWindow) {
    // todo
    console.log('create');
  }

  willDestroy() {
    // todo
    console.log('willDestroy');
  }
}

export default GreatTray;
