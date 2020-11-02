import { Menu, Tray } from 'electron';
import GreatWindow from '../../GreatWindow';
import IGreatPlugin from '../IGreatPlugin';
import IGreatTrayMenu from './IGreatTrayMenu';

class GreatTray implements IGreatPlugin {
  // 图标
  icon: string = '';
  // 菜单
  menus: Array<IGreatTrayMenu> = [];

  tray: Tray = null;

  constructor(icon?: string, ) {
    this.icon = '';
    this.tray = new Tray(icon);
  }

  init(win: GreatWindow) {
    this.tray.setContextMenu(Menu.buildFromTemplate([]));
    this.tray.on('double-click', () => {
      win.show();
      //模拟桌面程序点击通知区图标实现打开关闭应用的功能
      win.setSkipTaskbar(!win.isVisible());
    })
  }

  create(win: GreatWindow) {
    console.log('GreatTray:create');
    this.init(win);
  }

  willDestroy() {
    console.log('GreatTray:willDestroy');
    // this.tray.destroy();
  }
}

export default GreatTray;
