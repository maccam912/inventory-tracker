import { sqliteTable, text, integer, timestamp } from 'drizzle-orm/sqlite-core';

// Define the 'lots' table schema
export const lots = sqliteTable('lots', {
  id: integer('id').primaryKey().autoincrement(),
  lotNumber: text('lot_number').notNull(),
  expirationDate: timestamp('expiration_date').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// Define the 'sites' table schema
export const sites = sqliteTable('sites', {
  id: integer('id').primaryKey().autoincrement(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// Define the 'inventory' table schema to track units of lots at sites
export const inventory = sqliteTable('inventory', {
  id: integer('id').primaryKey().autoincrement(),
  lotId: integer('lot_id').notNull(),
  siteId: integer('site_id').notNull(),
  units: integer('units').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});