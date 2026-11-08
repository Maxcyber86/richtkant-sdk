import { defineConfig } from 'drizzle-kit';

/** Eigene Migrationshistorie des Beispielmoduls (Journal drizzle.__drizzle_migrations_beispiel) */
export default defineConfig({
  dialect: 'postgresql',
  schema: ['./src/db/eigen.ts'],
  out: './drizzle',
  migrations: { table: '__drizzle_migrations_beispiel', schema: 'drizzle' },
});
