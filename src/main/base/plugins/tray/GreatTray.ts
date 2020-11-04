import { join } from 'path';
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

  constructor(icon?: string) {
    this.icon = icon || join(__dirname, './icon/tray.png');;
  }

  init(mainWin: GreatWindow) {
    const win = mainWin.win;
    this.tray.setContextMenu(Menu.buildFromTemplate([]));
    this.tray.on('double-click', () => {
      win.show();
      //模拟桌面程序点击通知区图标实现打开关闭应用的功能
      win.setSkipTaskbar(!win.isVisible());
    })
  }

  create(mainWin: GreatWindow) {
    console.log('GreatTray:create');
    this.tray = new Tray(this.icon);
    this.init(mainWin);
  }

  willDestroy(app: any, mainWin: GreatWindow) {
    console.log('GreatTray:willDestroy');
    // this.tray.destroy();
  }
}

export default GreatTray;
