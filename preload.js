const { contextBridge, ipcRenderer } = require('electron');
const channels = ['disks', 'cpus', 'system', 'graphics', 'battery', 'ram', 'networks', 'cpuScore', 'downloadScore', 'uploadScore'];
contextBridge.exposeInMainWorld('systeminfos', Object.fromEntries(
  channels.map(channel => [channel, () => ipcRenderer.invoke(`system:${channel}`)])
));
