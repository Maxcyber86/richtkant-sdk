import type { Permission } from './permissions.js';
export declare const ROUTES: {
    readonly start: "/";
    readonly konto: "/konto";
    readonly kunden: "/kunden";
    readonly kunde: "/kunden/:id";
    readonly lieferanten: "/lieferanten";
    readonly lieferant: "/lieferanten/:id";
    readonly artikel: "/artikel";
        readonly artikelDetail: "/artikel/:id";
    readonly kommunikation: "/kommunikation";
    readonly belege: "/belege";
    readonly beleg: "/belege/:id";
    readonly kalkulationen: "/kalkulationen";
    readonly einsaetze: "/einsaetze";
    readonly meineEinsaetze: "/meine-einsaetze";
    readonly reklamationen: "/reklamationen";
    readonly reklamation: "/reklamationen/:id";
    readonly verbesserungen: "/verbesserungen";
    readonly verbesserung: "/verbesserungen/:id";
    readonly dms: "/dms";
    readonly shopfloor: "/shopfloor";
    readonly fertigungsauftrag: "/shopfloor/auftraege/:id";
    readonly arbeitszeit: "/arbeitszeit";
    readonly arbeitszeiten: "/arbeitszeiten/:userId?";
    readonly admin: "/admin/:bereich?";
    readonly eingangsrechnungen: "/eingangsrechnungen";
    readonly eingangsrechnung: "/eingangsrechnungen/:id";
    readonly bestellungen: "/bestellungen";
    readonly bestellung: "/bestellungen/:id";
    readonly preisanfragen: "/preisanfragen";
    readonly preisanfrage: "/preisanfragen/:id";
    readonly lager: "/lager";
    readonly projekte: "/projekte";
    readonly projekt: "/projekte/:id";
    readonly meinBereich: "/mein-bereich";
    readonly personal: "/personal";
    readonly mitarbeiter: "/personal/:id";
    readonly abwesenheiten: "/abwesenheiten";
        readonly auslastung: "/auslastung";
        readonly kapazitaet: "/kapazitaet";
    readonly qualifikationen: "/qualifikationen";
    readonly entwicklung: "/entwicklung";
    readonly feedback: "/entwicklung/feedback/:id";
    readonly auswertungen: "/auswertungen";
    readonly auswertungDashboard: "/auswertungen/dashboards/:id";
    readonly auswertungBerichte: "/auswertungen/berichte";
    readonly auswertungBericht: "/auswertungen/berichte/:id";
    readonly wissen: "/wissen";
    readonly hilfe: "/wissen/hilfe";
    readonly hilfeThema: "/wissen/hilfe/:thema";
    readonly firmenwissen: "/wissen/firmenwissen";
    readonly wissenArtikel: "/wissen/artikel/:id";
    readonly wissenFragen: "/wissen/fragen";
    readonly wissenFrage: "/wissen/fragen/:id";
    readonly buchhaltung: "/finanzen/buchhaltung";
    readonly benachrichtigungen: "/benachrichtigungen";
    readonly lieferscheine: "/lieferscheine";
    readonly lieferschein: "/lieferscheine/:id";
    readonly mahnwesen: "/finanzen/mahnwesen";
    readonly mahnlauf: "/finanzen/mahnwesen/:id";
    readonly wartung: "/wartung";
    readonly wartungsvertrag: "/wartung/:id";
    readonly nachkalkulation: "/nachkalkulation";
    readonly kundenportal: "/kundenportal";
    readonly kundenpreise: "/preise";
    readonly inventur: "/inventur";
    readonly inventurDetail: "/inventur/:id";
    readonly etiketten: "/etiketten";
    readonly zahlungseingaenge: "/finanzen/zahlungseingaenge";
    readonly kiImport: "/ki-import";
    readonly kiImportLauf: "/ki-import/:id";
    /** Zustimmungsseite für KI-Clients (OAuth-Autorisierung des MCP-Zugangs) */
    readonly kiFreigabe: "/ki-zugriff/freigabe";
    /** Nicht unter /personal/…, weil das mit /personal/:id kollidiert */
    readonly lohndaten: "/lohndaten";
    readonly arbeitsauftraege: "/arbeitsauftraege";
    readonly arbeitsauftrag: "/arbeitsauftraege/:id";
    readonly meineArbeitsauftraege: "/meine-arbeitsauftraege";
    readonly betriebsmittel: "/betriebsmittel";
    readonly betriebsmittelPruefungen: "/betriebsmittel/pruefungen";
    readonly betriebsmittelDetail: "/betriebsmittel/:id";
    readonly betriebsmittelAusleihe: "/betriebsmittel/ausleihe";
        readonly betriebsmittelAuslastung: "/betriebsmittel/auslastung";
    readonly wareneingang: "/wareneingang";
    readonly wareneingangPruefen: "/wareneingang/pruefen/:id";
    /**
     * Kundenportal für Kundinnen und Kunden: eigener Einstieg mit eigenem Layout und eigener Sitzung
     * (Cookie rk_portal), ohne Mitarbeiter-Navigation. Unterseiten siehe PORTAL_ROUTES (portal.ts).
     */
    readonly portal: "/portal/*";
    /** Öffentliche Seite für externe Feedbackgebende (Zugang nur über den persönlichen Link) */
    readonly feedbackExtern: "/rueckmeldung/:token";
    readonly permalink: "/go/*";
};
export type RouteKey = keyof typeof ROUTES;
export type Query = Record<string, string | number | boolean | null | undefined>;
/** Seitenadresse aus Routenschlüssel, Parametern und Abfrage; fehlende Pflichtparameter sind ein Programmfehler. */
export declare function pfad(route: RouteKey, params?: Record<string, string | number | undefined>, query?: Query): string;
export declare const ERP_MODULE: readonly [{
    readonly key: "allgemein";
    readonly name: "Bedienung allgemein";
    readonly permissions: [];
}, {
    readonly key: "vertrieb";
    readonly name: "Vertrieb & CRM";
    readonly permissions: ["kunden.lesen", "kunden.schreiben", "kommunikation.lesen", "kommunikation.senden", "belege.lesen", "belege.schreiben", "kalkulation.ausfuehren", "kalkulation.speichern", "preise.vk", "datenschutz.verwalten", "lieferscheine.lesen", "lieferscheine.schreiben", "preise.kundenpreise_verwalten", "portal.verwalten", "portal.freigeben", "portal.vertreten", "preise.kundenkonditionen", "einsaetze.eigene_planen"];
}, {
    readonly key: "einkauf";
    readonly name: "Einkauf";
    readonly permissions: ["lieferanten.lesen", "lieferanten.schreiben", "preise.ek", "bestellungen.lesen", "bestellungen.ausloesen"];
}, {
    readonly key: "material";
    readonly name: "Lager & Material";
    readonly menue: "Lager";
    readonly permissions: ["artikel.lesen", "artikel.schreiben", "lager.lesen", "wareneingang.buchen", "inventur.durchfuehren", "inventur.abschliessen", "etiketten.drucken", "lager.entnehmen"];
}, {
    readonly key: "produktion";
    readonly name: "Produktion";
    readonly permissions: ["shopfloor.lesen", "shopfloor.steuern", "arbeitsauftraege.eigene", "arbeitsauftraege.adhoc", "arbeitsauftraege.planen"];
}, {
    readonly key: "projekte";
    readonly name: "Projekte & Montage";
    readonly permissions: ["projekte.lesen", "projekte.planen", "einsaetze.lesen", "einsaetze.planen", "einsaetze.eigene", "reklamationen.lesen", "reklamationen.schreiben", "wartung.lesen", "wartung.schreiben", "nachkalkulation.lesen"];
}, {
    readonly key: "betriebsmittel";
    readonly name: "Betriebsmittel";
    readonly permissions: ["betriebsmittel.lesen", "betriebsmittel.schreiben", "betriebsmittel.einplanen", "betriebsmittel.ausleihen", "betriebsmittel.kosten", "betriebsmittel.verwalten"];
}, {
    readonly key: "finanzen";
    readonly name: "Finanzen & Buchhaltung";
    readonly menue: "Finanzen";
    readonly permissions: ["rechnungen.festschreiben", "eingangsrechnungen.pruefen", "eingangsrechnungen.freigeben", "eingangsrechnungen.freigeben_unbegrenzt", "gobd.export", "buchhaltung.schnittstellen_verwalten", "buchhaltung.export_ausfuehren", "buchhaltung.protokoll_einsehen", "mahnwesen.lesen", "mahnwesen.vorschlag_bearbeiten", "mahnwesen.versenden", "mahnwesen.verwalten", "sepa.freigeben", "zahlungsrichtlinien.verwalten", "bankdaten.bestaetigen", "bank.verwalten", "bank.abgleich"];
}, {
    readonly key: "personal";
    readonly name: "Personal";
    readonly permissions: ["personal.eigene", "zeiten.eigene", "zeiten.verwalten", "personal.lesen", "personal.verwalten", "abwesenheiten.genehmigen", "personalentwicklung.verwalten", "lohn.export"];
}, {
    readonly key: "auswertungen";
    readonly name: "Auswertungen";
    readonly permissions: ["auswertungen.lesen", "auswertungen.erstellen", "auswertungen.verwalten"];
}, {
    readonly key: "wissen";
    readonly name: "Wissen & Hilfe";
    readonly permissions: ["wissen.lesen", "wissen.beitragen", "wissen.schreiben", "wissen.freigeben", "wissen.verwalten"];
}, {
    readonly key: "dokumente";
    readonly name: "Dokumente (DMS)";
    readonly menue: "Dokumente";
    readonly einzeln: true;
    readonly permissions: ["dms.lesen", "dms.schreiben", "dms.verwalten"];
}, {
    readonly key: "verbesserungen";
    readonly name: "Verbesserungen";
    readonly einzeln: true;
    readonly permissions: ["stories.verwalten", "verbesserungen.angebot_anfordern"];
}, {
    readonly key: "administration";
    readonly name: "Administration";
    readonly einzeln: true;
    readonly permissions: ["einstellungen.verwalten", "benutzer.verwalten", "system.backup", "system.audit", "system.testdaten", "sicherheit.verwalten", "betrieb.metriken", "import.ausfuehren", "ki.nutzen", "ki.import", "ki.verwalten", "ki.assistent", "api.verwalten", "mail.postfach", "system.wartung", "betrieb.fernzugriff", "geraete.lesen", "geraete.verwalten", "druckvorgaben.verwalten"];
}];
export type ModulKey = (typeof ERP_MODULE)[number]['key'];
/**
 * Gruppen der Administration. 0.13.0: „Fachbereiche“ enthält die Einstellungen der Fachbereiche des Core (Vertrieb,
 * Material, Personal …); „Module“ enthält ausschließlich die Modulverwaltung und die Einstellungen installierbarer
 * Module (Administration › Module › <Modul>). Funktionen eines Moduls erscheinen immer unter „Module“.
 */
export type AdminGruppe = 'Zugriff' | 'Unternehmen' | 'Fachbereiche' | 'Module' | 'Integration' | 'System';
export declare const FUNKTIONEN: readonly [{
    readonly key: "allgemein.uebersicht";
    readonly modul: "allgemein";
    readonly label: "Übersicht";
    readonly ziel: {
        readonly route: "start";
    };
    readonly exakt: true;
    readonly menue: true;
    readonly mobil: 0;
}, {
    readonly key: "allgemein.konto";
    readonly modul: "allgemein";
    readonly label: "Mein Konto";
    readonly ziel: {
        readonly route: "konto";
    };
}, {
    readonly key: "allgemein.suche";
    readonly modul: "allgemein";
    readonly label: "Suche";
}, {
    readonly key: "allgemein.benachrichtigungen";
    readonly modul: "allgemein";
    readonly label: "Benachrichtigungen";
    readonly ziel: {
        readonly route: "benachrichtigungen";
    };
}, {
    readonly key: "allgemein.anmeldung";
    readonly modul: "allgemein";
    readonly label: "Anmeldung und Darstellung";
}, {
    readonly key: "allgemein.app";
    readonly modul: "allgemein";
    readonly label: "App auf Smartphone und Tablet";
}, {
    readonly key: "vertrieb.kunden";
    readonly modul: "vertrieb";
    readonly label: "Kunden";
    readonly ziel: {
        readonly route: "kunden";
    };
    readonly permissions: ["kunden.lesen"];
    readonly menue: true;
    readonly mobil: 6;
}, {
    readonly key: "vertrieb.kommunikation";
    readonly modul: "vertrieb";
    readonly label: "Kommunikation";
    readonly short: "Verlauf";
    readonly ziel: {
        readonly route: "kommunikation";
    };
    readonly permissions: ["kommunikation.lesen"];
    readonly menue: true;
}, {
    readonly key: "vertrieb.angebote";
    readonly modul: "vertrieb";
    readonly label: "Angebote";
    readonly ziel: {
        readonly route: "belege";
        readonly query: {
            readonly typ: "angebot";
        };
    };
    readonly permissions: ["belege.lesen"];
    readonly menue: true;
    readonly mobil: 5;
}, {
    readonly key: "vertrieb.auftraege";
    readonly modul: "vertrieb";
    readonly label: "Aufträge";
    readonly ziel: {
        readonly route: "belege";
        readonly query: {
            readonly typ: "auftrag";
        };
    };
    readonly permissions: ["belege.lesen"];
    readonly menue: true;
}, {
    readonly key: "vertrieb.kalkulationen";
    readonly modul: "vertrieb";
    readonly label: "Kalkulationen";
    readonly short: "Kalkulation";
    readonly ziel: {
        readonly route: "kalkulationen";
    };
    readonly permissions: ["kalkulation.ausfuehren"];
    readonly menue: true;
    readonly mobil: 8;
}, {
    readonly key: "vertrieb.lieferscheine";
    readonly modul: "vertrieb";
    readonly label: "Lieferscheine (Versand)";
    readonly short: "Lieferscheine";
    readonly ziel: {
        readonly route: "lieferscheine";
    };
    readonly permissions: ["lieferscheine.lesen"];
    readonly menue: true;
}, {
    readonly key: "vertrieb.kundenpreise";
    readonly modul: "vertrieb";
    readonly label: "Kundenpreise";
    readonly titel: "Rabattgruppen und Kundenpreise";
    readonly short: "Preise";
    readonly ziel: {
        readonly route: "kundenpreise";
    };
    readonly permissions: ["preise.kundenpreise_verwalten"];
    readonly menue: true;
}, {
    readonly key: "vertrieb.kundenportal";
    readonly modul: "vertrieb";
    readonly label: "Kundenportal";
    readonly titel: "Kundenportal: Reaktionen, Konten und Zugangslinks";
    readonly short: "Portal";
    readonly ziel: {
        readonly route: "kundenportal";
    };
    readonly permissions: ["portal.freigeben", "portal.verwalten"];
    readonly menue: true;
}, {
    readonly key: "einkauf.bestellungen";
    readonly modul: "einkauf";
    readonly label: "Bestellungen";
    readonly ziel: {
        readonly route: "bestellungen";
    };
    readonly permissions: ["bestellungen.lesen"];
    readonly menue: true;
}, {
    readonly key: "einkauf.preisanfragen";
    readonly modul: "einkauf";
    readonly label: "Preisanfragen";
    readonly titel: "Preisanfragen an Lieferanten";
    readonly short: "Anfragen";
    readonly ziel: {
        readonly route: "preisanfragen";
    };
    readonly permissions: ["bestellungen.lesen"];
    readonly menue: true;
}, {
    readonly key: "einkauf.lieferanten";
    readonly modul: "einkauf";
    readonly label: "Lieferanten";
    readonly titel: "Lieferanten";
    readonly ziel: {
        readonly route: "lieferanten";
    };
    readonly permissions: ["lieferanten.lesen"];
    readonly menue: true;
}, {
    readonly key: "material.artikel";
    readonly modul: "material";
    readonly label: "Artikel";
    readonly ziel: {
        readonly route: "artikel";
    };
    readonly permissions: ["artikel.lesen"];
    readonly kundenansicht: true;
    readonly menue: true;
}, {
    readonly key: "material.lager";
    readonly modul: "material";
    readonly label: "Lager";
    readonly short: "Lager";
    readonly ziel: {
        readonly route: "lager";
    };
    readonly permissions: ["lager.lesen"];
    readonly menue: true;
}, {
    readonly key: "material.wareneingang_pruefung";
    readonly modul: "material";
    readonly label: "Wareneingang";
    readonly titel: "Wareneingang: Lieferungen prüfen und buchen";
    readonly short: "Wareneingang";
    readonly ziel: {
        readonly route: "wareneingang";
    };
    readonly permissions: ["wareneingang.buchen"];
    readonly menue: true;
    readonly mobil: 6.8;
}, {
    readonly key: "material.inventur";
    readonly modul: "material";
    readonly label: "Inventur";
    readonly ziel: {
        readonly route: "inventur";
    };
    readonly permissions: ["lager.lesen", "inventur.durchfuehren", "inventur.abschliessen"];
    readonly menue: true;
    readonly mobil: 6.9;
}, {
    readonly key: "material.etiketten";
    readonly modul: "material";
    readonly label: "Etiketten drucken";
    readonly titel: "Etiketten für Teile, Artikel und Lager";
    readonly ziel: {
        readonly route: "etiketten";
    };
    readonly permissions: ["etiketten.drucken"];
    readonly menue: true;
}, {
    readonly key: "material.artikelarten";
    readonly modul: "material";
    readonly label: "Artikelarten, Merkmale und Einheiten";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten", "artikel.schreiben"];
    readonly admin: "Fachbereiche";
    readonly rang: 57.5;
}, {
    readonly key: "produktion.fertigung";
    readonly modul: "produktion";
    readonly label: "Fertigung";
    readonly ziel: {
        readonly route: "shopfloor";
    };
    readonly permissions: ["shopfloor.lesen"];
    readonly exakt: true;
    readonly menue: true;
    readonly mobil: 10;
}, {
    readonly key: "produktion.maschineneinrichtung";
    readonly modul: "produktion";
    readonly label: "DNC-Schnittstelle";
    readonly titel: "DNC-Schnittstelle der Maschinen";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 61;
}, {
    readonly key: "produktion.arbeitsauftraege";
    readonly modul: "produktion";
    readonly label: "Arbeitsaufträge";
    readonly titel: "Arbeitsaufträge: Planung, Zuweisung und Soll/Ist";
    readonly short: "Aufträge";
    readonly ziel: {
        readonly route: "arbeitsauftraege";
    };
    readonly permissions: ["arbeitsauftraege.planen"];
    readonly menue: true;
}, {
    readonly key: "produktion.meine_arbeitsauftraege";
    readonly modul: "produktion";
    readonly label: "Meine Arbeitsaufträge";
    readonly short: "Meine Aufträge";
    readonly ziel: {
        readonly route: "meineArbeitsauftraege";
    };
    readonly permissions: ["arbeitsauftraege.eigene", "arbeitsauftraege.adhoc"];
    readonly menue: true;
    readonly mobil: 1.5;
}, {
    readonly key: "projekte.projekte";
    readonly modul: "projekte";
    readonly label: "Projekte";
    readonly ziel: {
        readonly route: "projekte";
    };
    readonly permissions: ["projekte.lesen"];
    readonly menue: true;
    readonly mobil: 4;
}, {
    readonly key: "projekte.einsatzplanung";
    readonly modul: "projekte";
    readonly label: "Einsatzplanung";
    readonly short: "Planung";
    readonly ziel: {
        readonly route: "einsaetze";
    };
    readonly permissions: ["einsaetze.lesen"];
    readonly menue: true;
    readonly mobil: 3;
}, {
    readonly key: "projekte.kapazitaet";
    readonly modul: "projekte";
    readonly label: "Kapazität";
    readonly titel: "Kapazität: Personen und Betriebsmittel";
    readonly ziel: {
        readonly route: "kapazitaet";
    };
    readonly permissions: ["personal.lesen", "projekte.planen", "einsaetze.planen", "betriebsmittel.lesen", "shopfloor.lesen", "arbeitsauftraege.planen"];
    readonly menue: true;
}, {
    readonly key: "projekte.meine_einsaetze";
    readonly modul: "projekte";
    readonly label: "Meine Einsätze";
    readonly short: "Einsätze";
    readonly ziel: {
        readonly route: "meineEinsaetze";
    };
    readonly permissions: ["einsaetze.eigene"];
    readonly menue: true;
    readonly mobil: 1;
}, {
    readonly key: "projekte.reklamationen";
    readonly modul: "projekte";
    readonly label: "Reklamationen";
    readonly short: "Reklamation";
    readonly ziel: {
        readonly route: "reklamationen";
    };
    readonly permissions: ["reklamationen.lesen"];
    readonly menue: true;
    readonly mobil: 7;
}, {
    readonly key: "projekte.wartung";
    readonly modul: "projekte";
    readonly label: "Wartungsverträge";
    readonly short: "Wartung";
    readonly ziel: {
        readonly route: "wartung";
    };
    readonly permissions: ["wartung.lesen"];
    readonly menue: true;
}, {
    readonly key: "projekte.nachkalkulation";
    readonly modul: "projekte";
    readonly label: "Nachkalkulation";
    readonly titel: "Nachkalkulation Soll/Ist";
    readonly ziel: {
        readonly route: "nachkalkulation";
    };
    readonly permissions: ["nachkalkulation.lesen"];
    readonly menue: true;
}, {
    readonly key: "projekte.offline";
    readonly modul: "projekte";
    readonly label: "Offline-Erfassung in der Montage";
}, {
    readonly key: "finanzen.rechnungen";
    readonly modul: "finanzen";
    readonly label: "Rechnungen";
    readonly ziel: {
        readonly route: "belege";
        readonly query: {
            readonly typ: "rechnung";
        };
    };
    readonly permissions: ["belege.lesen"];
    readonly menue: true;
    readonly mobil: 4.5;
}, {
    readonly key: "finanzen.eingangsrechnungen";
    readonly modul: "finanzen";
    readonly label: "Eingangsrechnungen";
    readonly short: "Eingang";
    readonly ziel: {
        readonly route: "eingangsrechnungen";
    };
    readonly permissions: ["eingangsrechnungen.pruefen", "eingangsrechnungen.freigeben", "eingangsrechnungen.freigeben_unbegrenzt", "gobd.export"];
    readonly menue: true;
}, {
    readonly key: "finanzen.freigaberegeln";
    readonly modul: "finanzen";
    readonly label: "Rechnungsprüfung und Freigabe";
    readonly titel: "Rechnungsprüfung und Freigabe: Eingangsrechnungen und Dreiwegeabgleich";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 66;
}, {
    readonly key: "finanzen.mahnwesen";
    readonly modul: "finanzen";
    readonly label: "Mahnwesen";
    readonly titel: "Mahnwesen: Vorschlag, Freigabe und Versand";
    readonly ziel: {
        readonly route: "mahnwesen";
    };
    readonly permissions: ["mahnwesen.lesen"];
    readonly menue: true;
}, {
    readonly key: "finanzen.zahlungsfreigaben";
    readonly modul: "finanzen";
    readonly label: "Zahlungsfreigaben";
    readonly titel: "Zahlungsfreigaben: Vier-Augen-Prinzip je Zahlungsart und Bankdatenbestätigung";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["zahlungsrichtlinien.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 66.4;
}, {
    readonly key: "finanzen.mahnstufen";
    readonly modul: "finanzen";
    readonly label: "Mahnwesen";
    readonly titel: "Mahnstufen, Gebühren und Verzugszinsen";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["mahnwesen.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 66.5;
}, {
    readonly key: "finanzen.buchhaltung";
    readonly modul: "finanzen";
    readonly label: "Buchhaltung & Exporte";
    readonly short: "Buchhaltung";
    readonly titel: "Buchhaltung & Exporte";
    readonly ziel: {
        readonly route: "buchhaltung";
    };
    readonly permissions: ["buchhaltung.export_ausfuehren", "buchhaltung.protokoll_einsehen", "sepa.freigeben"];
    readonly menue: true;
}, {
    readonly key: "finanzen.betriebspruefung";
    readonly modul: "finanzen";
    readonly label: "Betriebsprüfung (GoBD)";
    readonly short: "GoBD";
    readonly ziel: {
        readonly route: "buchhaltung";
        readonly query: {
            readonly tab: "exporte";
        };
    };
    readonly permissions: ["gobd.export"];
}, {
    readonly key: "finanzen.zahlungseingaenge";
    readonly modul: "finanzen";
    readonly label: "Zahlungseingänge";
    readonly titel: "Zahlungseingänge & Bankabgleich";
    readonly short: "Zahlungen";
    readonly ziel: {
        readonly route: "zahlungseingaenge";
    };
    readonly permissions: ["bank.abgleich", "buchhaltung.export_ausfuehren", "buchhaltung.protokoll_einsehen"];
    readonly menue: true;
}, {
    readonly key: "personal.mein_bereich";
    readonly modul: "personal";
    readonly label: "Mein Personalbereich";
    readonly short: "Ich";
    readonly ziel: {
        readonly route: "meinBereich";
    };
    readonly permissions: ["personal.eigene"];
    readonly menue: true;
    readonly mobil: 12;
}, {
    readonly key: "personal.arbeitszeit";
    readonly modul: "personal";
    readonly label: "Meine Arbeitszeit";
    readonly short: "Zeit";
    readonly ziel: {
        readonly route: "arbeitszeit";
    };
    readonly permissions: ["zeiten.eigene"];
    readonly exakt: true;
    readonly menue: true;
    readonly mobil: 2;
}, {
    readonly key: "personal.arbeitszeiten";
    readonly modul: "personal";
    readonly label: "Arbeitszeiten";
    readonly short: "Zeiten";
    readonly ziel: {
        readonly route: "arbeitszeiten";
    };
    readonly permissions: ["zeiten.verwalten"];
    readonly menue: true;
}, {
    readonly key: "personal.mitarbeiter";
    readonly modul: "personal";
    readonly label: "Mitarbeitende";
    readonly ziel: {
        readonly route: "personal";
    };
    readonly permissions: ["personal.lesen"];
    readonly menue: true;
}, {
    readonly key: "personal.abwesenheiten";
    readonly modul: "personal";
    readonly label: "Abwesenheiten";
    readonly ziel: {
        readonly route: "abwesenheiten";
    };
    readonly permissions: ["personal.lesen", "abwesenheiten.genehmigen", "projekte.planen", "einsaetze.planen"];
    readonly menue: true;
    readonly mobil: 6.5;
}, {
    readonly key: "personal.auslastung";
    readonly modul: "personal";
    readonly label: "Auslastung Personen";
    readonly titel: "Kapazität: Personen";
    readonly ziel: {
        readonly route: "kapazitaet";
        readonly query: {
            readonly ansicht: "personen";
        };
    };
    readonly permissions: ["personal.lesen", "projekte.planen", "einsaetze.planen"];
    readonly unter: "projekte.kapazitaet";
}, {
    readonly key: "personal.qualifikationen";
    readonly modul: "personal";
    readonly label: "Qualifikationen";
    readonly titel: "Qualifikationen und Skills";
    readonly short: "Qualifikation";
    readonly ziel: {
        readonly route: "qualifikationen";
    };
    readonly permissions: ["personal.lesen", "personal.verwalten", "projekte.planen"];
    readonly menue: true;
}, {
    readonly key: "personal.kataloge";
    readonly modul: "personal";
    readonly label: "Kataloge";
    readonly titel: "Qualifikationen, Skills und Kompetenzen";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten", "personal.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 68.5;
}, {
    readonly key: "personal.entwicklung";
    readonly modul: "personal";
    readonly label: "Personalentwicklung";
    readonly short: "Entwicklung";
    readonly ziel: {
        readonly route: "entwicklung";
    };
    readonly permissions: ["personalentwicklung.verwalten"];
    readonly menue: true;
}, {
    readonly key: "personal.lohndaten";
    readonly modul: "personal";
    readonly label: "Lohndaten";
    readonly titel: "Lohndaten für das Steuerbüro";
    readonly short: "Lohn";
    readonly ziel: {
        readonly route: "lohndaten";
    };
    readonly permissions: ["lohn.export"];
    readonly menue: true;
}, {
    readonly key: "auswertungen.dashboards";
    readonly modul: "auswertungen";
    readonly label: "Dashboards";
    readonly ziel: {
        readonly route: "auswertungen";
    };
    readonly permissions: ["auswertungen.lesen"];
    readonly menue: true;
}, {
    readonly key: "auswertungen.berichte";
    readonly modul: "auswertungen";
    readonly label: "Berichte";
    readonly titel: "Berichte und Baukasten";
    readonly ziel: {
        readonly route: "auswertungBerichte";
    };
    readonly permissions: ["auswertungen.lesen"];
    readonly menue: true;
}, {
    readonly key: "wissen.uebersicht";
    readonly modul: "wissen";
    readonly label: "Übersicht und Suche";
    readonly titel: "Wissen & Hilfe";
    readonly short: "Wissen";
    readonly ziel: {
        readonly route: "wissen";
    };
    readonly exakt: true;
    readonly menue: true;
    readonly mobil: 13;
}, {
    readonly key: "wissen.hilfe";
    readonly modul: "wissen";
    readonly label: "App-Hilfe";
    readonly short: "Hilfe";
    readonly ziel: {
        readonly route: "hilfe";
    };
    readonly menue: true;
}, {
    readonly key: "wissen.firmenwissen";
    readonly modul: "wissen";
    readonly label: "Firmenwissen";
    readonly ziel: {
        readonly route: "firmenwissen";
    };
    readonly permissions: ["wissen.lesen"];
    readonly menue: true;
}, {
    readonly key: "wissen.fragen";
    readonly modul: "wissen";
    readonly label: "Fragen und Antworten";
    readonly short: "Fragen";
    readonly ziel: {
        readonly route: "wissenFragen";
    };
    readonly permissions: ["wissen.lesen"];
    readonly menue: true;
}, {
    readonly key: "dokumente.dms";
    readonly modul: "dokumente";
    readonly label: "Dokumente";
    readonly ziel: {
        readonly route: "dms";
    };
    readonly permissions: ["dms.lesen"];
    readonly menue: true;
    readonly mobil: 11;
}, {
    readonly key: "dokumente.typen";
    readonly modul: "dokumente";
    readonly label: "Dokumenttypen";
    readonly titel: "Dokumenttypen und Aufbewahrung";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["dms.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 71;
}, {
    readonly key: "verbesserungen.stories";
    readonly modul: "verbesserungen";
    readonly label: "Verbesserungen";
    readonly ziel: {
        readonly route: "verbesserungen";
    };
    readonly menue: true;
    readonly menueBereich: "wissen";
}, {
    readonly key: "administration.systemuebersicht";
    readonly modul: "administration";
    readonly label: "Systemübersicht";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["system.audit"];
    readonly admin: "System";
    readonly rang: 0;
}, {
    readonly key: "administration.benutzer";
    readonly modul: "administration";
    readonly label: "Benutzer";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["benutzer.verwalten"];
    readonly admin: "Zugriff";
    readonly rang: 10;
}, {
    readonly key: "administration.rollen";
    readonly modul: "administration";
    readonly label: "Rollen und Rechte";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["benutzer.verwalten"];
    readonly admin: "Zugriff";
    readonly rang: 11;
}, {
    readonly key: "administration.sicherheit";
    readonly modul: "administration";
    readonly label: "Sicherheit";
    readonly titel: "Sicherheit: Anmeldung mit Zwei-Faktor und Passkeys";
    readonly reiterLabel: "Anmeldung";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["sicherheit.verwalten"];
    readonly admin: "Zugriff";
    readonly rang: 12;
}, {
    readonly key: "administration.virenpruefung";
    readonly modul: "administration";
    readonly label: "Virenprüfung";
    readonly titel: "Virenprüfung der hochgeladenen Dateien";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["betrieb.metriken"];
    readonly admin: "Zugriff";
    readonly rang: 12.5;
    readonly reiterVon: "administration.sicherheit";
}, {
    readonly key: "administration.firma";
    readonly modul: "administration";
    readonly label: "Firma und Logo";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten"];
    readonly admin: "Unternehmen";
    readonly rang: 20;
}, {
    readonly key: "administration.belegtexte";
    readonly modul: "vertrieb";
    readonly label: "Belegtexte";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 52;
}, {
    readonly key: "administration.email";
    readonly modul: "administration";
    readonly label: "E-Mail und Microsoft 365";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten"];
    readonly admin: "Integration";
    readonly rang: 30;
}, {
    readonly key: "administration.postfach";
    readonly modul: "administration";
    readonly label: "E-Mail-Postfach";
    readonly titel: "E-Mail-Postfach: Mail-Protokoll und gemerkte Absender";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["mail.postfach"];
    readonly admin: "Integration";
    readonly rang: 30.5;
}, {
    readonly key: "administration.buchhaltung";
    readonly modul: "finanzen";
    readonly label: "Buchhaltung und DATEV";
    readonly titel: "Buchhaltung und DATEV: Schnittstellen und Kontenzuordnung";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["buchhaltung.schnittstellen_verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 66.6;
}, {
    readonly key: "administration.peppol";
    readonly modul: "finanzen";
    readonly label: "E-Rechnung und Peppol";
    readonly titel: "E-Rechnung: Versand über einen Peppol-Access-Point";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["buchhaltung.schnittstellen_verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 66.8;
}, {
    readonly key: "administration.kundenportal";
    readonly modul: "vertrieb";
    readonly label: "Kundenportal";
    readonly titel: "Kundenportal: Funktionen, Branding und Datenschutz";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["portal.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 51.7;
}, {
    readonly key: "administration.betrieb";
    readonly modul: "administration";
    readonly label: "Betrieb und Überwachung";
    readonly titel: "Betrieb: Zustand, Kennzahlen, externe Sicherung, Schwachstellenmeldungen";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["betrieb.metriken"];
    readonly admin: "System";
    readonly rang: 38;
}, {
    readonly key: "administration.benachrichtigungen";
    readonly modul: "administration";
    readonly label: "Benachrichtigungen";
    readonly titel: "Benachrichtigungen: Kategorien und Kanäle";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten"];
    readonly admin: "System";
    readonly rang: 39;
}, {
    readonly key: "administration.sicherung";
    readonly modul: "administration";
    readonly label: "Datensicherung";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["system.backup"];
    readonly admin: "System";
    readonly rang: 40;
}, {
    readonly key: "administration.protokoll";
    readonly modul: "administration";
    readonly label: "Protokoll und Integrität";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["system.audit"];
    readonly admin: "System";
    readonly rang: 41;
}, {
    readonly key: "administration.testdaten";
    readonly modul: "administration";
    readonly label: "Demodaten";
    readonly titel: "Demodaten einspielen und löschen";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["system.testdaten"];
    readonly admin: "System";
    readonly rang: 43;
}, {
    readonly key: "administration.import";
    readonly modul: "administration";
    readonly label: "Datenübernahme";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["import.ausfuehren", "ki.import", "dms.verwalten", "betriebsmittel.schreiben"];
    readonly admin: "System";
    readonly rang: 44;
}, {
    readonly key: "finanzen.zahlungsverkehr";
    readonly modul: "finanzen";
    readonly label: "Zahlungsverkehr";
    readonly titel: "Zahlungsverkehr: SEPA-Gläubiger-ID, Auftraggeberkonto und Vorlauf";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["buchhaltung.schnittstellen_verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 66.2;
}, {
    readonly key: "administration.bank";
    readonly modul: "finanzen";
    readonly label: "Bankanbindung";
    readonly titel: "Bankanbindung über einen Kontoinformationsdienst";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["bank.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 66.7;
}, {
    readonly key: "administration.api_zugaenge";
    readonly modul: "administration";
    readonly label: "API-Zugänge";
    readonly titel: "API-Zugänge: Schlüssel für Fremdsysteme, Rollen, Sperre und Protokoll";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["api.verwalten"];
    readonly admin: "Integration";
    readonly rang: 33.5;
}, {
    readonly key: "administration.ki";
    readonly modul: "administration";
    readonly label: "KI";
    readonly titel: "KI: Notaus, Anbieter, Zugriff über MCP und Protokolle";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["ki.verwalten"];
    readonly admin: "Integration";
    readonly rang: 34;
}, {
    readonly key: "administration.standort_gateways";
    readonly modul: "administration";
    readonly label: "Standort-Gateways";
    readonly titel: "Standort-Gateways: Geräte, Aufträge und Druckvorgaben";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["geraete.lesen", "druckvorgaben.verwalten"];
    readonly admin: "Integration";
    readonly rang: 35;
}, {
    readonly key: "administration.mcp";
    readonly modul: "administration";
    readonly label: "KI-Zugriff (MCP)";
    readonly titel: "KI-Zugriff über MCP: Umfang, KI-Programme und Freigaben";
    readonly ziel: {
        query?: {
            reiter: string;
        } | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["ki.verwalten"];
}, {
    readonly key: "administration.ki_assistent";
    readonly modul: "administration";
    readonly label: "KI-Assistent";
    readonly titel: "KI-Assistent: Einschalten, Modell, Kontingente, Werkzeugbereiche, Bestätigungen und Nutzung";
    readonly ziel: {
        query?: {
            reiter: string;
        } | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["ki.verwalten"];
}, {
    readonly key: "administration.ki_import";
    readonly modul: "administration";
    readonly label: "KI-Datenübernahme";
    readonly titel: "KI-gestützte Datenübernahme";
    readonly ziel: {
        readonly route: "kiImport";
    };
    readonly permissions: ["ki.import"];
}, {
    readonly key: "allgemein.ki_freigabe";
    readonly modul: "allgemein";
    readonly label: "KI-Programm freigeben";
    readonly ziel: {
        readonly route: "kiFreigabe";
    };
    readonly permissions: ["ki.nutzen"];
}, {
    readonly key: "administration.module";
    readonly modul: "administration";
    readonly label: "Module und Funktionen";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten"];
    readonly admin: "Module";
    readonly rang: 50;
}, {
    readonly key: "vertrieb.einstellungen";
    readonly modul: "vertrieb";
    readonly label: "Einstellungen";
    readonly titel: "Fachbereich Vertrieb & CRM";
    readonly adminLabel: "Vertrieb & CRM";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 51;
}, {
    readonly key: "einkauf.einstellungen";
    readonly modul: "einkauf";
    readonly label: "Einstellungen";
    readonly titel: "Fachbereich Einkauf";
    readonly adminLabel: "Einkauf";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 55;
}, {
    readonly key: "material.einstellungen";
    readonly modul: "material";
    readonly label: "Einstellungen";
    readonly titel: "Fachbereich Lager & Material";
    readonly adminLabel: "Lager & Material";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 57;
}, {
    readonly key: "produktion.einstellungen";
    readonly modul: "produktion";
    readonly label: "Einstellungen";
    readonly titel: "Fachbereich Produktion";
    readonly adminLabel: "Produktion";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 60;
}, {
    readonly key: "projekte.einstellungen";
    readonly modul: "projekte";
    readonly label: "Einstellungen";
    readonly titel: "Fachbereich Projekte & Montage";
    readonly adminLabel: "Projekte & Montage";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 63;
}, {
    readonly key: "finanzen.einstellungen";
    readonly modul: "finanzen";
    readonly label: "Einstellungen";
    readonly titel: "Fachbereich Finanzen & Buchhaltung";
    readonly adminLabel: "Finanzen";
    readonly reiterLabel: "Allgemein";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 65;
}, {
    readonly key: "personal.einstellungen";
    readonly modul: "personal";
    readonly label: "Einstellungen";
    readonly titel: "Fachbereich Personal";
    readonly adminLabel: "Personal";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten", "personal.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 68;
}, {
    readonly key: "auswertungen.einstellungen";
    readonly modul: "auswertungen";
    readonly label: "Einstellungen";
    readonly titel: "Fachbereich Auswertungen";
    readonly adminLabel: "Auswertungen";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten", "auswertungen.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 69;
}, {
    readonly key: "dokumente.einstellungen";
    readonly modul: "dokumente";
    readonly label: "Einstellungen";
    readonly titel: "Fachbereich Dokumente (DMS)";
    readonly adminLabel: "Dokumente";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 70;
}, {
    readonly key: "wissen.einstellungen";
    readonly modul: "wissen";
    readonly label: "Einstellungen";
    readonly titel: "Fachbereich Wissen & Hilfe";
    readonly adminLabel: "Wissen & Hilfe";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["wissen.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 72;
}, {
    readonly key: "verbesserungen.einstellungen";
    readonly modul: "verbesserungen";
    readonly label: "Einstellungen";
    readonly titel: "Fachbereich Verbesserungen";
    readonly adminLabel: "Verbesserungen";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten", "stories.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 73;
}, {
    readonly key: "betriebsmittel.uebersicht";
    readonly modul: "betriebsmittel";
    readonly label: "Betriebsmittel";
    readonly titel: "Betriebsmittel: Fahrzeuge, Geräte, Maschinen und Werkzeuge";
    readonly short: "Betriebsmittel";
    readonly ziel: {
        readonly route: "betriebsmittel";
    };
    readonly permissions: ["betriebsmittel.lesen", "shopfloor.lesen"];
    readonly menue: true;
}, {
    readonly key: "produktion.maschinen";
    readonly modul: "betriebsmittel";
    readonly label: "Maschinen";
    readonly titel: "Maschinen und DNC";
    readonly short: "Maschinen";
    readonly ziel: {
        readonly route: "betriebsmittel";
        readonly query: {
            readonly art: "maschine";
        };
    };
    readonly permissions: ["betriebsmittel.lesen", "shopfloor.lesen"];
}, {
    readonly key: "betriebsmittel.pruefungen";
    readonly modul: "betriebsmittel";
    readonly label: "Prüftermine";
    readonly titel: "Prüftermine: HU, UVV, SP, DGUV V3 und Wartung";
    readonly ziel: {
        readonly route: "betriebsmittelPruefungen";
    };
    readonly permissions: ["betriebsmittel.lesen"];
    readonly menue: true;
}, {
    readonly key: "betriebsmittel.einstellungen";
    readonly modul: "betriebsmittel";
    readonly label: "Einstellungen";
    readonly titel: "Fachbereich Betriebsmittel";
    readonly adminLabel: "Betriebsmittel";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["betriebsmittel.verwalten", "einstellungen.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 64;
}, {
    readonly key: "betriebsmittel.ausleihe";
    readonly modul: "betriebsmittel";
    readonly label: "Ausleihe";
    readonly titel: "Ausleihe mit Leihschein";
    readonly short: "Ausleihe";
    readonly ziel: {
        readonly route: "betriebsmittelAusleihe";
    };
    readonly permissions: ["betriebsmittel.lesen", "betriebsmittel.ausleihen"];
    readonly menue: true;
}, {
    readonly key: "betriebsmittel.auslastung";
    readonly modul: "betriebsmittel";
    readonly label: "Auslastung Betriebsmittel";
    readonly titel: "Kapazität: Betriebsmittel";
    readonly short: "Auslastung";
    readonly ziel: {
        readonly route: "kapazitaet";
        readonly query: {
            readonly ansicht: "betriebsmittel";
        };
    };
    readonly permissions: ["betriebsmittel.lesen", "shopfloor.lesen", "arbeitsauftraege.planen", "personal.lesen", "projekte.planen", "einsaetze.planen"];
    readonly unter: "projekte.kapazitaet";
}, {
    readonly key: "betriebsmittel.teams";
    readonly modul: "betriebsmittel";
    readonly label: "Teams";
    readonly titel: "Teams der Einsatzplanung";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einsaetze.planen"];
    readonly admin: "Fachbereiche";
    readonly rang: 64.5;
}, {
    readonly key: "allgemein.scratchpad";
    readonly modul: "allgemein";
    readonly label: "Scratchpad";
    readonly titel: "Scratchpad: persönliche Notizen";
}, {
    readonly key: "projekte.taetigkeiten";
    readonly modul: "projekte";
    readonly label: "Tätigkeiten";
    readonly titel: "Tätigkeitskatalog der Projektzeiterfassung";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 63.5;
}, {
    readonly key: "projekte.offline_einstellungen";
    readonly modul: "projekte";
    readonly label: "Offline-Erfassung";
    readonly titel: "Offline-Erfassung in der Montage: Einstellungen";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 63.6;
}, {
    readonly key: "administration.vvt";
    readonly modul: "administration";
    readonly label: "Verarbeitungsverzeichnis";
    readonly titel: "Verzeichnis von Verarbeitungstätigkeiten";
    readonly ziel: {
        query?: {
            reiter: string;
        } | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["datenschutz.verwalten"];
}, {
    readonly key: "administration.versionen";
    readonly modul: "administration";
    readonly label: "System und Versionen";
    readonly titel: "System und Versionen: Core, Module, Lizenz, Management-Server";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["betrieb.metriken"];
    readonly admin: "System";
    readonly rang: 37;
}, {
    readonly key: "administration.wartung";
    readonly modul: "administration";
    readonly label: "Wartung";
    readonly titel: "Wartung: Wartungsbanner, Wartungsmodus und Verlauf";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["system.wartung"];
    readonly admin: "System";
    readonly rang: 37.5;
}, {
    readonly key: "material.inventur_einstellungen";
    readonly modul: "material";
    readonly label: "Inventur";
    readonly titel: "Einstellungen der Inventur";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 57.2;
}, {
    readonly key: "material.lagerplaetze";
    readonly modul: "material";
    readonly label: "Lagerplätze";
    readonly titel: "Lagerplätze: Stammliste, Sperrlager und Fahrzeuge";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 57.25;
}, {
    readonly key: "material.etikettenvorlagen";
    readonly modul: "material";
    readonly label: "Etikettenvorlagen";
    readonly titel: "Etikettenvorlagen: Maße, Code-Art und Bogen";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 57.3;
}, {
    readonly key: "einkauf.katalogabruf";
    readonly modul: "einkauf";
    readonly label: "Kataloge und Preisimport";
    readonly titel: "Kataloge und Preisimport: erlaubte Hosts und Dateigröße für den Katalogabruf";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 55.5;
}, {
    readonly key: "projekte.wartung_einstellungen";
    readonly modul: "projekte";
    readonly label: "Wartung";
    readonly titel: "Wartungsverträge: Einstellungen";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 63.7;
}, {
    readonly key: "administration.auswahllisten";
    readonly modul: "administration";
    readonly label: "Auswahllisten";
    readonly titel: "Auswahllisten: Texte, Reihenfolge und eigene Einträge";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 62.5;
}, {
    readonly key: "projekte.stundensaetze";
    readonly modul: "projekte";
    readonly label: "Kalkulation und Sätze";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["einstellungen.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 63.8;
}, {
    readonly key: "betriebsmittel.leihschein";
    readonly modul: "betriebsmittel";
    readonly label: "Leihschein";
    readonly titel: "Leihschein: Bedingungen und Löschfrist";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["betriebsmittel.verwalten", "einstellungen.verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 64.2;
}, {
    readonly key: "personal.lohnarten";
    readonly modul: "personal";
    readonly label: "Lohnarten";
    readonly titel: "Lohnarten und Format des Lohnexports";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["personal.verwalten", "buchhaltung.schnittstellen_verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 68.2;
}, {
    readonly key: "administration.datenschutz";
    readonly modul: "administration";
    readonly label: "Datenschutz und Aufbewahrung";
    readonly titel: "Datenschutz und Aufbewahrung: Löschfristen, Fristenübersicht und Verarbeitungsverzeichnis";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["datenschutz.verwalten"];
    readonly admin: "Unternehmen";
    readonly rang: 20.5;
}, {
    readonly key: "vertrieb.rabattgruppen";
    readonly modul: "vertrieb";
    readonly label: "Rabattgruppen";
    readonly titel: "Rabattgruppen-Katalog";
    readonly ziel: {
        query?: Record<string, string> | undefined;
        route: "admin";
        params: {
            bereich: string;
        };
    };
    readonly permissions: ["preise.kundenpreise_verwalten"];
    readonly admin: "Fachbereiche";
    readonly rang: 51.5;
}, {
    readonly key: "vertrieb.posteingang";
    readonly modul: "vertrieb";
    readonly label: "Posteingang";
    readonly titel: "Posteingang: nicht zugeordnete E-Mails";
    readonly ziel: {
        readonly route: "kommunikation";
        readonly query: {
            readonly reiter: "posteingang";
        };
    };
    readonly permissions: ["mail.postfach"];
}, {
    readonly key: "vertrieb.wiedervorlagen";
    readonly modul: "vertrieb";
    readonly label: "Wiedervorlagen";
    readonly titel: "Wiedervorlagen";
    readonly ziel: {
        readonly route: "kommunikation";
        readonly query: {
            readonly reiter: "wiedervorlagen";
        };
    };
    readonly permissions: ["kommunikation.lesen"];
}];
export type FunktionKey = (typeof FUNKTIONEN)[number]['key'];
/** Einstiegspunkt „Administration“ im Menü; sichtbar, sobald ein Admin-Bereich erlaubt ist */
export declare const ADMIN_EINSTIEG: {
    readonly key: "administration.einstieg";
    readonly modul: "administration";
    readonly label: "Administration";
    readonly short: "Admin";
    readonly ziel: {
        readonly route: "admin";
    };
    readonly permissions: Permission[];
    readonly menue: true;
};
export type AnyFunktionKey = FunktionKey | (typeof ADMIN_EINSTIEG)['key'];
/**
 * Funktionsschlüssel eines Moduls (Modul-SDK). Zur Laufzeit eine Zeichenkette; die Registry prüft beim Start, dass er
 * aufgelöst werden kann. Core-Code verwendet weiter die Literaltypen (FunktionKey, AnyFunktionKey).
 */
export type ModulFunktionKey = string & {
    readonly __modulFunktion?: never;
};
export declare const ENTITAETEN: {
    readonly kunde: {
        readonly label: "Kunde";
        readonly route: "kunde";
        readonly funktion: "vertrieb.kunden";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly lieferant: {
        readonly label: "Lieferant";
        readonly route: "lieferant";
        readonly funktion: "einkauf.lieferanten";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly beleg: {
        readonly label: "Beleg";
        readonly route: "beleg";
        readonly funktion: "vertrieb.angebote";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly einsatz: {
        readonly label: "Einsatz";
        readonly route: "einsaetze";
        readonly funktion: "projekte.einsatzplanung";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly reklamation: {
        readonly label: "Reklamation";
        readonly route: "reklamation";
        readonly funktion: "projekte.reklamationen";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly dokument: {
        readonly label: "Dokument";
        readonly route: "dms";
        readonly funktion: "dokumente.dms";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly fertigungsauftrag: {
        readonly label: "Fertigungsauftrag";
        readonly route: "fertigungsauftrag";
        readonly funktion: "produktion.fertigung";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly story: {
        readonly label: "User Story";
        readonly route: "verbesserung";
        readonly funktion: "verbesserungen.stories";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly eingangsrechnung: {
        readonly label: "Eingangsrechnung";
        readonly route: "eingangsrechnung";
        readonly funktion: "finanzen.eingangsrechnungen";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly bestellung: {
        readonly label: "Bestellung";
        readonly route: "bestellung";
        readonly funktion: "einkauf.bestellungen";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly preisanfrage: {
        readonly label: "Preisanfrage";
        readonly route: "preisanfrage";
        readonly funktion: "einkauf.preisanfragen";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly projekt: {
        readonly label: "Projekt";
        readonly route: "projekt";
        readonly funktion: "projekte.projekte";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly mitarbeiter: {
        readonly label: "Mitarbeiterakte";
        readonly route: "mitarbeiter";
        readonly funktion: "personal.mitarbeiter";
        readonly pfad: (id: string, q?: Query) => string;
        readonly zugriff: ["personal.eigene"];
    };
    readonly abwesenheit: {
        readonly label: "Abwesenheit";
        readonly route: "abwesenheiten";
        readonly funktion: "personal.abwesenheiten";
        readonly pfad: (id: string, q?: Query) => string;
        readonly zugriff: ["personal.eigene"];
    };
    readonly feedbackrunde: {
        readonly label: "360-Grad-Feedback";
        readonly route: "feedback";
        readonly funktion: "personal.mein_bereich";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly bi_dashboard: {
        readonly label: "Dashboard";
        readonly route: "auswertungDashboard";
        readonly funktion: "auswertungen.dashboards";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly bi_bericht: {
        readonly label: "Bericht";
        readonly route: "auswertungBericht";
        readonly funktion: "auswertungen.berichte";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly wissensartikel: {
        readonly label: "Wissensartikel";
        readonly route: "wissenArtikel";
        readonly funktion: "wissen.firmenwissen";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly wissensfrage: {
        readonly label: "Frage";
        readonly route: "wissenFrage";
        readonly funktion: "wissen.fragen";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly hilfethema: {
        readonly label: "Hilfeartikel";
        readonly route: "hilfeThema";
        readonly funktion: "wissen.hilfe";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly mitarbeiter_zeiten: {
        readonly label: "Arbeitszeiten";
        readonly route: "arbeitszeiten";
        readonly funktion: "personal.arbeitszeiten";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly lieferschein: {
        readonly label: "Lieferschein";
        readonly route: "lieferschein";
        readonly funktion: "vertrieb.lieferscheine";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly mahnlauf: {
        readonly label: "Mahnlauf";
        readonly route: "mahnlauf";
        readonly funktion: "finanzen.mahnwesen";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly wartungsvertrag: {
        readonly label: "Wartungsvertrag";
        readonly route: "wartungsvertrag";
        readonly funktion: "projekte.wartung";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly inventur: {
        readonly label: "Inventur";
        readonly route: "inventurDetail";
        readonly funktion: "material.inventur";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly portalreaktion: {
        readonly label: "Reaktion im Kundenportal";
        readonly route: "kundenportal";
        readonly funktion: "vertrieb.kundenportal";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly zahlungseingang: {
        readonly label: "Zahlungseingang";
        readonly route: "zahlungseingaenge";
        readonly funktion: "finanzen.zahlungseingaenge";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly ki_lauf: {
        readonly label: "Lauf der KI-Datenübernahme";
        readonly route: "kiImportLauf";
        readonly funktion: "administration.ki_import";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly arbeitsauftrag: {
        readonly label: "Arbeitsauftrag";
        readonly route: "arbeitsauftrag";
        readonly funktion: "produktion.arbeitsauftraege";
        readonly pfad: (id: string, q?: Query) => string;
        readonly zugriff: ["arbeitsauftraege.eigene", "arbeitsauftraege.adhoc"];
    };
    /** Maschinen öffnen auch mit dem Altrecht shopfloor.lesen; der Server prüft die Art je Datensatz */
    readonly betriebsmittel: {
        readonly label: "Betriebsmittel";
        readonly route: "betriebsmittelDetail";
        readonly funktion: "betriebsmittel.uebersicht";
        readonly pfad: (id: string, q?: Query) => string;
        readonly zugriff: ["shopfloor.lesen"];
    };
    /** Leihschein; öffnet die Ausleihe mit dem Vorgang */
    readonly ausleihe: {
        readonly label: "Leihschein";
        readonly route: "betriebsmittelAusleihe";
        readonly funktion: "betriebsmittel.ausleihe";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly wareneingang_avis: {
        readonly label: "Lieferschein-Avis";
        readonly route: "wareneingangPruefen";
        readonly funktion: "material.wareneingang_pruefung";
        readonly pfad: (id: string, q?: Query) => string;
    };
    readonly artikel: {
        readonly label: "Artikel";
        readonly route: "artikelDetail";
        readonly funktion: "material.artikel";
        readonly pfad: (id: string, q?: Query) => string;
        readonly kundenansicht: true;
    };
    readonly wiedervorlage: {
        readonly label: "Wiedervorlage";
        readonly route: "kommunikation";
        readonly funktion: "vertrieb.wiedervorlagen";
        readonly pfad: (id: string, q?: Query) => string;
    };
};
export type EntitaetTyp = keyof typeof ENTITAETEN;
/** Seitenadresse einer Funktion; null, wenn die Funktion kein eigenes Ziel hat */
export declare function funktionsPfad(key: AnyFunktionKey | string): string;
export declare function fundort(key: AnyFunktionKey): string;
/** Dauerhafter Verweis auf einen Datensatz (für Benachrichtigungen, E-Mails, Exporte) */
export declare function permalink(typ: EntitaetTyp, id: string, query?: Query): string;
export interface Nummernkreis {
    praefix: string;
    /** Datenbanksequenz (fest, Teil des Datenbankschemas) */
    sequenz: string;
    /** Mindeststellen der laufenden Nummer; 0 = ohne Auffüllen */
    stellen: number;
        jahr: boolean;
    /** Trennzeichen zwischen Präfix, Jahr und laufender Nummer; Standard „-“ */
    trenner?: string;
    /**
     * Nur Nummernkreise der Module: Ziel des Demo-Kreises („DEMO-<Präfix>…“), d. h. Tabelle, Spalte und Startwert der
     * laufenden Nummer (wie DEMO_ZIEL in apps/server/src/lib/nummern.ts für die Kreise des Core)
     */
    demo?: {
        tabelle: string;
        spalte: string;
        start: number;
    };
}
/**
 * Alle Nummernkreise der Anwendung. Präfixe werden nur hier festgelegt; Erzeugung (Datenbank),
 * Erkennung in E-Mail-Betreffs und Prüfungen leiten sich daraus ab. Bestehende Nummern
 * behalten ihr Format; ein geänderter Präfix gilt nur für neue Nummern.
 */
export declare const NUMMERNKREISE: {
    readonly kunde: {
        readonly praefix: "K";
        readonly sequenz: "kunden_nr_seq";
        readonly stellen: 0;
        readonly jahr: false;
        readonly trenner: "";
    };
    readonly lieferant: {
        readonly praefix: "L";
        readonly sequenz: "lieferanten_nr_seq";
        readonly stellen: 0;
        readonly jahr: false;
        readonly trenner: "";
    };
    readonly angebot: {
        readonly praefix: "A";
        readonly sequenz: "angebot_nr_seq";
        readonly stellen: 5;
        readonly jahr: true;
    };
    readonly auftrag: {
        readonly praefix: "AB";
        readonly sequenz: "auftrag_nr_seq";
        readonly stellen: 5;
        readonly jahr: true;
    };
    readonly rechnung: {
        readonly praefix: "RE";
        readonly sequenz: "rechnung_nr_seq";
        readonly stellen: 5;
        readonly jahr: true;
    };
    /** Demorechnungen (bis Version 0.10 „TEST-RE“): eigener Kreis, der echte Rechnungskreis bleibt lückenlos */
    readonly testrechnung: {
        readonly praefix: "DEMO-RE";
        readonly sequenz: "test_rechnung_nr_seq";
        readonly stellen: 4;
        readonly jahr: true;
    };
    readonly reklamation: {
        readonly praefix: "RK";
        readonly sequenz: "reklamation_nr_seq";
        readonly stellen: 5;
        readonly jahr: true;
    };
    readonly fertigungsauftrag: {
        readonly praefix: "FA";
        readonly sequenz: "fa_nr_seq";
        readonly stellen: 5;
        readonly jahr: true;
    };
    readonly dokument: {
        readonly praefix: "DMS";
        readonly sequenz: "dms_nr_seq";
        readonly stellen: 6;
        readonly jahr: true;
    };
    readonly story: {
        readonly praefix: "US";
        readonly sequenz: "story_nr_seq";
        readonly stellen: 4;
        readonly jahr: false;
    };
    readonly bestellung: {
        readonly praefix: "B";
        readonly sequenz: "bestellung_nr_seq";
        readonly stellen: 5;
        readonly jahr: true;
    };
    readonly wareneingang: {
        readonly praefix: "WE";
        readonly sequenz: "wareneingang_nr_seq";
        readonly stellen: 5;
        readonly jahr: true;
    };
    readonly projekt: {
        readonly praefix: "P";
        readonly sequenz: "projekt_nr_seq";
        readonly stellen: 4;
        readonly jahr: true;
    };
    readonly personal: {
        readonly praefix: "PN";
        readonly sequenz: "personal_nr_seq";
        readonly stellen: 4;
        readonly jahr: false;
    };
    readonly lieferschein: {
        readonly praefix: "LS";
        readonly sequenz: "lieferschein_nr_seq";
        readonly stellen: 5;
        readonly jahr: true;
    };
    readonly mahnung: {
        readonly praefix: "MA";
        readonly sequenz: "mahnung_nr_seq";
        readonly stellen: 5;
        readonly jahr: true;
    };
    readonly wartungsvertrag: {
        readonly praefix: "WV";
        readonly sequenz: "wartungsvertrag_nr_seq";
        readonly stellen: 4;
        readonly jahr: true;
    };
    readonly inventur: {
        readonly praefix: "INV";
        readonly sequenz: "inventur_nr_seq";
        readonly stellen: 3;
        readonly jahr: true;
    };
    readonly arbeitsauftrag: {
        readonly praefix: "AA";
        readonly sequenz: "arbeitsauftrag_nr_seq";
        readonly stellen: 5;
        readonly jahr: true;
    };
    readonly betriebsmittel: {
        readonly praefix: "BM";
        readonly sequenz: "betriebsmittel_nr_seq";
        readonly stellen: 5;
        readonly jahr: false;
    };
    readonly leihschein: {
        readonly praefix: "LH";
        readonly sequenz: "leihschein_nr_seq";
        readonly stellen: 5;
        readonly jahr: true;
    };
    readonly preisanfrage: {
        readonly praefix: "PA";
        readonly sequenz: "preisanfrage_nr_seq";
        readonly stellen: 5;
        readonly jahr: true;
    };
};
export type NummernkreisKey = keyof typeof NUMMERNKREISE;
