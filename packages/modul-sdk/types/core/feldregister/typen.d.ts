import type { ZodType } from 'zod';
/** Kennzeichen eines Feldes */
export type FeldKennzeichen = 
'loeschfrist'
/** Geheimnis (Kennwort, Schlüssel): Wert wird nie angezeigt, nie verglichen und nie zurückgesetzt */
 | 'geheimnis'
/** Vier-Augen-Prinzip bzw. Freigabe durch eine zweite Person */
 | 'vierAugen';
/** Einheit einer Frist bzw. Zahl (für Anzeige und Fristenübersicht) */
export type FeldEinheit = 'Sekunden' | 'Tage' | 'Wochen' | 'Monate' | 'Jahre' | 'Stunden' | 'Minuten' | 'Prozent' | 'Cent' | 'MB' | 'Stück';
/** Angaben zu einem Feld einer Einstellung */
export interface FeldAngaben {
    /**
     * Bezeichnung genau wie die Beschriftung des Bedienelements in der Administration. Der Sprung aus der Suche findet
     * das Feld über diese Beschriftung, wenn kein `anker` angegeben ist.
     */
    bezeichnung: string;
    /** Was die Einstellung bewirkt (ein kurzer Satz, für Suche, Übersichten und Dokumentation) */
    wirktAuf: string;
    /** Weitere Suchbegriffe (Synonyme, Fachbegriffe); Bezeichnung und Abschnitt werden ohnehin durchsucht */
    stichworte?: readonly string[];
    /** Überschrift des Abschnitts (Panel), in dem das Feld steht; Rückfall des Sprungs, wenn die Beschriftung fehlt */
    abschnitt?: string;
    /** Admin-Funktion, falls abweichend von der Einstellung (z. B. Belegtexte der Firmendaten) */
    bereich?: string;
    /** Reiter (`?reiter=`), falls abweichend von der Einstellung; `null` = kein Reiter */
    reiter?: string | null;
    /** DOM-Kennung des Bedienelements, falls die Beschriftung nicht eindeutig ist */
    anker?: string;
    kennzeichen?: readonly FeldKennzeichen[];
    einheit?: FeldEinheit;
    /**
     * Standardwert, nur wenn er sich nicht aus einem Core-Schema ableiten lässt (Schema außerhalb des Core oder ohne
     * `.default()`). Der Vertragstest vergleicht ihn mit dem Schema.
     */
    standard?: unknown;
    /** Kein Standard anzeigen bzw. zurücksetzen (z. B. wenn der Server ohne gespeicherten Wert selbst entscheidet) */
    ohneStandard?: true;
}
/** Eine Einstellung (Schlüssel der Tabelle `settings`) mit ihren Feldern */
export interface EinstellungsAngaben {
    /** Schlüssel der Tabelle `settings` */
    schluessel: string;
    /** Admin-Funktion (Funktionsschlüssel), in der die Einstellung bearbeitet wird */
    bereich: string;
    /** Reiter (`?reiter=`) innerhalb des Bereichs */
    reiter?: string;
    /** Überschrift des Abschnitts, falls für alle Felder gleich */
    abschnitt?: string;
    /** Einstellungsschema im Core (liefert die Standardwerte); fehlt bei Schemas der Server-Schicht */
    schema?: ZodType;
    /**
     * Felder: Schlüssel = Feld der obersten Ebene oder, bei zusammengesetzten Feldern, Pfad mit Punkt (`projekte.stundenProTag`).
     * Wird ein Pfad unterhalb eines Feldes registriert, müssen alle Unterfelder dieses Feldes registriert sein.
     */
    felder: Readonly<Record<string, FeldAngaben>>;
    /** Felder ohne eigenes Bedienelement (Version, interne Stände, Zustimmungen) mit Begründung */
    ausgenommen?: Readonly<Record<string, string>>;
}
/** Interner Schlüssel der Tabelle `settings` (Zustand, Zwischenstand, Merker), keine Einstellung */
export interface InternerSchluessel {
    schluessel: string;
    grund: string;
    /**
     * 0.16.14: interner Zustand (Stand eines Hintergrundlaufs, Merker, empfangene Daten), den der Server ohne Änderungsprotokoll über
     * `zustandSpeichern` schreibt; `putSetting` lehnt solche Schlüssel ab. Ohne Kennzeichen: Schreiben über `putSetting` mit Nachweis.
     */
    zustand?: true;
}
/** Feld des Registers mit aufgelösten Angaben */
export interface RegisterFeld extends Omit<FeldAngaben, 'reiter'> {
    /** Vollständiger Schlüssel `<einstellung>.<pfad>`, z. B. `ki.aufbewahrungTage` */
    schluessel: string;
    /** Schlüssel der Einstellung (`settings.key`) */
    einstellung: string;
    /** Pfad des Feldes in der Einstellung, z. B. `aufbewahrungTage` oder `projekte.stundenProTag` */
    pfad: string;
    bereich: string;
    reiter: string | null;
    /** true, wenn ein Standardwert bekannt ist (`standard` gilt dann, auch wenn er `null` ist) */
    hatStandard: boolean;
}
/**
 * 0.17.0 (Paket H, Modulvertrag 2.5.0): Beitrag eines Moduls zum Feldregister (Server-Erweiterungspunkt `feldregister`, optional).
 * `version` ist die Formatversion des Beitrags (heute 1, `MODUL_FELDREGISTER_VERSIONEN`); ein Core, der eine Version nicht kennt,
 * übergeht den Beitrag mit Hinweis. Je Einstellung gelten dieselben Angaben und Regeln wie für den Core (`EinstellungsAngaben`):
 * `schluessel` muss im Manifest des Moduls unter `einstellungen` stehen, `schema` ist Pflicht (Vollständigkeit und Standardwerte),
 * `bereich` ist eine Admin-Funktion des Moduls.
 */
export interface ModulFeldregisterBeitrag {
    version: 1;
    einstellungen: readonly EinstellungsAngaben[];
}
