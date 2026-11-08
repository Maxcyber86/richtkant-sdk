export interface ModulChangelogEintrag {
    /** Modulversion (SemVer) */
    version: string;
    /** Auslieferungsdatum (JJJJ-MM-TT) */
    datum: string;
    /** Kurzbezeichnung der Version */
    titel: string;
    neu: string[];
    verbessert: string[];
    behoben: string[];
        betrieb?: string[];
    /** Benötigter Core-Bereich dieser Modulversion (wie Manifest `core`), zur Information */
    benoetigtCore?: string;
}
/**
 * Formprüfung eines Modul-Changelogs: nicht leer, gültige SemVer-Versionen streng absteigend, Datum JJJJ-MM-TT
 * (nicht steigend), Titel und mindestens ein Punkt je Eintrag, erster Eintrag = Modulversion. Liefert Befunde.
 */
export declare function modulChangelogPruefen(modul: string, eintraege: readonly ModulChangelogEintrag[], modulVersion: string): string[];
