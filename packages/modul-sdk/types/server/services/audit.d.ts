import type { FastifyRequest } from 'fastify';
import type { DB } from '../db/client.js';
export interface AuditEntry {
    aktion: string;
    entitaet?: string;
    entitaetId?: string;
    details?: Record<string, unknown>;
}
/**
 * Schreibt einen Eintrag ins revisionssichere Audit-Protokoll. Jeder Eintrag enthält den Hash
 * seines Vorgängers; nachträgliche Änderungen oder Löschungen sind dadurch erkennbar.
 * Fehler werden protokolliert, brechen den fachlichen Vorgang aber nicht ab.
 */
export declare function audit(db: DB, req: FastifyRequest | null, entry: AuditEntry, actor?: {
    id: string | null;
    benutzername: string;
}): Promise<void>;
