import type { KiLaufZweck } from '../../../core/ki.js';
import type { Permission } from '../../../core/permissions.js';
import type { ImportAkteur } from '../import/index.js';
import type { Ctx } from '../context.js';
import type { PdfSeite } from './pdf.js';
/** Auswertung eines PDF-Datenblatts über die KI für eine Katalogart */
export interface KatalogPdfAuswertung {
    anweisung: string;
    version: string;
    schema: unknown;
    schemaName: string;
    /** Pflichtangaben der Anfrage prüfen; liefert eine Fehlermeldung oder null */
    eingabePruefen(e: Record<string, unknown>): string | null;
    /** Antwort übernehmen (Staging bzw. Datenblatt) und die Vorschau erstellen */
    abschliessen(ctx: Ctx, a: ImportAkteur, laufId: string, k: {
        antwort: unknown;
        seiten: PdfSeite[];
        dateiname: string;
        pdfSha256: string;
        antwortId: string;
        rechte: {
            von: string;
            am: string;
            text: string;
        };
        eingabe: Record<string, unknown>;
    }): Promise<{
        zeilen: number;
        abgelehnt: number;
    }>;
}
export interface KatalogArtDefinition {
    /** Zweck des Laufs (ki_laeufe.zweck), zugleich Importart */
    zweck: KiLaufZweck;
    /** Eigene Dateiformate der Katalogart; der Lieferantenkatalog weist sie mit Verweis auf den Einstieg zurück */
    formate: readonly string[];
    /** Funktion, unter der die Katalogart importiert wird (Fundort in Meldungen) */
    funktion: string;
    /** Grundrechte für alle Aktionen an einem Lauf dieser Art (einschließlich import.ausfuehren) */
    rechte: Permission[];
    pdf?: KatalogPdfAuswertung;
    /**
     * 0.15.2 (optional): Erkennung für die zentrale Datenübernahme – liefert das Format der Katalogart, wenn die Datei dazu
     * gehört (Anfang der Datei, höchstens 1 MB), sonst null.
     */
    erkennen?: (anfang: Buffer, dateiname: string) => string | null;
}
/** Registrierung (einmal je Prozess, beim Laden des Modulcodes) */
export declare function katalogArtRegistrieren(d: KatalogArtDefinition): void;
