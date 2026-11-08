import { type FuellungsRechner } from '../../core/modulsystem/fuellung.js';
import type { DbOrTx } from '../db/client.js';
import { type FuellungsArtikel, type FuellungsAuswahlEintrag } from '../erweiterungen.js';
/** Anbieter und wählbare Füllungen: Artikel der aktiven Anbieter, danach Artikel mit Preis je m² (Rückfall) */
export declare function fuellungsAuswahl(db: DbOrTx, limit?: number): Promise<{
    anbieter: {
        art: string;
        label: string;
    }[];
    artikel: FuellungsAuswahlEintrag[];
}>;
/**
 * Berechnung einer Füllung aus einem Artikel vorbereiten: zuständiger aktiver Anbieter, sonst Rückfall (Preis je m²
 * bzw. Stück aus Artikel/Bezugsquelle, Gewicht `standardGewichtKgM2`).
 */
export declare function fuellungVorbereiten(db: DbOrTx, artikel: FuellungsArtikel, opt?: {
    standardGewichtKgM2?: number | null;
}): Promise<FuellungsRechner>;
/** Zuständiger aktiver Anbieter eines Artikels (Schlüssel) oder 'artikel' für den Rückfall */
export declare function fuellungsArt(artikel: Pick<FuellungsArtikel, 'id' | 'kategorie' | 'einheit'>): Promise<string>;
