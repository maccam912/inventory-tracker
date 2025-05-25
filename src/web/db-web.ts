import { Lot, Site } from '../shared/types';

// Simple in-memory database for web version
const db = {
  lots: [] as any[],
  sites: [] as any[],
  nextLotId: 1,
  nextSiteId: 1
};

// Function to add a lot
export const addLot = async (lot: Lot) => {
  const newLot = { 
    ...lot, 
    id: db.nextLotId++, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  };
  db.lots.push(newLot);
  return newLot;
};

// Function to add a site
export const addSite = async (site: Site) => {
  const newSite = { 
    ...site, 
    id: db.nextSiteId++, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  };
  db.sites.push(newSite);
  return newSite;
};

// Function to get all lots
export const getLots = async () => {
  return db.lots;
};

// Function to get all sites
export const getSites = async () => {
  return db.sites;
};

// Function to get inventory by site
export const getInventoryBySite = async (siteId: number) => {
  const lots = await getLots();
  // Logic to calculate inventory for the given site
  // This is a placeholder for actual inventory logic
  return lots.filter(lot => lot.siteId === siteId);
};