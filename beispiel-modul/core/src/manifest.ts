/**
 * Manifest des Beispielmoduls (Modulvertrag 2.2.0). Das Manifest ist rein (keine Datenbank, kein DOM) und wird von
 * Server- und Web-Teil gleichermaßen verwendet. Alle Schlüssel sind dauerhaft: einmal ausgeliefert, nie umbenennen.
 */
import type { DemoModulDef, ModulManifest } from '@gm/core';

/** Hilfeartikel des Moduls (Inhalte in ./hilfe/) */
export const BEISPIEL_HILFE = ['betriebsmittel.pruefpunkte'] as const;

export const BEISPIEL_RECHTE = {
  'beispiel.pruefpunkte': 'Prüfpunkte des Beispielmoduls ansehen und pflegen',
} as const;

/** Demodaten-Baustein (Katalog; die Umsetzung liefert der Server-Teil) */
export const BEISPIEL_DEMO: DemoModulDef = {
  key: 'beispiel',
  name: 'Prüfpunkte (Beispielmodul)',
  beschreibung: 'Drei wiederkehrende Prüfpunkte mit unterschiedlicher Fälligkeit.',
  konfiguration: ['Keine Einstellungen nötig'],
  ablaeufe: ['Fällige Prüfpunkte ansehen und als geprüft markieren'],
  abhaengig: ['stammdaten'],
  erpModule: ['betriebsmittel'],
  funktionen: ['betriebsmittel.pruefpunkte'],
  tabellenLabel: { beispiel_pruefpunkte: 'Prüfpunkte' },
};

export const BEISPIEL_MANIFEST: ModulManifest = {
  schluessel: 'beispiel',
  name: 'Beispielmodul Prüfpunkte',
  version: '1.0.0',
  vertrag: '^2.2.0',
  core: '>=0.16.7 <0.17.0',
  herausgeber: 'partner',
  lizenz: { spdx: 'Apache-2.0', hinweise: 'Beispielmodul des Richtkant Modul-SDK. Keine eigenen Fremdabhängigkeiten.' },
  beschreibung: 'Wiederkehrende Prüfpunkte mit Fälligkeit (Beispiel für Modulentwickler).',
  verzeichnis: {
    routen: { pruefpunkte: '/pruefpunkte' },
    funktionen: [
      { key: 'betriebsmittel.pruefpunkte', modul: 'betriebsmittel', label: 'Prüfpunkte', ziel: { route: 'pruefpunkte' }, permissions: ['beispiel.pruefpunkte'], menue: true },
    ],
    protokollObjekte: { pruefpunkt: { label: 'Prüfpunkt', funktion: 'betriebsmittel.pruefpunkte' } },
  },
  rechte: { ...BEISPIEL_RECHTE },
  systemrollen: { geschaeftsfuehrung: ['beispiel.pruefpunkte'], arbeitsvorbereitung: ['beispiel.pruefpunkte'] },
  protokollAktionen: {
    'pruefpunkt.angelegt': 'Prüfpunkt angelegt',
    'pruefpunkt.geprueft': 'Prüfpunkt als geprüft markiert',
  },
  protokollBereiche: { pruefpunkt: 'Prüfpunkte' },
  daten: {
    tabellen: ['beispiel_pruefpunkte'],
    migrationen: 'eigen',
    kalkulationsunterlagen: [],
    bezeichnungen: { beispiel_pruefpunkte: 'Prüfpunkte' },
    // DSGVO: Beim Anonymisieren eines Kunden verliert der Prüfpunkt den Kundenbezug (auch ohne Modul im Image)
    kundenbezug: [{ tabelle: 'beispiel_pruefpunkte', spalte: 'kunde_id', anonymisieren: 'leeren' }],
  },
  hilfe: [...BEISPIEL_HILFE],
  demodaten: ['beispiel'],
  demodatenKatalog: [BEISPIEL_DEMO],
};
