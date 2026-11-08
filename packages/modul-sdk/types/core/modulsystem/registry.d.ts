/**
 * Prüft, ob eine Version einen Bereich erfüllt. Unterstützt durch Leerzeichen verknüpfte Vergleiche
 * (`>=`, `>`, `<=`, `<`, `=` bzw. ohne Operator), die Kurzformen `^` und `~` sowie Alternativen mit `||`,
 * z. B. '>=0.13.0 <0.14.0' oder '^2.0.0'.
 */
export declare function versionErfuellt(version: string, bereich: string): boolean;
/** Ergebnis der Vertragsprüfung eines Manifests */
export interface VertragsPruefung {
    ok: boolean;
    /** Angenommen, aber gegen eine auslaufende Hauptversion gebaut (Hinweis) */
    veraltet: boolean;
    /** Normalisierter Bereich, z. B. '^2.0.0' */
    bereich: string;
    text: string;
}
/**
 * Vertragsanforderung eines Moduls prüfen. Zahl n (Form bis 0.13.0) gilt als '^n.0.0', eine einfache Version als
 * '^x.y.z'. Kompatibel, wenn MODUL_VERTRAG_VERSION den Bereich erfüllt; Bereiche einer älteren, noch unterstützten
 * Hauptversion (MODUL_VERTRAG_UNTERSTUETZT) werden angenommen, weil jede Hauptversion des Vertrags die Erweiterungs-
 * punkte der vorigen unverändert enthält (Abwärtskompatibilität), und als veraltet gemeldet.
 */
export declare function vertragKompatibel(anforderung: string | number, vertrag?: string): VertragsPruefung;
