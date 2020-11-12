// declare global {
//   interface Window {
//     ipcRenderer: any;
//   }
// }

const GreatIpcRender = (ipc) => {
  // 创建消息通道
  const { port1, port2 } = new MessageChannel();

  return new Proxy(ipc, {

    get: (target, prop, receiver) => {
      if ((prop as string) === 'on') {
        return (...args: any) => {
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
          target.postMessage('emit', { eventName, data }, [port1]);
          return new Promise((resolve) => {
            port2.onmessage = resolve;
          });
        };
      }

      return target[prop];
    }
  });
};

export default GreatIpcRender;
