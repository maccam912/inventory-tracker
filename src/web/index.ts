import { createApp } from 'vue';
import Alpine from 'alpinejs';
import { createRouter, createWebHistory } from 'vue-router';
import Inventory from '../renderer/components/inventory';

const app = createApp({});

// Set up Alpine.js
app.use(Alpine);

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