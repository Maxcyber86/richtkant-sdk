import type { FuellungsRechner } from '../core/modulsystem/fuellung.js';
import type { KiGlossarEintrag } from '../core/ki-glossar.js';
import type { PositionInput } from '../core/schemas2.js';
import type { DbOrTx } from './db/client.js';
import type { Ctx } from './services/context.js';
import type { Bedarf } from './services/einkauf.js';
import type { Etikett } from './services/etiketten.js';
import type { FertigungsGenerator } from './services/shopfloor.js';
import type { PgTable } from 'drizzle-orm/pg-core';
import type { DemoKontext } from './services/demodaten/hilfen.js';
export interface PositionstypErweiterung {
        typ: string;
        label: string;
    /** Einkaufspreis je Stück aus der Quelle (für Positionen ohne übergebenen EK); fehlende Quellen fehlen in der Map */
    ekJeStueck(db: DbOrTx, quelleIds: readonly string[]): Promise<Map<string, number | null>>;
    /** Belegposition aus einer gespeicherten Quelle (Kalkulation); wirft 404, wenn die Quelle fehlt */
    positionAusQuelle(db: DbOrTx, id: string): Promise<{
        position: PositionInput;
        kundeId: string | null;
    }>;
    /** Nummern der Quellen, die Demodaten sind (Übernahme in echte Angebote gesperrt) */
    demoQuellen(db: DbOrTx, ids: readonly string[]): Promise<string[]>;
    /** Betreff eines neuen Angebots aus Quellen dieses Typs (Standard des Core: 'Angebot') */
    angebotsBetreff?: string;
}
export interface BedarfsQuelle {
        quellTyp: string;
    /** Positionstyp in Belegen, dessen `quelleId` auf diese Quelle zeigt */
    positionstyp: string;
    /** Bedarf einer Quelle; wirft EinkaufError, wenn sie fehlt */
    bedarf(ctx: Ctx, id: string, wahl: Record<string, string>): Promise<Bedarf>;
    /** Bedarf einer Belegposition (Menge der Position maßgeblich); null, wenn die Quelle fehlt */
    ausBelegposition(ctx: Ctx, p: {
        pos: number;
        quelleId: string;
        menge: number;
    }, wahl: Record<string, string>): Promise<Pick<Bedarf, 'positionen' | 'technischeFehler'> | null>;
    /** Hinweis, wenn die Quelle einer Belegposition fehlt */
    fehltText: string;
}
/** Bezug eines Etiketts auf einen Auftrag */
export interface EtikettBezug {
    menge?: number;
    auftrag?: {
        id: string;
        nummer: string | null;
        pos: number;
        kunde: string;
    };
}
export interface EtikettenQuelle {
        quellTyp: string;
    positionstyp: string;
    /** Leserecht der Quelle zusätzlich zu „etiketten.drucken“; der Quelltyp ist zugleich Protokoll-Entität */
    recht: string;
    /** Etiketten zur Quelle; leere Liste, wenn die Quelle fehlt */
    etiketten(db: DbOrTx, origin: string | undefined, id: string, bezug: EtikettBezug): Promise<Etikett[]>;
    /** Meldung, wenn die Quelle fehlt */
    nichtGefunden: string;
}
/** Ergebnis einer Arbeitsauftrag-Quelle für eine Auftragsposition */
export interface AaAusPosition {
    material: {
        id: string;
        artikelId: string | null;
        bezeichnung: string;
        menge: number;
        einheit: string;
        masse: string | null;
        entnommen: number;
    }[];
    masse: {
        bezeichnung: string;
        wert: string;
    }[];
    schritte: {
        titel: string;
        beschreibung: string | null;
        sollMinuten: number | null;
        maschineId: string | null;
    }[];
    sollMinuten: number | null;
}
/** Abschnitt einer Quelle im Auftragsblatt (PDF) */
export interface AaBlattAbschnitt {
    ueberschrift: string;
    /** Gerahmter Stempel unter der Überschrift (z. B. Freigabestand); `regulaer: false` hebt ihn in der Akzentfarbe hervor */
    stempel?: {
        text: string;
        regulaer: boolean;
    } | null;
    /** Absätze; Standard Größe 9, Schrift regulär, Farbe Text */
    zeilen: {
        text: string;
        groesse?: number;
        schrift?: 'r' | 'm' | 'b';
        ton?: 'akzent' | 'leise';
    }[];
    /** Tabelle anstelle der Teileliste, wenn der Arbeitsauftrag kein Material enthält (z. B. Zuschnitt der Quelle) */
    ersatzMaterial?: {
        ueberschrift: string;
        kopf: string[];
        breiten: number[];
        zeilen: string[][];
    } | null;
}
export interface AaQuelle {
    /** Wert von `arbeitsauftraege.quelle_art` (CHECK `aa_quelle_ck`) */
    art: string;
    positionstyp: string;
    /** null, wenn die Quelle fehlt (dann entsteht der Arbeitsauftrag wie für eine Artikelposition ohne Material) */
    ausPosition(ctx: Ctx, p: {
        quelleId: string;
        menge: number;
    }, cache: Map<string, unknown>): Promise<AaAusPosition | null>;
    /** Detaildaten für die Arbeitsauftragsansicht; erscheinen dort unter dem Schlüssel `art` */
    detail(db: DbOrTx, quelleId: string): Promise<Record<string, unknown> | null>;
    /** Abschnitt im Auftragsblatt aus den Detaildaten */
    blatt?(detail: Record<string, unknown>): AaBlattAbschnitt | null;
    /** Zeichnung der Quelle als PDF (GET /arbeitsauftraege/:id/zeichnung) */
    zeichnung?(db: DbOrTx, quelleId: string, kontext: {
        titel: string;
    }): Promise<{
        pdf: Buffer;
        dateiname: string;
    } | null>;
}
export interface InsightQuelle {
    /** Anzahl Kalkulationen bzw. Vorgänge mit diesem Lieferanten (fließt in die Auftragszahl des Risikos ein) */
    lieferantVorgaenge(db: DbOrTx, lieferantId: string): Promise<number>;
}
export interface DatenschutzHook {
    /** Personenbezug zum Kunden in Modultabellen entfernen (innerhalb der Anonymisierungstransaktion) */
    kundeAnonymisieren(tx: DbOrTx, kundeId: string): Promise<void>;
}
export interface KalkulationsQuelle {
        art: string;
    label: string;
    /** Letzte Kalkulationen eines Kunden (neueste zuerst) */
    kundenKalkulationen(db: DbOrTx, kundeId: string, limit: number): Promise<{
        id: string;
        nummer: string;
        bezeichnung: string;
        createdAt: Date;
    }[]>;
    /**
     * Kalkulationsliste (Seite „Kalkulationen“, Auswahl „Kalkulationen übernehmen“ im Beleg). Ohne `liste` erscheint die
     * Quelle dort nicht. Die Angaben für Reiter, Rechner und Datensatztyp stehen in `liste.anzeige`.
     */
    liste?: {
        anzeige: KalkulationsListeAnzeige;
        /** Neueste Kalkulationen (abwärtsverträgliche Liste ohne Blättern; Grenze der Quelle) */
        zeilen(db: DbOrTx, sicht: {
            ek: boolean;
            vk: boolean;
            intern: boolean;
        }): Promise<KalkulationsZeile[]>;
                seite?(db: DbOrTx, sicht: {
            ek: boolean;
            vk: boolean;
            intern: boolean;
        }, a: KalkulationsSeitenAbfrage): Promise<KalkulationsZeile[]>;
        /** 0.16.13 (additiv): Anzahl der Kalkulationen mit denselben Filtern (ohne Cursor), für Reiter und „x von N“ */
        anzahl?(db: DbOrTx, a: Omit<KalkulationsSeitenAbfrage, 'grenze' | 'nach'>): Promise<number>;
    };
}
export interface KalkulationsSeitenAbfrage {
    /** Höchstzahl der Zeilen (der Core übergibt Seitengröße + 1) */
    grenze: number;
    /** Fortsetzung: nur Zeilen hinter (Erstellzeit in ms als ISO-Text, Kennung) in absteigender Folge */
    nach?: {
        zeit: string;
        id: string;
    } | null;
    /** Suchbegriff (Nummer, Bezeichnung, Kunde; Quelle darf weitere Felder einbeziehen) */
    q?: string;
    /** nur Kalkulationen dieses Kunden */
    kundeId?: string;
    /** Demo-Kalkulationen ausblenden */
    ohneDemo?: boolean;
    /** Wert des Quellenfilters (`anzeige.filter`), z. B. Freigabestand */
    filterWert?: string;
}
/** Darstellung einer Kalkulationsquelle in der Kalkulationsliste */
export interface KalkulationsListeAnzeige {
        reiter: string;
        typLabel: string;
    /** Reihenfolge der Reiter (aufsteigend); der erste ist voreingestellt */
    reihenfolge: number;
    /** Rechner (Funktion) für „Neue Kalkulation“ und Verweise */
    funktion: string;
    /** Datensatztyp der Kalkulation (Permalink) */
    entitaet: string;
    /** Beschriftung der Aktion bei leerer Liste */
    leerAktion: string;
    /** Endpunkt zum Löschen (DELETE), `:id` wird ersetzt */
    loeschPfad: string;
    /** Optionaler Filter über `KalkulationsZeile.filterWert` */
    filter?: {
        label: string;
        optionen: Record<string, string>;
    };
}
export interface KalkulationsZeile {
    id: string;
    nummer: string;
    bezeichnung: string;
    /** Zweite Zeile in der Liste, z. B. Artikel und Fläche */
    detail: string;
    /** Text im Auswahldialog eines Belegs */
    auswahlText: string;
    revision?: number;
    /** Kennzeichen hinter der Bezeichnung */
    kennzeichen?: {
        text: string;
        ton: 'float' | 'warn';
    }[];
    filterWert?: string;
    kunde: {
        id: string;
        name: string;
    } | null;
    menge: number;
    ekCent?: number | null;
    vkCent?: number | null;
    isTest: boolean;
    createdAt: Date;
}
export interface ArtikelErweiterung {
        kategorie: string;
        spalte: string;
    /** Prüfung beim Anlegen bzw. Ändern; liefert eine Fehlermeldung oder null */
    pruefen(artikel: {
        kategorie: string;
        einheit: string;
        erweiterung: unknown;
    }): string | null;
    /**
     * Prüfung im Stammdatenimport (die Erweiterungsspalte selbst wird nicht importiert). `kategorie` ist die Zielkategorie,
     * `gelieferteKategorie` die aufgelöste Angabe der Zeile bzw. des Bestands, `bestand` der Wert der Erweiterungsspalte.
     */
    importPruefen?(z: {
        kategorie: string;
        gelieferteKategorie: string | null;
        einheit: string | null;
        bestand: unknown;
    }): {
        feld: string;
        text: string;
    }[];
}
export interface PreisStichtagBeitrag {
    /** Fällige Versionen übernehmen; liefert die Anzahl */
    ausfuehren(ctx: Ctx, heute: string): Promise<number>;
    /** Teil der Benachrichtigung, z. B. „3 Aufpreislisten“ */
    text(anzahl: number): string;
}
export interface DemoBeitrag {
    /**
     * Abschnitt (Titel und Positionen) für einen Demo-Beleg; anlass 'hauptauftrag' = Hauptvorgang des Vertriebs,
     * 'privatangebot' = versendetes Angebot an den Demo-Privatkunden (ohne Beitrag: freie Position)
     */
    belegPositionen?(db: DbOrTx, anlass: 'hauptauftrag' | 'privatangebot'): Promise<{
        titel: string;
        positionen: PositionInput[];
    } | null>;
    /**
     * Ergänzung am Ende eines Core-Bausteins (z. B. 'dokumente'): Datensätze, die nach den Regeln des Core-Bausteins
     * dessen Besitz erhalten (Demo-Kennzeichen, Zuordnung) und mit ihm gelöscht werden
     */
    nachBaustein?(baustein: string, k: DemoKontext): Promise<void>;
    /** Wissensbereich mit Artikeln und Fragen für den Core-Baustein „wissen“ (dessen Regeln für Anlage und Kennzeichen) */
    wissen?(): DemoWissenBeitrag;
}
/** Inhalte eines Moduls für den Demo-Baustein „wissen“ (Personen als Benutzernamen der Demo-Zugänge) */
export interface DemoWissenBeitrag {
    bereich: {
        name: string;
        beschreibung: string;
        symbol: string;
        sortierung: number;
    };
    artikel: {
        autor: string;
        pruefer: string;
        typ: string;
        titel: string;
        zusammenfassung: string;
        schlagworte?: readonly string[];
        funktionen?: readonly string[];
        inhalt: string;
        pruefintervallMonate?: number;
        verantwortlich?: string;
        bewertungen?: {
            von: string;
            wert: number;
        }[];
        anhang?: {
            name: string;
            inhalt: string;
        };
    }[];
    fragen?: {
        von: string;
        titel: string;
        text: string;
        funktion?: string;
    }[];
}
/**
 * Stundensatz für neue Lohnpositionen in Belegen (`GET /documents/lohnsatz`). Ein Modul, das Kalkulationsgrundlagen mit
 * Stundensatz führt, liefert den Vorschlag; ohne Beitrag gibt es keinen Vorschlag (Preis von Hand).
 */
export interface LohnsatzQuelle {
    /** Funktion (Admin-Bereich), in der der Stundensatz gepflegt wird (Fundort im Hinweis) */
    funktion: string;
    /** Stundensatz in Cent; null = nicht gepflegt. `demo`: Demobelege erhalten wie Demo-Kalkulationen Beispielwerte */
    stundensatzCent(db: DbOrTx, demo: boolean): Promise<number | null>;
}
export interface StammdatenFeld {
    /** 'artikel' bzw. 'lieferant' */
    entitaet: 'artikel' | 'lieferant';
        feld: string;
    /** Prüfung und Normalisierung (Standardwerte); Fehler als Liste (Pfad relativ zum Feld, Meldung) */
    pruefen(wert: unknown): {
        ok: true;
        wert: Record<string, unknown>;
    } | {
        ok: false;
        fehler: {
            pfad: string;
            meldung: string;
        }[];
    };
}
export interface DemoUmsetzung {
    /** Schlüssel des Bausteins (wie im Katalog des Manifests) */
    key: string;
    /** Ist der Baustein vollständig eingespielt? */
    vorhanden(k: {
        db: DbOrTx;
    }): Promise<boolean>;
    einspielen(k: DemoKontext): Promise<void>;
    /**
     * Tabellen des Moduls (SQL-Name) → besitzender Baustein als SQL-Ausdruck (Spalten mit Tabellennamen qualifiziert)
     * und ggf. Bedingung für Demodatensätze ohne is_test. `{{VERLAUF_LIEFERANTEN}}` steht für die Lieferanten des
     * Geschäftsverlaufs (Baustein „auswertungen“).
     */
    besitz?: Record<string, {
        tabelle: PgTable;
        besitzer: string;
        demo?: string;
    }>;
    /** Zusätzliche Fälle in Besitz-Ausdrücken von Core-Tabellen: Tabelle → SQL `when … then '<baustein>'` */
    besitzFaelle?: Record<string, string>;
    /** Eigene Tabellen in Löschreihenfolge (abhängige zuerst); sie werden vor den Core-Tabellen gelöscht */
    loeschReihenfolge?: string[];
    /** Verweisende Tabellen ohne eigenes Demo-Kennzeichen → Gruppe und Grund (wie DEMO_VERWEIS_GRUPPEN) */
    verweisGruppen?: Record<string, {
        gruppe: 'begleit' | 'geschaeft' | 'bestandteil' | 'bearbeiter';
        grund: string;
    }>;
    /** Datensatztyp der dauerhaften Verweise (/go/<typ>/<id>) → Tabelle (SQL-Name und Tabellenobjekt) */
    verweisZiele?: Record<string, {
        tabelle: string;
        ziel: PgTable;
    }>;
    /** Aufräumen nach dem Löschen in derselben Transaktion (z. B. Verweise in Einstellungen auf entfernte Lieferanten) */
    nachLoeschen?(tx: DbOrTx, userId: string | null): Promise<void>;
}
/**
 * Artikel einer Füllung, wie der Core ihn an einen Füllungsanbieter übergibt: Preis und Lieferant aus der gewählten
 * Bezugsquelle (bzw. aus dem Artikel). Erweiterungsspalten liest der Anbieter bei Bedarf selbst.
 */
export interface FuellungsArtikel {
    id: string;
    artikelnummer: string;
    bezeichnung: string;
    /** Grundart (articles.kategorie) */
    kategorie: string;
    einheit: string;
    ekCent: number | null;
    lieferantId: string | null;
    lieferantenArtikelnummer: string | null;
    isTest: boolean;
}
export interface FuellungsAuswahlEintrag {
    artikelId: string;
    artikelnummer: string;
    bezeichnung: string;
    /** Art der Berechnung: Schlüssel des Anbieters bzw. 'artikel' (Rückfall) */
    art: string;
    /** Merkmale zur Anzeige (z. B. Dicke, Aufbau) */
    merkmale: string[];
    /** Vorschlag für neue Konfigurationen (z. B. Wärmeschutz-Standard des Anbieters) */
    vorschlag?: boolean;
    isTest: boolean;
}
export interface FuellungsAnbieter {
        art: string;
        label: string;
    /** Ist der Anbieter für diesen Artikel zuständig (z. B. Grundart des Moduls)? Synchron und ohne Datenbank */
    zustaendig(artikel: Pick<FuellungsArtikel, 'id' | 'kategorie' | 'einheit'>): boolean;
    /** Berechnung für einen Artikel vorbereiten (Regeln, Preislisten laden); wirft HttpError bei unvollständigen Stammdaten */
    vorbereiten(db: DbOrTx, artikel: FuellungsArtikel): Promise<FuellungsRechner>;
    /** Wählbare Artikel des Anbieters (aktive Artikel, höchstens `limit`) */
    auswahl(db: DbOrTx, limit: number): Promise<FuellungsAuswahlEintrag[]>;
}
/**
 * 0.13.1: Werkzeug eines Moduls für den KI-Assistenten und den KI-Zugriff (MCP), Erweiterungspunkt „Assistent-Werkzeuge“.
 * Angeboten nur, solange das Modul aktiv ist, die Person eines der Rechte hat und die Verwaltung das Modul für die KI
 * nicht ausgeschlossen hat. Zugriffe laufen ausschließlich über `aufruf` (Schnittstelle mit der Sitzung der Person,
 * Positivliste `routen`); schreibende Werkzeuge liefern nur einen Plan, ausgeführt wird nach Bestätigung durch den Core.
 */
export interface AssistentWerkzeugBeitrag {
    /** Modulschlüssel (für den Ausschluss durch die Verwaltung) */
    modul: string;
        name: string;
    titel: string;
    beschreibung: string;
    /** Mindestens eines dieser Rechte (zusätzlich zu ki.assistent bzw. ki.nutzen) */
    rechte: string[];
    wirkung: 'lesen' | 'schreiben';
    /** JSON-Schema der Eingabe (Objekt) */
    eingabe: Record<string, unknown>;
    /** Positivliste der Schnittstellenaufrufe (Pfad relativ zu /api/v1, ohne Abfrage) */
    routen: {
        methode: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
        muster: RegExp;
    }[];
    /** Lesende Werkzeuge: Ergebnis (wird vor der Weitergabe an die KI minimiert) */
    ausfuehren(k: AssistentWerkzeugAufruf, eingabe: Record<string, unknown>): Promise<unknown>;
    /** Schreibende Werkzeuge: genau ein Schnittstellenaufruf mit verständlicher Vorschau */
    planen?(k: AssistentWerkzeugAufruf, eingabe: Record<string, unknown>): Promise<{
        methode: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
        pfad: string;
        body?: unknown;
        titel: string;
        zeilen: string[];
    }>;
}
/** Zugriff eines Modulwerkzeugs auf die Schnittstelle (mit der Sitzung der Person, nur Pfade der Positivliste) */
export interface AssistentWerkzeugAufruf {
    aufruf<T = unknown>(methode: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', pfad: string, body?: unknown): Promise<T>;
}
/**
 * 0.13.2 (Vertrag 2.1.0): Fachbegriffe eines Moduls für das Glossar des KI-Assistenten, Erweiterungspunkt „KI-Glossar“.
 * Reine Daten (keine Funktionen); zählen nur, solange das Modul aktiv ist. Das Glossar steht im festen Anfang jeder
 * Anfrage an den KI-Anbieter; Einträge knapp und fachlich belegt (Grenzen KI_GLOSSAR_GRENZEN, ungültige Einträge entfallen).
 */
export interface KiGlossarBeitrag {
    /** Modulschlüssel */
    modul: string;
        titel: string;
    eintraege: KiGlossarEintrag[];
}
export interface AufmassZiel {
        ziel: string;
        label: string;
    /** Funktion der Oberfläche, die die Kalkulation mit den Maßen vorbelegt */
    funktion: string;
    /** Recht zum Speichern der Kalkulation */
    recht: string;
    /** Gespeicherte Kalkulation (Nummer) oder null, wenn sie fehlt */
    kalkulation(db: DbOrTx, id: string): Promise<{
        id: string;
        nummer: string;
    } | null>;
}
/** Alle Beiträge eines Moduls */
export interface ErweiterungsSatz {
    positionstypen?: PositionstypErweiterung[];
    bedarfsQuellen?: BedarfsQuelle[];
    etikettenQuellen?: EtikettenQuelle[];
    aaQuellen?: AaQuelle[];
    insightQuellen?: InsightQuelle[];
    datenschutzHooks?: DatenschutzHook[];
    kalkulationsQuellen?: KalkulationsQuelle[];
    artikelErweiterungen?: ArtikelErweiterung[];
    preisStichtag?: PreisStichtagBeitrag[];
    demoBeitraege?: DemoBeitrag[];
    /** Demodaten-Bausteine des Moduls (Umsetzung zum Katalog im Manifest, Besitz der Tabellen) */
    demodaten?: DemoUmsetzung[];
    lohnsatz?: LohnsatzQuelle[];
    stammdatenFelder?: StammdatenFeld[];
    /** Fertigungsgeneratoren je Fertigungsart (`fertigungsauftraege.art`) */
    fertigungsGeneratoren?: Record<string, FertigungsGenerator>;
    /** Füllungsanbieter (Vertrag 2.0.0): Füllungspreis und -berechnung für Elemente anderer Module */
    fuellungen?: FuellungsAnbieter[];
    /** 0.13.1: Werkzeuge für den KI-Assistenten und den KI-Zugriff (MCP) */
    assistentWerkzeuge?: AssistentWerkzeugBeitrag[];
    /** 0.13.2 (Vertrag 2.1.0): Fachbegriffe für das Glossar des KI-Assistenten */
    kiGlossar?: KiGlossarBeitrag[];
        aufmassZiele?: AufmassZiel[];
}
export type ErweiterungsPunkt = keyof ErweiterungsSatz;
/** Hintergrundaufgabe eines Moduls (Spiegel von ModulHintergrundaufgabe, ohne Importzyklus auf sdk/modul.ts) */
export interface ModulAufgabe {
    modul: string;
    name: string;
    intervallMs: number;
    funktion?: string;
    run: (ctx: Ctx) => Promise<void>;
}
