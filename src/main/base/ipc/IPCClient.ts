
declare global {
  interface Window {
    ipcRenderer: any;
  }
}

type EmitCallback = (this: MessagePort, ev: MessageEvent<any>) => any

class IPÇClient {
  ipc: any;

  constructor(ipc: any) {
    this.ipc = ipc
  }

  on(eventName: string, callback?: Function) {
    this.ipc?.on(eventName, async (event: any, ...params: any) => {

      if(!callback || typeof callback !== "function") {
        return
      }

      if (event.ports.length) {
        const [port] = event.ports;

        const result = await callback(event, ...params);
        if (result) {
          port.postMessage(result);
        }
        return;
      }

      callback(event, ...params);
    });
  }


  emit(eventName: string): Promise<any>;
  emit(eventName: string, data: Object): Promise<any>;
  emit(eventName: string, callback: EmitCallback | null): void;
  emit(eventName: string, data: Object, callback: EmitCallback | null): void;
  emit(eventName: string, data?: Object | EmitCallback | null, callback?: ((this: MessagePort, ev: MessageEvent<any>) => any) | null) {
    if(typeof data === "function") {
      callback = data as EmitCallback;
      this.ipc.removeListener(eventName, callback)
      this.on(eventName, callback);
      data = undefined;
    }

    const { port1, port2 } = new MessageChannel();
    this.ipc?.postMessage('emit', { eventName, data }, [port1]);
    this.ipc.send(eventName, data)

    if(callback && typeof callback === 'function') {
      port2.onmessage = callback;
      return;
    }

    return new Promise((resolve) => {
      port2.onmessage = resolve;
    });
  };
}

export interface IIPCClient {
  emit: (eventName: string, data: Object) => void;
}

export default IPÇClient;
