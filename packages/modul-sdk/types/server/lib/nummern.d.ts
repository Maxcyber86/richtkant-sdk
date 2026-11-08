import { type SQL } from 'drizzle-orm';
import { type NummernkreisKey } from '../../core/navigation.js';
/** Nummernkreis eines Moduls (Schlüssel zur Laufzeit; die Registry prüft ihn beim Start) */
type ModulNummernkreisKey = string & {
    readonly __modulNummernkreis?: never;
};
/**
 * SQL-Ausdruck für die nächste Nummer eines Nummernkreises. Präfix, Stellen und Sequenz
 * stammen ausschließlich aus dem Anwendungsverzeichnis (NUMMERNKREISE).
 *
 * Mit `demo: true` (Demodatensatz) entsteht eine Nummer im Demo-Kreis „DEMO-<Präfix>…“ ohne Zugriff auf die Sequenz
 * des echten Kreises. Je Anweisung nur ein Datensatz (die laufende Nummer wird aus dem Bestand ermittelt; mehrere
 * Zeilen in einer Anweisung erhielten dieselbe Nummer und scheiterten an der Eindeutigkeit).
 */
export declare function nummerSql(kreis: NummernkreisKey | ModulNummernkreisKey, jahrDesVorgangs?: number, opt?: {
    demo?: boolean;
}): SQL;
