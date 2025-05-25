import { contextBridge, ipcRenderer } from 'electron';
import { Lot, Site } from '../shared/types';
import { ipcChannels } from '../shared/ipc-channels';

contextBridge.exposeInMainWorld('api', {
    getLots: () => ipcRenderer.invoke(ipcChannels.GET_LOTS),
    addLot: (lot: Lot) => ipcRenderer.invoke(ipcChannels.ADD_LOT, lot),
    getSites: () => ipcRenderer.invoke(ipcChannels.GET_SITES),
    addSite: (site: Site) => ipcRenderer.invoke(ipcChannels.ADD_SITE, site),
    getInventory: (siteId: string) => ipcRenderer.invoke(ipcChannels.GET_INVENTORY, siteId),
});