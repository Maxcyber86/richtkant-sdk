export type InterneWertArt = 'einkauf' | 'marge' | 'kosten' | 'lieferant' | 'bestand' | 'risiko' | 'nachkalkulation' | 'notiz' | 'kalkulationshinweis' | 'intern';
/** Ein interner Wert: Feldname der Schnittstelle (genau, camelCase) */
export interface InternesFeld {
    feld: string;
    art: InterneWertArt;
        bereiche?: readonly string[];
    /** Kurzer Grund (Dokumentation und Übersicht in der Administration) */
    grund: string;
}
/** Feldgruppe, die ein Betrieb in der Administration zusätzlich ausblenden kann (nie zurücknehmen) */
export interface AusblendbaresFeld {
        schluessel: string;
    bezeichnung: string;
    beschreibung: string;
    felder: readonly string[];
    /** wie `InternesFeld.bereiche` */
    bereiche?: readonly string[];
}
/** Kennzeichnung interner Werte eines Moduls (Manifest `interneWerte`) bzw. des Core */
export interface InterneWerteKennzeichnung {
    felder?: readonly InternesFeld[];
    /** Schnittstellenbereiche, die in der Kundenansicht gesperrt sind (Routenmuster-Präfix wie `InternesFeld.bereiche`) */
    bereiche?: readonly string[];
    /** Rechte, die in der Kundenansicht ruhen (Core- oder eigene Rechte des Moduls) */
    rechte?: readonly string[];
    /** KI-Werkzeuge (Namen), die in der Kundenansicht nicht angeboten werden */
    werkzeuge?: readonly string[];
    /** Routenmuster (genau), die in der Kundenansicht Dateien ausliefern dürfen (z. B. Bilder für den Kunden) */
    dateien?: readonly string[];
    ausblendbar?: readonly AusblendbaresFeld[];
}
