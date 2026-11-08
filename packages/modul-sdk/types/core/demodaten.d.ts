import { type FunktionKey, type ModulFunktionKey, type ModulKey } from './navigation.js';
/** Erkennt Namen von Demodatensätzen (DEMO-… und rückwärtskompatibel TEST-…, ohne Groß-/Kleinschreibung) */
export declare function istDemoName(name: string | null | undefined): boolean;
export interface DemoModulDef {
    /** Dauerhafter Schlüssel */
    key: string;
    name: string;
    /** Was die Demodaten zeigen */
    beschreibung: string;
    /** Welche Konfiguration vorgeführt wird (wie ein Bereich eingerichtet sein muss) */
    konfiguration: string[];
    /** Abläufe, die sich damit durchspielen lassen */
    ablaeufe: string[];
    /** Demo-Module, die vorher eingespielt sein müssen */
    abhaengig: readonly string[];
        abhaengigOptional?: readonly string[];
    /** Zugehörige ERP-Module */
    erpModule: readonly ModulKey[];
    /** Abgedeckte Funktionen (Menüpunkte, Admin-Bereiche) */
    funktionen: readonly (FunktionKey | ModulFunktionKey)[];
    /**
     * Nur Demo-Module von Modulen: Demo-Module des Core, für die dieses Modul eine optionale Voraussetzung ist (z. B.
     * ['vertrieb'], weil der Demo-Hauptauftrag Kalkulationspositionen des Moduls enthält). Ist das Modul installiert,
     * wird es vorher eingespielt und nachher gelöscht; ohne das Modul läuft der Core-Baustein allein.
     */
    voraussetzungFuer?: readonly string[];
    /** Nur Demo-Module von Modulen: lesbare Bezeichnungen der Tabellen des Moduls für die Zähler */
    tabellenLabel?: Readonly<Record<string, string>>;
}
