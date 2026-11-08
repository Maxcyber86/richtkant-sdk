export interface FuellungsBefund {
    severity: 'error' | 'warning' | 'info';
    code: string;
    message: string;
}
/** Ergebnis für eine einzelne Füllung (ein Feld) */
export interface FuellungsTeil {
    flaecheM2: number;
    /** Einkaufspreis der Füllung in Cent; null = kein Preis ermittelbar */
    ekCent: number | null;
    /** false, wenn der Preis nur teilweise ermittelt werden konnte (z. B. fehlende Aufpreise) */
    vollstaendig: boolean;
    befunde: FuellungsBefund[];
}
/** Kontext des Elements für Hinweise des Anbieters (z. B. Sicherheitsanforderungen bei Türen) */
export interface FuellungsElementKontext {
    /** Elementtyp des Verbrauchers, z. B. 'fenster', 'tuer' */
    elementtyp: string;
    /** Element ist eine Tür bzw. bodentief (Anforderungen an Verletzungsschutz) */
    tuer: boolean;
    /** Element trennt beheizte Räume vom Außenbereich bzw. hat Wärmeschutzanforderungen (Standard: true) */
    waermeschutz?: boolean;
}
export interface FuellungsRechner {
        art: string;
    /** Artikel der Füllung; null bei manueller Füllung */
    artikelId: string | null;
    /** Lieferant der Füllung (Bezugsquelle); null = offen */
    lieferantId: string | null;
    bezeichnung: string;
    /** Flächengewicht in kg/m² (Flügelgewicht, Gesamtgewicht) */
    gewichtKgM2: number;
    /** Merkmale zur Anzeige, z. B. Dicke und Aufbau */
    merkmale: string[];
    /** Einkaufspreis je m² als Richtwert (Bestellung); null = unbekannt */
    ekProM2Cent: number | null;
    /** Berechnung einer rechteckigen Füllung (Maße in mm) */
    teil(m: {
        breite: number;
        hoehe: number;
        bezeichnung: string;
    }): FuellungsTeil;
    /** Bestellangabe zu einem Maß (Einkauf), z. B. „Rechteck 600 × 1200 mm“ */
    spezifikation(m: {
        breite: number;
        hoehe: number;
    }): string;
    /** Hinweise zum Element als Ganzes */
    hinweise(e: FuellungsElementKontext): FuellungsBefund[];
}
/** Standard-Flächengewicht, wenn für eine Füllung keines bekannt ist (kg/m²) */
export declare const FUELLUNG_STANDARD_GEWICHT_KG_M2 = 25;
/** Einheiten, deren Preis als Preis je m² gilt */
export declare function istFlaecheneinheit(einheit: string | null | undefined): boolean;
/**
 * Rückfall: Füllung aus einem Artikel ohne fachlichen Anbieter. Preis je m² (Einheit m²) bzw. je Stück (Einheit Stk);
 * bei anderen Einheiten kein Preis. Das Gewicht ist ein Standard- bzw. Einstellungswert und wird als Annahme gemeldet.
 */
export declare function fuellungAusArtikel(a: {
    artikelId: string;
    bezeichnung: string;
    einheit: string;
    ekCent: number | null;
    lieferantId: string | null;
    gewichtKgM2?: number | null;
}): FuellungsRechner;
/** Manuell erfasste Füllung (Freiposition ohne Artikel) */
export interface FuellungFrei {
    bezeichnung: string;
    /** Einkaufspreis je m² in Cent; null = ohne Preis (Kalkulation unvollständig) */
    preisM2Cent: number | null;
    gewichtKgM2: number;
    /** Dicke in mm (nur Anzeige) */
    dickeMm?: number | null;
}
/** Rückfall: manuell erfasste Füllung mit Preis je m² */
export declare function fuellungFrei(f: FuellungFrei): FuellungsRechner;
