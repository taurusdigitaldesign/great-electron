import axios from 'axios';
import IPCClient from '@bit/greatfed.quickfox.ipc/dist/render';
import { BrowserWindow, ipcRenderer, remote } from 'electron';
import Net from '../base/utils/Net';

window.ipcRenderer = ipcRenderer;
const ipc = new IPCClient(window.ipcRenderer);

// ======  Demo1  ======

// ipc.on('test', async (event, data) => {
//   const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
//   console.log('接收到的数据', data);
//   console.log(res.data);
//   return res.data;
// });

// ======  Demo2  ======

// const mainWin: BrowserWindow = remote.require('./index').default.getMainWindow();
// mainWin.minimize();

// ======  Demo3  ======

// console.log(Net.ping(['8.129.180.12']));
// Net.getExternalIP().then((res) => console.log(res));