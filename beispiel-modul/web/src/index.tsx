/**
 * @rk-modul/beispiel-web: Oberfläche des Beispielmoduls. Richtkant bindet `beispielWebModul` beim Bau des Images
 * ein; Seiten werden nachgeladen und stehen in einer Fehlergrenze des Core.
 */
import { lazy } from 'react';
import { ClipboardCheck } from 'lucide-react';
import type { WebModul } from '@gm/web/sdk';
import { BEISPIEL_MANIFEST } from '@rk-modul/beispiel-core';

export const beispielWebModul: WebModul = {
  manifest: BEISPIEL_MANIFEST,
  seiten: {
    pruefpunkte: lazy(() => import('./seite').then((m) => ({ default: m.PruefpunkteSeite }))),
  },
  admin: {},
  icons: { beispiel: ClipboardCheck, 'betriebsmittel.pruefpunkte': ClipboardCheck },
  hilfe: () => import('@rk-modul/beispiel-core/hilfe').then((m) => m.BEISPIEL_HILFE_INHALTE),
  changelog: () => import('@rk-modul/beispiel-core/changelog').then((m) => m.BEISPIEL_CHANGELOG),
};
