import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
/**
 * Datenbankzugriff.
 * - Produktion: PostgreSQL über node-postgres (DATABASE_URL=postgres://…)
 * - Entwicklung/Test: eingebettetes PostgreSQL (PGlite) ohne Serverinstallation
 * Beide Varianten nutzen denselben PostgreSQL-Dialekt, dasselbe Schema und dieselben Migrationen.
 */
export type DB = NodePgDatabase<Record<string, never>>;
/** Datenbank oder laufende Transaktion */
export type DbOrTx = DB | Parameters<Parameters<DB['transaction']>[0]>[0];
