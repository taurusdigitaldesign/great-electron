import ipcRender from '@bit/greatfed.quickfox.ipc/dist/render';
import { ipcRenderer } from 'electron';
import axios from 'axios';

import { add } from '../native/lib.rs';

window.ipcRenderer = ipcRenderer;
const ipc = ipcRender(window.ipcRenderer);
console.log(ipc);

ipc.on('test', (event, data) => {
  console.log('接收到的数据', data);
  return '回复的数据';
});

ipc.on('testapi', async (event, data) => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
  console.log(res.data);
  return res.data;
});

console.log(add(3, 5));
