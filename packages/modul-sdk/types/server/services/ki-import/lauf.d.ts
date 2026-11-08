import { type ImportArt } from '../../../core/stammdaten12.js';
import { type KiLaufZweck } from '../../../core/ki.js';
import type { DbOrTx } from '../../db/client.js';
export interface KiLaufZweckDefinition {
    /** Reihenfolge der Importarten beim Ausführen (Rückgängig in umgekehrter Reihenfolge) */
    reihenfolge: ImportArt[];
    /** Strukturänderungen vor den Kindläufen (z. B. Artikelarten, Formvorlagen); eigene Transaktion vor den Importläufen */
    strukturVorAusfuehren?: (tx: DbOrTx, laufId: string) => Promise<void>;
    /** Zusätzlicher Anteil am Änderungssatz-Hash (z. B. Staging-Prüfsummen) */
    aenderungssatzZusatz?: (db: DbOrTx, laufId: string) => Promise<string>;
    /** Rücknahme der Strukturänderungen nach dem Rückgängigmachen der Importläufe (bestmöglich, ohne Folgedaten) */
    strukturRueckgaengig?: (db: DbOrTx, laufId: string) => Promise<{
        hinweise: string[];
    }>;
    /**
     * Ob der Probelauf der Vorschau noch gilt, weil sich der betroffene Bestand seitdem nicht geändert hat (Prüfsumme des
     * Zwecks). Dann entfällt die Wiederholung des Probelaufs vor dem Ausführen; die Prüfsumme des Änderungssatzes wird
     * trotzdem verglichen. Ohne Angabe wird der Probelauf immer wiederholt.
     */
    probelaufAktuell?: (db: DbOrTx, laufId: string) => Promise<boolean>;
}
/** Registrierung eines Zwecks (einmal je Prozess, beim Laden des Moduls des Teams) */
export declare function laufZweckRegistrieren(zweck: KiLaufZweck, d: KiLaufZweckDefinition): void;
