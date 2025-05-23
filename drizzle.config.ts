import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/main/db/schema.ts',
  out: './drizzle/migrations',
  db: {
    client: 'sqlite',
    connection: {
      filename: './database.sqlite',
    },
  },
});