import { BrowserWindow } from 'electron';

class IPCServer {
  ipc: any;
  browserWindow: InstanceType<typeof BrowserWindow>;
  serviceWindow: InstanceType<typeof BrowserWindow>;

  constructor(
    ipc: any,
    browserWindow: InstanceType<typeof BrowserWindow>,
    serviceWindow: InstanceType<typeof BrowserWindow>
  ) {
    this.ipc = ipc;
    this.browserWindow = browserWindow;
    this.serviceWindow = serviceWindow;

    ipc.on('emit', (event: any, params: { eventName: string; data: object }) => {
      const { eventName, data } = params;
      const fromWinId = event.sender.id;
      let toWin = browserWindow.id === fromWinId ? serviceWindow : browserWindow;
      toWin.webContents.postMessage(eventName, data, event.ports);
    });
  }

  /**
   * IPCMain调用 emit，同时发送给 service 和 render 层
   * @param eventName channel
   * @param data 发送的数据
   */
  emit(eventName: string, ...data: any[]) {
    this.browserWindow.webContents.send(eventName, ...(data || []));
    this.serviceWindow.webContents.send(eventName, ...(data || []));
  }

  async on(eventName: string, callback: Function) {
    this.ipc.on.call(this.ipc, eventName, async () => {
      const result = await callback();
      if (result !== undefined) {
        this.emit(eventName, result);
      }
    });
  }
}

export interface IIPCServer {
  emit: (eventName: string, ...data: Array<any>) => void;
  on: (eventName: string, callback: Function) => void;
}

export default IPCServer;
