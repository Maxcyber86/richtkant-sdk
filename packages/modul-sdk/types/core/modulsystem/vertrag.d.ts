import type { AdminGruppe, Nummernkreis } from '../navigation.js';
import type { FunktionsSchalter } from '../modulverwaltung.js';
import type { DemoModulDef } from '../demodaten.js';
import type { ArtikelGrundart, BezugswegVorlageBeitrag, KatalogName, QualifikationsvorlageBeitrag } from './kataloge.js';
/** Version des Modulvertrags (Semver), die dieser Core erfüllt; Module erklären in `vertrag` den benötigten Bereich */
export declare const MODUL_VERTRAG_VERSION = "2.4.0";
/**
 * Hauptversionen des Vertrags, gegen die gebaute Module dieser Core annimmt. Vertrag 2 ist eine Obermenge von 1 (alle
 * Erweiterungspunkte von 1 bestehen unverändert); Module mit Vertrag 1 laufen weiter, gelten aber als veraltet.
 * Die Unterstützung einer Hauptversion endet frühestens mit der übernächsten Minor-Version des Core nach Ankündigung.
 */
export declare const MODUL_VERTRAG_UNTERSTUETZT: readonly number[];
/** Hauptversionen, deren Unterstützung angekündigt ausläuft (Registry meldet einen Hinweis, kein Fehler) */
export declare const MODUL_VERTRAG_VERALTET: readonly number[];
/** Herkunft eines Moduls; beliebiger Fremdcode zur Laufzeit ist ausgeschlossen (Module werden ins Image gebaut) */
export type ModulHerausgeber = 'richtkant' | 'partner';
/** Abhängigkeit von einem anderen Modul (SemVer-Bereich, z. B. '>=1.0.0 <2.0.0') */
export interface ModulAbhaengigkeit {
    modul: string;
    version: string;
    /** Optional: das Modul funktioniert auch ohne, nutzt das andere aber, wenn es aktiv ist */
    optional?: boolean;
}
/** Menübereich (ERP-Modul im Sinn der Navigation), den ein Modul beisteuert */
export interface ModulMenuebereich {
    key: string;
    name: string;
    menue?: string;
    einzeln?: boolean;
    /** Rechte dieses Bereichs; jedes Recht gehört genau einem Bereich */
    permissions: string[];
}
/** Funktion (Menüpunkt, Seite, Admin-Bereich) eines Moduls; Felder wie ErpFunktion, Schlüssel als Zeichenketten */
export interface ModulFunktion {
    key: string;
    /** Menübereich (Core-Bereich wie 'vertrieb' oder ein Bereich aus `verzeichnis.module`) */
    modul: string;
    label: string;
    titel?: string;
    short?: string;
    ziel?: {
        route: string;
        params?: Record<string, string>;
        query?: Record<string, string>;
    };
    permissions?: string[];
    kundenansicht?: boolean;
    exakt?: boolean;
    menue?: boolean;
    admin?: AdminGruppe;
    adminLabel?: string;
    rang?: number;
    mobil?: number;
        unter?: string;
    /**
     * Menüreihenfolge: Funktion vor dieser (Core- oder Modul-)Funktion einordnen. Ohne Angabe bzw. wenn die Funktion
     * fehlt, steht der Eintrag hinter den Core-Funktionen. Rein für die Anzeige, ohne fachliche Wirkung.
     */
    vor?: string;
}
/** Datensatztyp (Verweisziel) eines Moduls; der Pfad entsteht aus der Route und der ID */
export interface ModulEntitaet {
    label: string;
    route: string;
    funktion: string;
    /** Name des ID-Parameters der Route (Standard 'id') */
    parameter?: string;
    zugriff?: string[];
}
/** Beiträge eines Moduls zum Anwendungsverzeichnis (navigation.ts) */
export interface ModulVerzeichnis {
    module?: ModulMenuebereich[];
    funktionen?: ModulFunktion[];
    /** Routenschlüssel → Seitenadresse (z. B. { kalkulator: '/kalkulator' }) */
    routen?: Record<string, string>;
    entitaeten?: Record<string, ModulEntitaet>;
    protokollObjekte?: Record<string, {
        label: string;
        funktion: string;
    }>;
    /** Nachfolger entfallener Schlüssel je Art (wie NACHFOLGER) */
    nachfolger?: Partial<Record<'modul' | 'funktion' | 'entitaet' | 'storyBereich', Record<string, string>>>;
    nummernkreise?: Record<string, Nummernkreis>;
    /** Zusätzliche Reiter an Core-Detailseiten (z. B. { kunde: ['kalkulationen'] }) */
    ansichten?: Partial<Record<'kunde' | 'lieferant' | 'mitarbeiter' | 'projekt', string[]>>;
    /**
     * Frühere Adressteile von Admin-Bereichen (/admin/<alt>) → Funktionsschlüssel des heutigen Bereichs.
     * Damit bleiben Lesezeichen gültig, wenn ein Modul seine Einstellungsseiten umbenennt oder zusammenlegt.
     */
    adminWeiterleitungen?: Record<string, string>;
}
export interface ModulBestand {
    funktionen?: string[];
    routen?: string[];
    entitaeten?: string[];
    protokollObjekte?: string[];
    nummernkreise?: string[];
    rechte?: string[];
    positionstypen?: string[];
}
/** Daten eines Moduls (Sicherung, Archiv, Deinstallation) */
export interface ModulDaten {
    /** Tabellen in Fremdschlüssel-Reihenfolge (Eltern zuerst) */
    tabellen: string[];
    /** Spalten des Moduls an Core-Tabellen; sie bleiben bei der Deinstallation immer stehen */
    erweiterungsspalten?: {
        tabelle: string;
        spalte: string;
    }[];
        migrationen: 'bestand' | 'eigen';
    /**
     * Tabellen mit Kalkulationsunterlagen (Aufbewahrung 6 Jahre ab Jahresende, § 147 Abs. 1 Nr. 5 AO; Annahme). Sie sperren
     * das Löschen der Moduldaten, solange ein Datensatz in der Frist liegt. Ohne Angabe gelten alle Tabellen als solche.
     */
    kalkulationsunterlagen?: string[];
    /** Lesbare Bezeichnung der Tabellen (Meldungen des Core, z. B. Verweise beim Rückgängigmachen eines Imports) */
    bezeichnungen?: Record<string, string>;
    /**
     * Personenbezug zu Kunden (DSGVO, ab 0.13.0): Spalten der Modultabellen mit der ID eines Kunden. Der Core nimmt die
     * Zeilen in die Auskunft nach Art. 15 auf und wendet beim Anonymisieren die Regel an: `leeren` setzt die Spalte auf
     * NULL, `loeschen` entfernt die Zeilen. Die Angaben werden im Bestandseintrag gespeichert, damit Auskunft und
     * Anonymisierung auch wirken, wenn das Modul im laufenden Image fehlt („nicht verfügbar“). Datenschutz-Hooks des
     * Moduls laufen zusätzlich, solange das Modul im Image ist.
     */
    kundenbezug?: ModulKundenbezug[];
}
/** Spalte einer Modultabelle mit Bezug auf einen Kunden (`customers.id`) */
export interface ModulKundenbezug {
    tabelle: string;
    spalte: string;
    anonymisieren: 'leeren' | 'loeschen';
}
/** Manifest eines Moduls (versionierter Vertrag) */
export interface ModulManifest {
        schluessel: string;
        name: string;
    /** SemVer des Moduls */
    version: string;
    /**
     * Benötigter Modulvertrag als Semver-Bereich, z. B. '^2.0.0' (ab 0.13.1). Die Zahl 1 (Form bis 0.13.0) gilt als
     * '^1.0.0' und wird übergangsweise angenommen (MODUL_VERTRAG_UNTERSTUETZT).
     */
    vertrag: string | number;
    /** SemVer-Bereich der unterstützten Core-Version, z. B. '>=0.13.0 <0.14.0' */
    core: string;
    abhaengig?: ModulAbhaengigkeit[];
    herausgeber: ModulHerausgeber;
    /** Lizenzvermerk je Modul (SPDX-Ausdruck bzw. 'LicenseRef-…' für proprietäre Module) */
    lizenz: {
        spdx: string;
        hinweise?: string;
    };
    verzeichnis: ModulVerzeichnis;
    /** Recht → Klartext */
    rechte?: Record<string, string>;
    /** Systemrolle → zusätzliche Rechte aus diesem Modul */
    systemrollen?: Record<string, string[]>;
    /** Schaltbare Funktionen des Moduls (bisherige SCHALTBAR-Einträge) */
    schaltbar?: Record<string, FunktionsSchalter>;
    /**
     * Klartexte der Protokollaktionen des Moduls (Audit-Protokoll, Export, Verlauf). Aktionsschlüssel sind dauerhaft
     * gespeichert; ohne das Modul im Image erscheint der Schlüssel selbst.
     */
    protokollAktionen?: Record<string, string>;
        protokollBereiche?: Record<string, string>;
    /** Positionstypen in Belegen; `fertigungsart` = Bezeichnung als Art eines Fertigungsauftrags (Auswertungen) */
    positionstypen?: {
        typ: string;
        label: string;
        fertigungsart?: string;
    }[];
    /** Einstellungsschlüssel (settings.key), die dem Modul gehören */
    einstellungen?: {
        schluessel: string;
    }[];
    daten: ModulDaten;
    /** Hilfeschlüssel; die Inhalte liefert die Web- bzw. Core-Seite des Moduls */
    hilfe?: string[];
    /** Schlüssel der Demodaten-Bausteine */
    demodaten?: string[];
    /**
     * Katalog der Demodaten-Bausteine des Moduls (Anzeige unter Administration › Demodaten, Abhängigkeiten,
     * Tabellenbezeichnungen). Die Umsetzung (Einspielen, Vorhanden-Prüfung, Besitz der Tabellen) liefert der Server-Teil.
     */
    demodatenKatalog?: DemoModulDef[];
    auswertungen?: {
        quellen?: string[];
        vorlagen?: string[];
    };
    /** Übergang: Schlüssel im Core-Verzeichnis, die diesem Modul gehören (siehe ModulBestand) */
    bestand?: ModulBestand;
    /**
     * Rechte des Moduls, die für jede Rolle (auch eigene) den zweiten Anmeldefaktor erzwingen (wie
     * ZWEI_FAKTOR_PFLICHT_RECHTE des Core). Gilt, solange das Modul verfügbar ist.
     */
    zweiFaktorRechte?: string[];
    /** Kurzbeschreibung für Administration › Module und die Versionsübersicht */
    beschreibung?: string;
    /**
     * Einträge des Moduls in Katalogen des Core (Schlüssel → Bezeichnung), z. B. Reklamationskategorien, Maschinentypen,
     * Benachrichtigungsarten, Etikettenarten. Schlüssel sind dauerhaft gespeichert; Core-Schlüssel haben Vorrang.
     */
    kataloge?: Partial<Record<KatalogName, Record<string, string>>>;
    /** Vorlagen des Qualifikationskatalogs (Personal), die das Modul beisteuert */
    qualifikationsvorlagen?: QualifikationsvorlageBeitrag[];
    /** Vorlagen der Bezugswege für Lieferantenkataloge (Lieferanten der Branche des Moduls) */
    bezugswegVorlagen?: BezugswegVorlageBeitrag[];
    /** Grundarten des Artikelstamms, die das Modul beisteuert (Verhalten im Artikelformular, Erweiterungsfeld) */
    artikelGrundarten?: Omit<ArtikelGrundart, 'modul'>[];
}
/**
 * Lebenszyklus eines Moduls je Instanz: `verfuegbar` (im Image, nie installiert) → `installiert_aktiv` bzw.
 * `installiert_inaktiv` → `deinstalliert`. Nur `installiert_aktiv` macht Funktionen, Routen, Menüs und Aufgaben wirksam.
 */
export type ModulStatusWert = 'verfuegbar' | 'installiert_aktiv' | 'installiert_inaktiv' | 'deinstalliert';
/** Gespeicherte Status (Tabelle modul_installationen); `verfuegbar` hat keine Zeile */
export declare const MODUL_STATUS_GESPEICHERT: readonly ["installiert_aktiv", "installiert_inaktiv", "deinstalliert"];
/** Klartext je Status (Administration, Versionsübersicht) */
export declare const MODUL_STATUS_LABEL: Record<ModulStatusWert, string>;
/** Status eines Moduls, wie ihn /auth/me und /module/pakete melden */
export interface ModulZustand {
    schluessel: string;
    name: string;
    status: ModulStatusWert;
    /** Wirksam aktiv: installiert_aktiv und lizenziert */
    aktiv: boolean;
    lizenziert: boolean;
}
