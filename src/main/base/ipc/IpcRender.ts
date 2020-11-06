declare global {
  interface Window {
    ipcRenderer: any;
  }
}

const IpcRender = (ipc) =>
  new Proxy(ipc, {
    get: function (target, prop, receiver) {
      if ((prop as string) === 'on') {
        return function (...args: any) {
          const [eventName, callback] = args;
          target?.on(eventName, async (event: any, params: any) => {
            if (event.ports.length) {
              const [port] = event.ports;

              const result = await callback(event, params);
              if (result) {
                port.postMessage(result);
              }
              return;
            }

            callback(event, params);
          });
        };
      }

      if (prop === 'emit') {
        return (eventName, data) => {
          const { port1, port2 } = new MessageChannel();
          target.postMessage('emit', { eventName, data }, [port1]);
          return new Promise((resolve) => {
            port2.onmessage = resolve;
          });
        };
      }

      return target[prop];
    }
  });

export default IpcRender;
