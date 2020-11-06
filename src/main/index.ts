import isDev from 'electron-is-dev';
import GreatApp from './base/GreatApp';
import { GreatLog } from './base/plugins/log';
import { GreatTray } from './base/plugins/tray';

const great = new GreatApp(isDev ? './src/render/index.html' : 'http://localhost:8000', {
  width: 800,
  height: 600
});
// 安装插件
great.usePlugin([new GreatLog(), new GreatTray()]);
great.start(() => {
  console.log('app started');
});
