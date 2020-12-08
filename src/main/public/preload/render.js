const IPCClient = require('@bit/greatfed.quickfox.ipc/dist/render').default;
const ipcRenderer = require('electron').ipcRenderer;
const  { remote } = require('electron');

const great = {
  ipc: new IPCClient(ipcRenderer),
  isWin: remote.require('./index').default.isWin()
};
window.great = great;


// ipc demo
great.ipc.emit('test', { txt: '发送的消息' }).then((event) => {
  console.log('--收到的回复消息--', event.data);
});
