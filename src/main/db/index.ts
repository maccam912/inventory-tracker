import { Database } from 'sqlite3';
import { open } from 'sqlite';
import { Lot, Site } from '../../shared/types';

const dbPromise = open({
  filename: 'inventory.db',
  driver: Database,
});

export async function initializeDatabase() {
  const db = await dbPromise;
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
}

export async function addLot(lot: Lot) {
  const db = await dbPromise;
  const result = await db.run('INSERT INTO lots (lot_number, expiration_date) VALUES (?, ?)', [lot.lot_number, lot.expiration_date]);
  return result.lastID;
}

export async function addSite(site: Site) {
  const db = await dbPromise;
  const result = await db.run('INSERT INTO sites (name) VALUES (?)', [site.name]);
  return result.lastID;
}

export async function getInventory() {
  const db = await dbPromise;
  const inventory = await db.all(`
    SELECT s.name AS site_name, l.lot_number, l.expiration_date, i.units
    FROM inventory i
    JOIN lots l ON i.lot_id = l.id
    JOIN sites s ON i.site_id = s.id
  `);
  return inventory;
}

export async function updateInventory(lotId: number, siteId: number, units: number) {
  const db = await dbPromise;
  await db.run('INSERT INTO inventory (lot_id, site_id, units) VALUES (?, ?, ?) ON CONFLICT(lot_id, site_id) DO UPDATE SET units = units + ?', [lotId, siteId, units, units]);
}

export async function closeDatabase() {
  const db = await dbPromise;
  await db.close();
}