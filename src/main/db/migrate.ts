import { migrate } from 'drizzle-orm';
import { db } from './index';
import { schema } from './schema';

async function runMigrations() {
    try {
        await migrate(db, schema);
        console.log('Database migrations completed successfully.');
    } catch (error) {
        console.error('Error running migrations:', error);
    }
}

runMigrations();