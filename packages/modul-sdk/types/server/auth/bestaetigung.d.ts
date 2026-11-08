import type { FastifyRequest } from 'fastify';
import { type BestaetigungZweck } from '../../core/sicherheit.js';
import type { DB } from '../db/client.js';
/**
 * Für die bestätigenden Stellen: Ist ein Bestätigungstoken angegeben, wird es eingelöst (wirft bei Ungültigkeit) und
 * true geliefert; ohne Token false (dann gilt die bisherige Prüfung mit Kennwort bzw. Code).
 */
export declare function mitPasskeyBestaetigt(db: DB, req: FastifyRequest | null, u: {
    id: string;
    sessionId: string;
}, zweck: BestaetigungZweck, token: string | undefined | null): Promise<boolean>;
