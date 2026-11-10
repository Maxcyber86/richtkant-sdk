export type BedarfsQuellTyp = 'artikel' | 'beleg' | 'projekt' | (string & {});
export interface BedarfsQuelle {
    typ: BedarfsQuellTyp;
    id: string;
    bezeichnung: string;
}
export interface BedarfsPosition {
    quelle: BedarfsQuelle;
    artikelId: string | null;
    artikelnummer: string | null;
    bezeichnung: string;
        spezifikation: string | null;
    menge: number;
    einheit: string;
    lieferantId: string | null;
    lieferantenArtikelnummer: string | null;
    ekCent: number | null;
        deckung?: {
        bedarf: number;
        bestellt: number;
        lager: number;
    };
        schluessel?: string;
        bestellEinheit?: {
        id: string;
        einheit: string;
        faktor: number;
        mindestmenge: number | null;
        staffel: number | null;
    } | null;
    bestellMenge?: number | null;
    ekCentEinheit?: number | null;
        gtin?: string | null;
}
