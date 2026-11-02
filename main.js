const { app, BrowserWindow } = require('electron/main')
const isInstallerEvent = require('electron-squirrel-startup')
const path = require('node:path')
const { ipcMain } = require('electron')
const si = require('systeminformation')
const { Worker } = require('node:worker_threads')
const { measureNetwork } = require('./network-test')

const readers = { cpus: 'cpu', disks: 'diskLayout', system: 'osInfo', graphics: 'graphics', battery: 'battery', ram: 'memLayout', networks: 'networkInterfaces' }
for (const [channel, method] of Object.entries(readers)) {
  ipcMain.handle(`system:${channel}`, () => si[method]())
}
let cpuRunning = false
ipcMain.handle('system:cpuScore', async () => {
  if (cpuRunning) throw new Error('Test already running')
  cpuRunning = true
  try {
    return await new Promise((resolve, reject) => {
      const worker = new Worker(path.join(__dirname, 'cpu-worker.js'))
      const timeout = setTimeout(() => { worker.terminate(); reject(new Error('CPU test timeout')) }, 30000)
      worker.once('message', resolve)
      worker.once('error', reject)
      worker.once('exit', code => { clearTimeout(timeout); if (code !== 0) reject(new Error('CPU test failed')) })
    })
  } finally { cpuRunning = false }
})
for (const direction of ['download', 'upload']) {
  let running = false
  ipcMain.handle(`system:${direction}Score`, async () => {
    if (running) throw new Error('Test already running')
    running = true
    try { return await measureNetwork(direction) } finally { running = false }
  })
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    minWidth: 620,
    minHeight: 580,
    backgroundColor: '#f6f7f9',
    autoHideMenuBar: true,
    webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: true,
        preload: path.join(app.getAppPath(), 'preload.js')
      }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  if (isInstallerEvent) return

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
