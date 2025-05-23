import Alpine from 'alpinejs';
import { createApp } from './components/inventory';

// Initialize Alpine.js
window.Alpine = Alpine;
Alpine.start();

// Create the main application
createApp();