/**
 * Demodaten-Baustein „beispiel“ (Umsetzung zum Katalog BEISPIEL_DEMO im Manifest). Demodatensätze tragen `is_test` und
 * Namen mit dem Präfix „DEMO-“; der Core löscht sie über den Besitz der Tabelle wieder.
 */
import { eq, sql } from 'drizzle-orm';
import { addDays, todayIso, type DemoUmsetzung } from '@gm/server/sdk';
import { beispielPruefpunkte } from './db/eigen.js';

export const beispielDemo: DemoUmsetzung = {
  key: 'beispiel',
  vorhanden: async ({ db }) => {
    const [r] = await db.select({ n: sql<number>`count(*)::int` }).from(beispielPruefpunkte).where(eq(beispielPruefpunkte.isTest, true));
    return (r?.n ?? 0) >= 3;
  },
  einspielen: async ({ db }) => {
    const heute = todayIso();
    await db.insert(beispielPruefpunkte).values([
      { bezeichnung: 'DEMO-Sichtprüfung Hebebühne', intervallTage: 30, letztePruefung: addDays(heute, -40), isTest: true },
      { bezeichnung: 'DEMO-Prüfung Feuerlöscher', intervallTage: 365, letztePruefung: addDays(heute, -355), isTest: true },
      { bezeichnung: 'DEMO-Elektroprüfung Werkstatt', intervallTage: 180, letztePruefung: null, isTest: true },
    ]);
  },
  besitz: { beispiel_pruefpunkte: { tabelle: beispielPruefpunkte, besitzer: `'beispiel'` } },
  loeschReihenfolge: ['beispiel_pruefpunkte'],
};
