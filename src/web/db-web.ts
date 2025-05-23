import { createStore } from 'drizzle-orm/sqlite';
import { Lot, Site } from '../shared/types';

// Temporary in-memory database for web version
const db = createStore({
  lots: {
    id: 'number',
    lotNumber: 'string',
    expirationDate: 'string',
    createdAt: 'date',
    updatedAt: 'date',
  },
  sites: {
    id: 'number',
    name: 'string',
    createdAt: 'date',
    updatedAt: 'date',
  },
});

// Function to add a lot
export const addLot = async (lot: Lot) => {
  await db.lots.insert(lot);
};

// Function to add a site
export const addSite = async (site: Site) => {
  await db.sites.insert(site);
};

// Function to get all lots
export const getLots = async () => {
  return await db.lots.findAll();
};

// Function to get all sites
export const getSites = async () => {
  return await db.sites.findAll();
};

// Function to get inventory by site
export const getInventoryBySite = async (siteId: number) => {
  const lots = await getLots();
  // Logic to calculate inventory for the given site
  // This is a placeholder for actual inventory logic
  return lots.filter(lot => lot.siteId === siteId);
};