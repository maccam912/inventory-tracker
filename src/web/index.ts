import { createApp } from 'vue';
import Alpine from 'alpinejs';
import { createRouter, createWebHistory } from 'vue-router';
import Inventory from '../renderer/components/inventory';
import { addSite, getSites } from './db-web';

const app = createApp({});

// Set up Alpine.js
window.Alpine = Alpine;
Alpine.data('inventory', () => ({
    lots: [],
    sites: [],
    selectedLot: null,
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
    }
}));

Alpine.start();

// Define routes
const routes = [
    { path: '/', component: Inventory },
];

// Create router
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Use router
app.use(router);

// Mount the app
app.mount('#app');