import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { openDatabase, closeDatabase, addLot, getLots, addSite, getSites } from '../../src/main/db/index';
import { Lot, Site } from '../../src/shared/types';

describe('Database Operations', () => {
    let db: any;

    beforeAll(async () => {
        db = await openDatabase(':memory:'); // Use an in-memory database for testing
    });

    afterAll(async () => {
        await closeDatabase(db);
    });

    it('should add a lot to the database', async () => {
        const lot: Lot = { id: 1, lotNumber: 'LOT123', expirationDate: '2023-12-31', created_at: new Date(), updated_at: new Date() };
        await addLot(db, lot);
        const lots = await getLots(db);
        
        expect(lots.length).toBe(1);
        expect(lots[0]).toMatchObject({
            lotNumber: 'LOT123',
            expirationDate: '2023-12-31'
        });
        expect(lots[0].id).toBeTypeOf('number');
        expect(lots[0].created_at).toBeInstanceOf(Date);
        expect(lots[0].updated_at).toBeInstanceOf(Date);
    });

    it('should add a site to the database', async () => {
        const site: Site = { id: 1, name: 'Site A', created_at: new Date(), updated_at: new Date() };
        await addSite(db, site);
        const sites = await getSites(db);
        
        expect(sites.length).toBe(1);
        expect(sites[0]).toMatchObject({
            name: 'Site A'
        });
        expect(sites[0].id).toBeTypeOf('number');
        expect(sites[0].created_at).toBeInstanceOf(Date);
        expect(sites[0].updated_at).toBeInstanceOf(Date);
    });

    it('should retrieve lots from the database', async () => {
        const lots = await getLots(db);
        expect(lots.length).toBeGreaterThan(0);
    });

    it('should retrieve sites from the database', async () => {
        const sites = await getSites(db);
        expect(sites.length).toBeGreaterThan(0);
    });
});