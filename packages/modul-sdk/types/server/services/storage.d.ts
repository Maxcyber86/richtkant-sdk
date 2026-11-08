import type { DbOrTx, DB } from '../db/client.js';
/**
 * Inhaltsadressierter, unveränderlicher Dateispeicher (WORM-Prinzip): Jede Datei wird unter
 * ihrem SHA-256-Hash abgelegt, schreibgeschützt gesetzt und nie überschrieben. Gleicher Inhalt
 * wird nur einmal gespeichert. Die Integrität ist jederzeit durch Neuberechnung prüfbar.
 */
export declare class FileStore {
    private readonly root;
    constructor(root: string);
    pathFor(sha256: string): string;
    static hash(buf: Buffer): string;
    put(db: DbOrTx, buf: Buffer, mime: string): Promise<string>;
        putDatei(db: DbOrTx, pfad: string, mime: string, bekannt?: {
        sha256?: string;
        groesse?: number;
    }): Promise<{
        sha256: string;
        groesse: number;
    }>;
    get(sha256: string): Promise<Buffer>;
    exists(sha256: string): Promise<boolean>;
    /** Prüft alle gespeicherten Dateien auf Vorhandensein und unveränderten Inhalt. */
    verify(db: DB): Promise<{
        geprueft: number;
        fehlend: string[];
        veraendert: string[];
        bytes: number;
    }>;
}
