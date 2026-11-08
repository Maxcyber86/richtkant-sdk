import type { FastifyBaseLogger } from 'fastify';
import type { DB } from '../db/client.js';
import type { FileStore } from './storage.js';
/** Gemeinsamer Kontext der Dienste (Datenbank, Konfiguration, Dateispeicher, Protokoll) */
export interface Ctx {
    db: DB;
    store: FileStore;
    log: FastifyBaseLogger;
}
