import type { AnyFunktionKey } from '../../core/navigation.js';
import type { ErechnungFormat } from '../../core/erechnung.js';
export interface Me {
    id: string;
    benutzername: string;
    anzeigename: string;
    email: string | null;
    authProvider: string;
    mussPasswortAendern: boolean;
    rollen: string[];
    /** Anzeigenamen der Rollen (auch selbst angelegter) */
    rollenNamen?: string[];
    berechtigungen: string[];
    /** Ausschließlich rein lesende Rollen (z. B. Betriebsprüfung): Schreibaktionen ausblenden (der Server lehnt sie ab) */
    nurLesen?: boolean;
    einstellungen?: BenutzerEinstellungen;
    /** Abgeschaltete Funktionen (Administration › Module) */
    deaktiviert?: string[];
    /** 0.13.0: installierbare Module mit Status (Lebenszyklus je Instanz) */
    module?: {
        schluessel: string;
        name: string;
        status: 'verfuegbar' | 'installiert_aktiv' | 'installiert_inaktiv' | 'deinstalliert';
        aktiv: boolean;
    }[];
        zweiFaktorEinrichten?: boolean;
        zweiFaktor?: {
        pflicht: boolean;
        aktiv: boolean;
        sitzungsFaktor: string | null;
    };
    /** 0.16.6 (WCAG 2.2.1): Ablauf der Sitzung ohne Bedienung und Höchstdauer */
    sitzung?: {
        ablaufAm: string;
        hoechstensBis: string;
        leerlaufMinuten: number;
    };
}
export interface BenutzerEinstellungen {
    darstellung?: 'classic' | 'modern';
    /** Funktionsschlüssel aus dem Anwendungsverzeichnis */
    favoriten?: AnyFunktionKey[];
        adminNavZu?: string[];
}
export interface Phone {
    typ: 'festnetz' | 'mobil' | 'fax' | 'zentrale';
    nummer: string;
    nummerE164?: string | null;
}
export interface Customer {
    id: string;
    kundennummer: string;
    name: string;
    typ: 'firma' | 'privat';
    firma: string | null;
    anrede: string | null;
    vorname: string | null;
    nachname: string | null;
    strasse: string | null;
    plz: string | null;
    ort: string | null;
    land: string;
    email: string | null;
    ustId: string | null;
    notiz: string | null;
    rechnungFormat: ErechnungFormat | null;
    rechnungEmail: string | null;
    leitwegId: string | null;
    bauleistender13b: boolean;
        lohnanteilAusweisen?: boolean;
    /** Eigenes Zahlungsziel in Tagen; null = Systemstandard */
    zahlungszielTage: number | null;
        branche?: string | null;
    kundengruppe?: string | null;
        kreditlimitCent?: number | null;
        datevKonto?: number | null;
        skontoTage?: number | null;
    skontoProzent?: number | string | null;
    skonto2Tage?: number | null;
    skonto2Prozent?: number | string | null;
    iban: string | null;
    bic: string | null;
    kontoinhaber: string | null;
    /** Bankverbindung nur teilweise sichtbar (fehlende Berechtigung) */
    ibanMaskiert?: boolean;
    gesperrtAm: string | null;
    sperrgrund: string | null;
    loeschenAb: string | null;
    anonymisiertAm: string | null;
    /** 0.13.0: Interessent (Anfrage ohne Auftrag) oder Kunde */
    status: 'interessent' | 'kunde';
    telefone: Phone[];
    isTest: boolean;
        betreuerId?: string | null;
    betreuerName?: string | null;
    betreuerAktiv?: boolean | null;
    /** Rabattgruppe für Kundenpreise */
    rabattgruppeId?: string | null;
        phase?: 'neu' | 'kontaktiert' | 'beratung' | 'angebot' | 'verloren' | null;
    herkunft?: string | null;
        hauptkontakt?: {
        id: string;
        anrede: string | null;
        vorname: string | null;
        nachname: string;
        name: string;
        funktion: string | null;
        email: string | null;
        telefon: string | null;
    } | null;
    kalkulationen?: {
        id: string;
        nummer: string;
        bezeichnung: string;
        createdAt: string;
        /** 0.13.0: Art der Kalkulationsquelle (Positionstyp des Moduls) */
        art?: string;
    }[];
}
export interface Supplier {
    id: string;
    lieferantennummer: string;
    name: string;
    kundennummerBeiLieferant: string | null;
    strasse: string | null;
    plz: string | null;
    ort: string | null;
    land: string;
    email: string | null;
    ustId: string | null;
    telefone: Phone[];
    zahlungszielTage: number | null;
    iban: string | null;
    bic: string | null;
        website?: string | null;
    kontoinhaber: string | null;
    ibanMaskiert?: boolean;
    isTest: boolean;
}
export interface Article {
    id: string;
    artikelnummer: string;
    bezeichnung: string;
    beschreibung: string | null;
    kategorie: string;
    einheit: string;
    ekCent?: number | null;
    vkCent?: number | null;
    lieferantId: string | null;
    lieferantName?: string | null;
    lieferantenArtikelnummer: string | null;
    aktiv: boolean;
    isTest: boolean;
        hauptbildId?: string | null;
        barcode?: string | null;
        standardlagerplatz?: string | null;
    mindestbestand?: number | null;
    bestellmenge?: number | null;
        frei?: number | null;
}
export interface Paged<T> {
    total: number;
    items: T[];
}
