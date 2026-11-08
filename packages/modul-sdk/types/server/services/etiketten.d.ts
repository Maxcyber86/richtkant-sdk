import { type EtikettArt } from '../../core/lager12.js';
/** Inhalt eines Etiketts, unabhängig vom Format */
export interface Etikett {
    art: EtikettArt;
    titel: string;
    zeilen: string[];
    /** Inhalt des Codes (QR: Permalink, Code 128: kurze Kennung) */
    qrInhalt: string;
    kennung: string;
    /** kleine Kennzeichnung oben rechts, z. B. „3/8“ */
    marke?: string | null;
    isTest: boolean;
}
