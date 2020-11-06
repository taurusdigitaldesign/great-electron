import { BrowserWindow } from 'electron';

const IpcMain = (
  ipc,
  browserWindow: InstanceType<typeof BrowserWindow>,
  serviceWindow: InstanceType<typeof BrowserWindow>
) => {
  ipc.on('emit', (event, data) => {
    const fromWinId = event.sender.id;
    let toWin = browserWindow.id === fromWinId ? serviceWindow : browserWindow;
    toWin.webContents.postMessage(data.eventName, data.data, event.ports);
  });

  return new Proxy(ipc, {
    get: function (target, prop, receiver) {
      if (prop === 'send') {
        return function (eventName, ...data) {
          browserWindow.webContents.send(eventName, JSON.stringify(data));
        };
      }
      return target[prop];
    }
  });
};

export default IpcMain;
