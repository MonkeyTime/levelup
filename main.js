const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 990,
    height: 684,
    autoHideMenuBar: true,
    webPreferences: {
        contextIsolation: true, // protect against prototype pollution
        enableRemoteModule: false, // turn off remote
        nodeIntegration: true, // like here
        preload: path.join(app.getAppPath(), 'preload.js')
      }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {

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