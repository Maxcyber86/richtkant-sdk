import type { DB } from '../db/client.js';
import { FileStore } from './storage.js';
export interface NewDmsDocument {
    /** Inhalt im Speicher; alternativ `datei` (0.13.1: Upload als temporäre Datei, nicht im Speicher) */
    buffer?: Buffer;
        datei?: {
        pfad: string;
        groesse: number;
        sha256?: string;
        kopf?: Buffer;
    };
    dateiname: string;
    titel?: string;
    typ: string;
    dokumentDatum?: string;
    korrespondent?: string | null;
    kundeId?: string | null;
    lieferantId?: string | null;
    belegId?: string | null;
    reklamationId?: string | null;
    einsatzId?: string | null;
    /** 0.13.0: Bild bzw. Dokument eines Betriebsmittels */
    betriebsmittelId?: string | null;
    /** 0.13.0: Ablage an einem Projekt */
    projektId?: string | null;
        bestellungId?: string | null;
        artikelId?: string | null;
    tags?: string[];
    notiz?: string | null;
    quelle: 'upload' | 'beleg' | 'email' | 'import' | 'system';
    archivieren?: boolean;
    userId: string | null;
    isTest?: boolean;
    /** MIME-Typ vorgeben (z. B. selbst erzeugte PDF) */
    mime?: string;
    /** Feste Dokumentnummer (Import) */
    nummer?: string;
}
export declare function createDmsDocument(db: DB, store: FileStore, input: NewDmsDocument): Promise<{
    kundeId: string | null;
    notiz: string | null;
    id: string;
    artikelId: string | null;
    titel: string;
    typ: string;
    lieferantId: string | null;
    nummer: string;
    projektId: string | null;
    belegId: string | null;
    reklamationId: string | null;
    betriebsmittelId: string | null;
    dokumentDatum: string;
    einsatzId: string | null;
    bestellungId: string | null;
    korrespondent: string | null;
    tags: string[];
    mitarbeiterId: string | null;
    quelle: string;
    createdAt: Date;
    updatedAt: Date;
    isTest: boolean;
    geloeschtAm: Date | null;
    createdBy: string | null;
    erechnungPruefung: import("../db/schema.js").ErechnungPruefungKurz | null;
    mitarbeiterSichtbar: boolean;
    volltext: string | null;
    aktuelleVersion: number;
    archiviertAm: Date | null;
    aufbewahrungBis: string | null;
    erechnung: Record<string, unknown> | null;
}>;
