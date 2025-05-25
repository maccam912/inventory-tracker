import Alpine from 'alpinejs';
import { addSite, getSites } from './db-web';

// Set up Alpine.js
window.Alpine = Alpine;
Alpine.data('inventory', () => ({
    lots: [],
    sites: [],
    selectedLot: null,
    selectedSite: null,
    showAddSiteForm: false,
    newSiteName: '',
    addNewSite() {
        const site = { name: this.newSiteName };
        addSite(site).then(() => {
            getSites().then(updatedSites => {
                this.sites = updatedSites;
                this.newSiteName = '';
                this.showAddSiteForm = false;
            });
        }).catch(error => {
            console.error('Error adding site:', error);
        });
    },
    init() {
        // Load initial data
        getSites().then(sites => {
            this.sites = sites;
        }).catch(error => {
            console.error('Error loading sites:', error);
        });
    }
}));

Alpine.start();