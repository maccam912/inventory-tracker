import { Database } from 'sqlite3';
import { open } from 'sqlite';
import { Lot, Site } from '../../shared/types';

export async function openDatabase(filename: string = 'inventory.db') {
  const db = await open({
    filename,
    driver: Database,
  });
  
  // Initialize database schema
  await db.exec(`
    CREATE TABLE IF NOT EXISTS lots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lot_number TEXT NOT NULL,
      expiration_date TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS sites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lot_id INTEGER NOT NULL,
      site_id INTEGER NOT NULL,
      units INTEGER NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (lot_id) REFERENCES lots(id),
      FOREIGN KEY (site_id) REFERENCES sites(id)
    );
  `);
  
  return db;
}

export async function closeDatabase(db: any) {
  await db.close();
}

export async function addLot(db: any, lot: Lot) {
  const result = await db.run('INSERT INTO lots (lot_number, expiration_date) VALUES (?, ?)', [lot.lotNumber, lot.expirationDate]);
  return result.lastID;
}

export async function getLots(db: any): Promise<Lot[]> {
  const rows = await db.all('SELECT * FROM lots');
  return rows.map((row: any) => ({
    id: row.id,
    lotNumber: row.lot_number,
    expirationDate: row.expiration_date,
    created_at: new Date(row.created_at),
    updated_at: new Date(row.updated_at)
  }));
}

export async function addSite(db: any, site: Site) {
  const result = await db.run('INSERT INTO sites (name) VALUES (?)', [site.name]);
  return result.lastID;
}

export async function getSites(db: any): Promise<Site[]> {
  const rows = await db.all('SELECT * FROM sites');
  return rows.map((row: any) => ({
    id: row.id,
    name: row.name,
    created_at: new Date(row.created_at),
    updated_at: new Date(row.updated_at)
  }));
}

export async function getInventory(db: any) {
  const inventory = await db.all(`
    SELECT s.name AS site_name, l.lot_number, l.expiration_date, i.units
    FROM inventory i
    JOIN lots l ON i.lot_id = l.id
    JOIN sites s ON i.site_id = s.id
  `);
  return inventory;
}

export async function updateInventory(db: any, lotId: number, siteId: number, units: number) {
  await db.run('INSERT OR REPLACE INTO inventory (lot_id, site_id, units) VALUES (?, ?, ?)', [lotId, siteId, units]);
}