import { Lot, Site } from '../../shared/types';
import { ipcRenderer } from 'electron';

export class Inventory {
    private lots: Lot[] = [];
    private sites: Site[] = [];

    constructor() {
        this.loadData();
    }

    private async loadData() {
        this.lots = await ipcRenderer.invoke('get-lots');
        this.sites = await ipcRenderer.invoke('get-sites');
        this.renderInventory();
    }

    private renderInventory() {
        const inventoryContainer = document.getElementById('inventory');
        if (!inventoryContainer) return;

        inventoryContainer.innerHTML = '';

        this.lots.forEach(lot => {
            const lotElement = document.createElement('div');
            lotElement.className = 'lot';
            lotElement.innerHTML = `
                <h3>Lot Number: ${lot.lotNumber}</h3>
                <p>Expiration Date: ${lot.expirationDate}</p>
                <p>Units:</p>
                <ul>
                    ${this.sites.map(site => `
                        <li>${site.name}: ${this.getUnitsAtSite(lot.id, site.id)}</li>
                    `).join('')}
                </ul>
            `;
            inventoryContainer.appendChild(lotElement);
        });
    }

    private getUnitsAtSite(_lotId: number, _siteId: number): number {
        // Logic to retrieve the number of units for a given lot at a specific site
        // This is a placeholder; actual implementation will depend on the database structure
        return Math.floor(Math.random() * 100); // Temporary random value for demonstration
    }
}

export function createApp(): Inventory {
    return new Inventory();
}