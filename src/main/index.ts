import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { createConnection } from './db/index';

const createMainWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
        },
    });

    mainWindow.loadURL('http://localhost:3000'); // Adjust this for production
};

app.on('ready', async () => {
    await createConnection(); // Initialize the database connection
    createMainWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }
});

// IPC communication setup can be added here as needed.