import type { FastifyRequest } from 'fastify';
import type { DbOrTx } from '../db/client.js';
export interface AuditEntry {
    aktion: string;
    entitaet?: string;
    entitaetId?: string;
    details?: Record<string, unknown>;
}
/**
 * Schreibt einen Eintrag ins revisionssichere Audit-Protokoll. Jeder Eintrag enthält den Hash
 * seines Vorgängers; nachträgliche Änderungen oder Löschungen sind dadurch erkennbar.
 *
 * 0.16.8: Lesen des letzten Hashes und Schreiben laufen unter einer Transaktionssperre mit festem Schlüssel (über Prozesse
 * hinweg; Klasse `audit` in db/sperren.ts). Wird `audit` mit einer offenen Transaktion aufgerufen, gilt die Sperre bis zu deren
 * Ende: Ein gleichzeitiger Eintrag wartet, bis der Eintrag der Transaktion festgeschrieben (oder zurückgenommen) ist, und liest
 * erst dann den letzten Hash – zwei Einträge mit demselben Vorgänger entstehen nicht. Es gibt keine Warteschlange im Prozess
 * mehr: Sie würde einen weiteren Eintrag derselben Transaktion hinter einem wartenden fremden Eintrag festhalten (Verklemmung).
 * Innerhalb einer Transaktion ist daher stets diese Transaktion zu übergeben, nicht die Basis-Datenbank (Wächtertest
 * r30-audit-kette), und Einträge stehen möglichst am Ende der Transaktion (kurze Sperre).
 *
 * Fehler:
 * - ohne äußere Transaktion (eigene Transaktion): Fehler werden protokolliert und brechen den fachlichen Vorgang nicht ab
 *   (bisheriges, bewusstes Verhalten: die fachliche Änderung ist dann bereits festgeschrieben);
 * - in einer äußeren Transaktion: Fehler werden weitergereicht. Die Transaktion ist nach einem Fehler in PostgreSQL ohnehin
 *   abgebrochen; ein verschluckter Fehler endete in einem stillen Zurückrollen mit Erfolgsmeldung. Der Eintrag ist hier Teil
 *   der fachlichen Transaktion: lieber eine Fehlermeldung als ein stiller Datenverlust.
 */
export declare function audit(db: DbOrTx, req: FastifyRequest | null, entry: AuditEntry, actor?: {
    id: string | null;
    benutzername: string;
}): Promise<void>;
