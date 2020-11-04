import { join } from 'path';
import isDev from 'electron-is-dev';

import GreatApp from './base/GreatApp';
import GreatWindow from './base/GreatWindow';
import { GreatLog } from './base/plugins/log';
import { GreatTray } from './base/plugins/tray';

const great = new GreatApp();

// 安装插件
great.usePlugin([new GreatLog(), new GreatTray()]);

great.on('create', () => {
  return new GreatWindow(
    isDev ? join(great.app.getAppPath(), './src/render/index.html') : 'http://localhost:8000',
    {
      width: 800,
      height: 600
    }
  );
});
