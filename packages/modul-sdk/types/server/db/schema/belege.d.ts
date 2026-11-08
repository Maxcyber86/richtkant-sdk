export interface ErechnungPruefungKurz {
    gueltig: boolean;
    format: string;
    geprueftAm: string;
    regelwerk: string;
    fehler: {
        regel: string;
        text: string;
    }[];
    warnungen: {
        regel: string;
        text: string;
    }[];
}
