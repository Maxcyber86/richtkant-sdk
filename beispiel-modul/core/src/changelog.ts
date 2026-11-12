/** Versionsverlauf des Beispielmoduls. Neueste Version zuerst; der erste Eintrag entspricht der Modulversion. */
import type { ModulChangelogEintrag } from '@gm/core';

export const BEISPIEL_CHANGELOG: readonly ModulChangelogEintrag[] = [
  {
    version: '1.0.0',
    datum: '2026-11-12',
    titel: 'Erste Fassung',
    benoetigtCore: '>=0.16.12 <0.17.0',
    neu: ['Prüfpunkte mit Prüfintervall anlegen, Fälligkeit sehen und als geprüft markieren.'],
    verbessert: [],
    behoben: [],
  },
];
