import type { AnyFunktionKey, ModulFunktionKey, ModulKey } from '../navigation.js';
import type { Permission } from '../permissions.js';
/** Darstellungsebenen eines Artikels; „kurz“ ist immer vorhanden */
export declare const HILFE_NIVEAUS: {
    readonly kurz: {
        readonly label: "Kurz erklärt";
        readonly text: "Was ist das und wofür brauche ich es?";
    };
    readonly anleitung: {
        readonly label: "Schritt für Schritt";
        readonly text: "So erledigen Sie die Aufgabe.";
    };
    readonly zusammenhaenge: {
        readonly label: "Zusammenhänge";
        readonly text: "Regeln, Abhängigkeiten und Auswirkungen auf andere Bereiche.";
    };
    readonly technik: {
        readonly label: "Technik und Betrieb";
        readonly text: "Rechte, Einstellungen, Schnittstellen und Betrieb für Administration und IT-Dienstleister.";
    };
};
export type HilfeNiveau = keyof typeof HILFE_NIVEAUS;
/** Zielgruppen für Filter und Voreinstellung der Ebene */
export declare const HILFE_ZIELGRUPPEN: {
    readonly anwendung: "Anwendung im Tagesgeschäft";
    readonly fuehrung: "Führung und Geschäftsführung";
    readonly betrieb: "Administration und IT-Betrieb";
};
export type HilfeZielgruppe = keyof typeof HILFE_ZIELGRUPPEN;
export declare const HILFE_ARTEN: {
    readonly einstieg: "Einstieg";
    readonly modul: "Modul";
    readonly funktion: "Funktion";
    readonly bereich: "Bereich einer Seite";
    readonly prozess: "Ablauf";
    readonly begriffe: "Begriffe";
    readonly technik: "Technik und Betrieb";
};
export type HilfeArt = keyof typeof HILFE_ARTEN;
/** Aus den Registern erzeugte Inhalte; sie aktualisieren sich mit jeder Version selbst */
export declare const HILFE_GENERIERT: {
    readonly rechte: "Benötigte Rechte und Rollen";
    readonly modulRechte: "Rechte des Moduls";
    readonly schalter: "Ein- und Abschalten, Abhängigkeiten";
    readonly aenderungen: "Änderungen in den letzten Versionen";
    readonly api: "Schnittstellen dieser Funktion";
    readonly rollenMatrix: "Rollen und Rechte im Überblick";
    readonly module: "Module und Funktionen";
    readonly tastatur: "Tastenkürzel";
    readonly versionen: "Versionsverlauf";
};
export type HilfeGeneriert = keyof typeof HILFE_GENERIERT;
export type HilfeHinweisTon = 'info' | 'tipp' | 'warnung' | 'recht';
export type HilfeBlock = {
    t: 'absatz';
    text: string;
} | {
    t: 'schritte';
    schritte: string[];
} | {
    t: 'liste';
    punkte: string[];
} | {
    t: 'hinweis';
    ton: HilfeHinweisTon;
    text: string;
} | {
    t: 'tabelle';
    kopf: string[];
    zeilen: string[][];
} | {
    t: 'begriffe';
    eintraege: [string, string][];
} | {
    t: 'ablauf';
    schritte: {
        titel: string;
        text: string;
        funktion?: AnyFunktionKey | ModulFunktionKey;
    }[];
} | {
    t: 'code';
    text: string;
    sprache?: 'bash' | 'json' | 'text' | 'yaml';
} | {
    t: 'zwischentitel';
    text: string;
} | {
    t: 'generiert';
    was: HilfeGeneriert;
    modul?: ModulKey;
};
export interface HilfeFrage {
    frage: string;
    antwort: string;
}
/** Eingabeform eines Artikels in den Inhaltsdateien */
export interface HilfeThema {
    titel: string;
    art: HilfeArt;
    /** Funktion, zu der der Artikel gehört (Seite, Rechte, Fundort, Absprung in die Anwendung) */
    /** Funktion des Artikels (Core oder Modul) */
    funktion?: AnyFunktionKey | ModulFunktionKey;
    modul?: ModulKey;
    /** Übergeordneter Artikel (Bereiche einer Seite → Funktion, Funktion → Modul) */
    eltern?: string;
    /** Ein bis zwei Sätze; erscheint im Fragezeichen und in Suchtreffern */
    kurz: string;
    anleitung?: HilfeBlock[];
    zusammenhaenge?: HilfeBlock[];
    technik?: HilfeBlock[];
    faq?: HilfeFrage[];
    /** Verwandte Artikel */
    siehe?: string[];
    /** Weitere Suchbegriffe und Synonyme (z. B. „Kantenschliff“, „KGN“) */
    stichworte?: string[];
    /** Zusätzliche Rechte, die der Artikel nennt (die Rechte der Funktion kommen aus dem Verzeichnis) */
    rechte?: Permission[];
    zielgruppen?: HilfeZielgruppe[];
    /** Version, für die der Inhalt zuletzt geprüft wurde */
    stand: string;
}
export declare const absatz: (text: string) => HilfeBlock;
export declare const schritte: (...s: string[]) => HilfeBlock;
export declare const liste: (...p: string[]) => HilfeBlock;
export declare const tipp: (text: string) => HilfeBlock;
export declare const info: (text: string) => HilfeBlock;
export declare const warnung: (text: string) => HilfeBlock;
export declare const recht: (text: string) => HilfeBlock;
export declare const tabelle: (kopf: string[], ...zeilen: string[][]) => HilfeBlock;
export declare const begriffe: (...e: [string, string][]) => HilfeBlock;
export declare const ablauf: (...s: {
    titel: string;
    text: string;
    funktion?: AnyFunktionKey | ModulFunktionKey;
}[]) => HilfeBlock;
export declare const code: (text: string, sprache?: "bash" | "json" | "text" | "yaml") => HilfeBlock;
export declare const titel: (text: string) => HilfeBlock;
export declare const generiert: (was: HilfeGeneriert, modul?: ModulKey) => HilfeBlock;
/** Hält die Schlüssel einer Inhaltsdatei als Literaltypen fest (für typgeprüfte Verweise aus der Oberfläche) */
export declare function themen<const T extends Record<string, HilfeThema>>(t: T): T;
