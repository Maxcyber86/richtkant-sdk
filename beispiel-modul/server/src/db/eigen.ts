/**
 * Tabellen des Beispielmoduls (eigene Migrationshistorie, manifest.daten.migrationen = 'eigen'). Regel: Modultabellen
 * dürfen auf Core-Tabellen verweisen (hier `customers`), nie umgekehrt und nie auf Tabellen anderer Module.
 * Migrationen erzeugen: `npx drizzle-kit generate` (Konfiguration drizzle.config.ts), danach von Hand prüfen.
 */
import { boolean, date, integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { customers, timestamps } from '@gm/server/sdk/db';

export const beispielPruefpunkte = pgTable('beispiel_pruefpunkte', {
  id: uuid('id').primaryKey().defaultRandom(),
  bezeichnung: text('bezeichnung').notNull(),
  intervallTage: integer('intervall_tage').notNull(),
  letztePruefung: date('letzte_pruefung'),
  kundeId: uuid('kunde_id').references(() => customers.id, { onDelete: 'set null' }),
  isTest: boolean('is_test').notNull().default(false),
  ...timestamps,
});
