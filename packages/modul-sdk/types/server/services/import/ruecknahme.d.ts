/** Ziel eines Imports: Tabelle und Schlüssel (bei zusammengesetzten Schlüsseln die Teile mit „|“ verbunden) */
export interface ImportZiel {
    tabelle: string;
    id: string;
}
