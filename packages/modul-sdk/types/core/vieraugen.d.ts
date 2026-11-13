/** Zustand einer Freigabe- bzw. Vier-Augen-Regel für die Übersicht in der Systemübersicht */
export interface FreigabeRegelZustand {
        key: string;
        bereich: string;
    titel: string;
    aktiv: boolean;
    /** Satz zum Zustand (wer wen ausschließt, Grenzen) */
    text: string;
    /** Funktion der Einstellung (Link „Öffnen“) */
    funktion: string;
}
