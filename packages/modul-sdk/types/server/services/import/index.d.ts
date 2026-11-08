import { type Permission } from '../../../core/permissions.js';
export interface ImportAkteur {
    id: string;
    benutzername: string;
    berechtigungen: readonly Permission[];
    rechte: {
        ek: boolean;
        vk: boolean;
        bmKosten?: boolean;
    };
    /** Erweiterung 12b: Aufruf aus dem Ablauf der KI-Datenübernahme (deren Importläufe sind sonst gesperrt) */
    kiIntern?: boolean;
}
