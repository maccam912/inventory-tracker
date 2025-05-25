import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { openDatabase, getLots, addLot, getSites, addSite, getInventory, updateInventory } from './db/index';
import { ipcChannels } from '../shared/ipc-channels';

let db: any;

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

// Set up database connection
async function setupDatabase() {
    db = await openDatabase();
    
    // Set up IPC handlers
    ipcMain.handle(ipcChannels.GET_LOTS, async () => {
        return await getLots(db);
    });
    
    ipcMain.handle(ipcChannels.ADD_LOT, async (_, lot) => {
        return await addLot(db, lot);
    });
    
    ipcMain.handle(ipcChannels.GET_SITES, async () => {
        return await getSites(db);
    });
    
    ipcMain.handle(ipcChannels.ADD_SITE, async (_, site) => {
        return await addSite(db, site);
    });
    
    ipcMain.handle(ipcChannels.GET_INVENTORY, async (_, siteId) => {
        return await getInventory(db, siteId);
    });
    
    ipcMain.handle(ipcChannels.UPDATE_INVENTORY, async (_, lotId, siteId, units) => {
        return await updateInventory(db, lotId, siteId, units);
    });
}

app.on('ready', async () => {
    await setupDatabase();
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