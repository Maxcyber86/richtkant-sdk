/**
 * @rk-modul/beispiel-server: Server-Teil des Beispielmoduls. Richtkant bindet `beispielServerModul` beim Bau des Images
 * ein; das Modul spricht den Core ausschließlich über `@gm/server/sdk` an.
 * Migrationen: Konvention `modules/beispiel/server/drizzle` im Image (kein `migrationsOrdner` nötig).
 */
import type { ServerModul } from '@gm/server/sdk';
import { BEISPIEL_MANIFEST } from '@rk-modul/beispiel-core';
import { BEISPIEL_HILFE_INHALTE } from '@rk-modul/beispiel-core/hilfe';
import { beispielRouten } from './routes.js';
import { beispielDemo } from './demo.js';

export const beispielServerModul: ServerModul = {
  manifest: BEISPIEL_MANIFEST,
  plugin: beispielRouten,
  erweiterungen: { demodaten: [beispielDemo] },
  hilfe: BEISPIEL_HILFE_INHALTE,
};
