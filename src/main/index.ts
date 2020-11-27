import { join } from 'path';
import isDev from 'electron-is-dev';

import GreatApp from './base/GreatApp';
import { GreatLog } from './base/plugins/log';
import { GreatTray } from './base/plugins/tray';
import GreatWinConfig from './base/GreatWinConfig';

// 配置
GreatWinConfig.openDevTool = true;

const great = new GreatApp(isDev ? './src/render/index.html' : 'http://localhost:8000', {
  width: 800,
  height: 600,
  webPreferences: {
    // webviewTag: true,
    enableRemoteModule: true,
    nodeIntegration: true,
    preload: join(__dirname, './public/preload/render.js')
  }
});
// 安装插件
great.usePlugin([new GreatLog(), new GreatTray()]);

// 启动
great.start(() => {
  console.info('app started');
});
