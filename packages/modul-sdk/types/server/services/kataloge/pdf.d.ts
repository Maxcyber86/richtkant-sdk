export interface PdfZeile {
    seite: number;
    zeile: number;
    text: string;
    /** [x, y, Breite, Höhe] in PDF-Punkten (Ursprung unten links) */
    rechteck: [number, number, number, number];
}
export interface PdfSeite {
    nr: number;
    zeilen: PdfZeile[];
    /** Keine Textobjekte, aber Bilder: vermutlich gescannt */
    scan: boolean;
}
