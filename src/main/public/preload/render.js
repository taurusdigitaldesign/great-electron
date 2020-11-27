const ipcRender = require('@bit/greatfed.quickfox.ipc/dist/render').default;
console.log(ipcRender);

window.ipcRenderer = require('electron').ipcRenderer;
window.ipc = ipcRender(window.ipcRenderer);
console.log(ipc);


window.ipc.emit('test', { txt: '发送的消息' }).then((event) => {
    console.log('--收到的回复消息--', event.data);
  });
  

