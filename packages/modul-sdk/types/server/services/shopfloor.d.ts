import { fertigungsauftraege, maschinen } from '../db/schema.js';
import type { Ctx } from './context.js';
export type FertigungsauftragRow = typeof fertigungsauftraege.$inferSelect;
export type MaschineRow = typeof maschinen.$inferSelect;
export interface FertigungsGenerator {
    /** Maschinentypen (`maschinen.typ`), die Aufträge dieser Art bearbeiten */
    maschinentypen: readonly string[];
    /** Werkstoff im Satz „Die Maschine … bearbeitet keine …“, z. B. „Blechteile“ */
    werkstoff: string;
    /**
     * Geometrie- und Fertigungsdaten zum Auftrag. `daten` reicht der Core unverändert an `programm` weiter; `anzeige`
     * erscheint in der Detailansicht des Fertigungsauftrags unter dem Schlüssel der Art. null, wenn die Quelle fehlt.
     */
    geometrie(ctx: Ctx, fa: FertigungsauftragRow): Promise<{
        daten: unknown;
        anzeige: Record<string, unknown>;
    } | null>;
    /**
     * Maschinenprogramm; wirft ShopfloorError mit verständlicher Meldung, wenn es nicht erzeugt werden darf oder die
     * Quelle fehlt (`daten` null). Die Programmnummer ist zu diesem Zeitpunkt bereits vergeben (wie bisher).
     */
    programm(ctx: Ctx, e: {
        fa: FertigungsauftragRow;
        maschine: MaschineRow;
        programmNr: number;
        menge: number;
        daten: unknown;
    }): Promise<{
        format: string;
        inhalt: string;
        zusatz: Record<string, unknown>;
        name: string;         protokoll?: string[];
    }>;
}
