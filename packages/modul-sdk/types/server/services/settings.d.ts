import type { FastifyRequest } from 'fastify';
import type { DbOrTx } from '../db/client.js';
export declare function getSetting<T>(db: DbOrTx, key: string): Promise<T | null>;
/**
 * Wer eine Einstellung ändert: die Anfrage (Person und IP-Adresse), eine Benutzer-ID (Dienste ohne Anfrage; der Name wird
 * nachgeschlagen), eine ausdrückliche Person oder `null` (System: Start, Migration, Hintergrund).
 */
export type EinstellungAenderer = FastifyRequest | string | null | {
    id: string | null;
    benutzername: string;
};
export declare function putSetting(db: DbOrTx, key: string, value: unknown, wer: EinstellungAenderer): Promise<void>;
