import { type ImportArt, type ImportOptionen } from '../../../core/stammdaten12.js';
import { type Permission } from '../../../core/permissions.js';
import type { DbOrTx } from '../../db/client.js';
import type { ImportZiel } from './ruecknahme.js';
export interface Meldung {
    feld?: string;
    text: string;
    schwere: 'fehler' | 'warnung';
}
export interface ImportKontext {
    demo: boolean;
    optionen: ImportOptionen;
    /** Preise (ohne Kundenansicht) und `bmKosten`: Kosten der Betriebsmittel (Recht betriebsmittel.kosten, ohne Kundenansicht) */
    rechte: {
        ek: boolean;
        vk: boolean;
        bmKosten?: boolean;
    };
    heute: string;
    zahlungszielStandard: number;
    userId: string;
    /** Probelauf: keine Nummern aus den Nummernkreisen verbrauchen */
    probe: boolean;
}
/** Normalisierte Zeile nach der Prüfung */
export interface GepruefteZeile {
    zeile: number;
    werte: Record<string, unknown>;
    meldungen: Meldung[];
    /** Vorhandener Datensatz (Dublette bzw. Ziel einer Aktualisierung) */
    treffer: {
        id: string;
        grund: string;
        bezeichnung: string;
        zusatz?: Record<string, unknown>;
    } | null;
    /** Schlüssel für die Dublettenerkennung innerhalb der Datei */
    schluessel: string[];
}
export interface Ergebnis {
    zielTabelle: string;
    zielId: string;
    aktion: 'angelegt' | 'geaendert';
    vorher: Record<string, unknown> | null;
    bezeichnung: string;
    /**
     * 0.16.11 (Rücknahme ohne Datenverlust): weitere Datensätze, die die Zeile als Nebenwirkung angelegt oder geändert hat und
     * die `zuruecknehmen` zurücksetzt (z. B. Ansprechpartner, Maschine). Die Pipeline hält für jedes berührte Ziel den
     * Nachher-Stand fest und nimmt den Import nur zurück, solange keines davon inzwischen geändert wurde.
     */
    beruehrt?: ImportZiel[];
}
export interface ImportArtAdapter {
    zielTabelle: string;
    /** Schreibrechte der Zielart (zusätzlich zu import.ausfuehren) */
    rechte: (o: ImportOptionen) => Permission[];
    /** Ob für die Zeile eine Aktualisierung möglich ist (sonst nur überspringen) */
    aktualisierbar: boolean;
    pruefen: (db: DbOrTx, zeilen: {
        zeile: number;
        werte: Record<string, string>;
    }[], k: ImportKontext) => Promise<GepruefteZeile[]>;
    anlegen: (tx: DbOrTx, z: GepruefteZeile, k: ImportKontext) => Promise<Ergebnis>;
    aktualisieren: (tx: DbOrTx, z: GepruefteZeile, k: ImportKontext) => Promise<Ergebnis>;
    /**
     * Angelegten Datensatz entfernen bzw. Vorher-Stand wiederherstellen. Jede Tabelle, die `anlegen`/`aktualisieren` schreibt
     * und die hier zurückgesetzt wird, gehört als Ziel (`zielTabelle` bzw. `beruehrt`) ins Ergebnis (Konfliktprüfung).
     */
    zuruecknehmen: (tx: DbOrTx, r: {
        zielId: string;
        aktion: string;
        vorher: Record<string, unknown> | null;
    }, k?: {
        userId: string | null;
    }) => Promise<void>;
    /**
     * Optional: mehrere Zeilen mengenbasiert anwenden (Ergebnis je Zeile in derselben Reihenfolge). Alles oder nichts: Bei
     * einem Fehler rollt die Pipeline den Block zurück und wendet die Zeilen einzeln an (genaue Fehlermeldung je Zeile).
     */
    anwendenBlock?: (tx: DbOrTx, zeilen: {
        plan: 'anlegen' | 'aktualisieren';
        g: GepruefteZeile;
    }[], k: ImportKontext) => Promise<Ergebnis[]>;
}
/** Importart eines Moduls registrieren (persistierter Schlüssel bleibt im Core-Enum IMPORT_ARTEN) */
export declare function importAdapterRegistrieren(art: ImportArt, adapter: ImportArtAdapter): void;
