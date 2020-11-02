import { join } from 'path';
import GreatApp from './base/GreatApp';
import GreatWindow from './base/GreatWindow';

const great = new GreatApp();

great.on('create', () => {
  const win = new GreatWindow({
    width: 800,
    height: 600
  });
  win.init(join(great.app.getAppPath(), './src/render/index.html'));
  return win;
});
