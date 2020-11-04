import { join } from 'path';
import GreatApp from './base/GreatApp';
import GreatWindow from './base/GreatWindow';
import { GreatLog } from './base/plugins/log';

const great = new GreatApp();

// 安装插件
great.usePlugin(new GreatLog());

great.on('create', () => {
  const win = new GreatWindow(join(great.app.getAppPath(), './src/render/index.html'), {
    width: 800,
    height: 600
  });
  // great.setMainWindow(win);
  // win.init(join(great.app.getAppPath(), './src/render/index.html'));
  return win;
});

setTimeout(() => console.debug('hello, test'), 3000);
