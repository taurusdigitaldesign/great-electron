const remote = window.require('electron').remote;

window.ipcRenderer = window.require('electron').ipcRenderer;
window.ipcRenderer = remote.app.ipcRenderWrapper(window.ipcRenderer);

console.log(window.ipcRenderer);


