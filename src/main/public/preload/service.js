const remote = window.require('electron').remote;

window.ipcRenderer = window.require('electron').ipcRenderer;
window.ipcRenderer = remote.app.ipcRenderWrapper(window.ipcRenderer);

window.ipcRenderer.on('test', (event, data) => {
  console.info('接收到的数据', data);
  return '回复的数据';
});
