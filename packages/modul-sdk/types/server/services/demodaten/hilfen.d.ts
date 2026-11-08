import type { DB } from '../../db/client.js';
import type { Ctx } from '../context.js';
/** Kontext eines Demo-Moduls beim Einspielen */
export interface DemoKontext {
    ctx: Ctx;
    db: DB;
    /** Person, die das Einspielen ausgelöst hat (null in der Kommandozeile) */
    userId: string | null;
    /** Demo-Zugänge anmeldefähig anlegen */
    zugaenge: boolean;
    /** Hash des Demo-Kennworts (nur Stammdaten) */
    kennwortHash: string | null;
}
/** Feste Namen von Demodatensätzen, über die Module einander finden */
export declare const DEMO_NAMEN: {
    readonly kundeFirma: "DEMO-Musterbau GmbH";
    readonly kundePrivatNachname: "DEMO-Mustermann";
    readonly kundeBau13b: "DEMO-Hochbau Rhein-Main GmbH";
    readonly kundeBehoerde: "DEMO-Kreisverwaltung Musterkreis";
    readonly kundeEu: "DEMO-Innenausbau Alpen GmbH";
    readonly kundeDrittland: "DEMO-Construction Suisse SA";
        readonly kundeWohnbau: "DEMO-Wohnbau Taunus GmbH";
    readonly kundePrivat2Nachname: "DEMO-Beispiel";
    /** Hauptlieferant für Baustoffe und Material (Bestellungen, Eingangsrechnungen, Reklamation beim Lieferanten) */
    readonly lieferantHandel: "DEMO-Baustoffhandel Mustermann GmbH";
    /** Lieferant für Holz und Plattenwerkstoffe (Rahmenvertrag, Rechnungsprüfung) */
    readonly lieferantPlatten: "DEMO-Holz- und Plattenhandel Main GmbH";
    readonly lieferantMontage: "DEMO-Befestigungs- und Montagetechnik Main GmbH";
    /** Nachunternehmer für Oberflächen (Lackierung, Beschichtung) */
    readonly lieferantBeschichtung: "DEMO-Oberflächentechnik Untermain GmbH";
};
