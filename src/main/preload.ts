import { contextBridge, ipcRenderer } from 'electron';
import { Lot, Site } from '../shared/types';
import { IPCChannels } from '../shared/ipc-channels';

contextBridge.exposeInMainWorld('api', {
    getLots: () => ipcRenderer.invoke(IPCChannels.GET_LOTS),
    addLot: (lot: Lot) => ipcRenderer.invoke(IPCChannels.ADD_LOT, lot),
    getSites: () => ipcRenderer.invoke(IPCChannels.GET_SITES),
    addSite: (site: Site) => ipcRenderer.invoke(IPCChannels.ADD_SITE, site),
    getInventory: (siteId: string) => ipcRenderer.invoke(IPCChannels.GET_INVENTORY, siteId),
});