const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const ipcMain = require('electron').ipcMain

let main_win

function createWindow() {
    main_win = new BrowserWindow({width: 1000, height: 1000, backgroundColor: 'black', frame: false, fullscreen:true})
    main_win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }))
    let nowShowing = new BrowserWindow({parent: main_win, show: false, fullscreen: true, frame: false})
    nowShowing.loadURL(url.format({
        pathname: path.join(__dirname, 'nowShowing.html'),
        protocol: 'file:',
        slashes: true
    }))

    main_win.webContents.openDevTools()
    nowShowing.webContents.openDevTools()

    main_win.on('closed', () => {
        main_win = null
    })
    
    ipcMain.on('closeShowing', function() {
        nowShowing.hide()
    })

    ipcMain.on('openShowing', function() {
        nowShowing.show()
    })
}

app.on('ready', createWindow)