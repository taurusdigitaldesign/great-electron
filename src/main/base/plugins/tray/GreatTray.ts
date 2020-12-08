import { join } from 'path';
import { Menu, MenuItemConstructorOptions, Tray, BrowserWindow } from 'electron';

import GreatApp from '../../GreatApp';
import IGreatPlugin from '../IGreatPlugin';

class GreatTray implements IGreatPlugin {
  // 图标
  icon: string = join(__dirname, './public/icon/tray.png');
  // 菜单
  menus: Array<MenuItemConstructorOptions> = [];

  tray: Tray | undefined;

  constructor(menus?: Array<MenuItemConstructorOptions>) {
    this.menus = menus || [];
  }

  private init(win: BrowserWindow) {
    this.tray?.setContextMenu(Menu.buildFromTemplate(this.menus));
    this.tray?.on('double-click', () => {
      win.show();
      //模拟桌面程序点击通知区图标实现打开关闭应用的功能
      win.setSkipTaskbar(!win.isVisible());
    })
  }

  create(app: GreatApp) {
    console.info('GreatTray:create');
    this.tray = new Tray(this.icon);
    this.init(app.getMainWindow());
  }

  willDestroy(app: GreatApp) {
    console.info('GreatTray:willDestroy');
    // this.tray.destroy();
  }
}

export default GreatTray;
