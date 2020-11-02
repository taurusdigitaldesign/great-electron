import { join } from 'path';
import GreatApp from './base/GreatApp';
import GreatWindow from './base/GreatWindow';
import Net from './base/utils/Net';

const app = GreatApp.getInstance();

const createWindow = () => {
  new GreatWindow({
    width: 800,
    height: 600
  }).init(join(app.getAppPath(), './src/render/index.html'));
};

app.whenReady().then(createWindow);

app.on('activate', function () {
  if (GreatWindow.getAllWindows().length === 0) createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

Net.ping('http://www.baidu.com');
