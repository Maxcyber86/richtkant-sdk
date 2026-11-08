import { type Permission } from '../../core/permissions.js';
import { type StartstandErgebnis } from './startstand';
import type { BenutzerEinstellungen, Me } from './types';
interface SessionContextValue {
    me: Me | null;
    loading: boolean;
    /** Sitzung konnte wegen fehlender Verbindung bzw. Serverfehler nicht geprüft werden (nicht: abgemeldet) */
    verbindungsfehler: string | null;
    can: (p: Permission) => boolean;
    /** Funktion eingeschaltet (Administration › Module); unbekannte Funktionen gelten als eingeschaltet */
    aktiv: (funktion: string) => boolean;
    /** Kundenansicht: keine Preise, nur kundengeeignete Bereiche */
    customerView: boolean;
    enterCustomerView: () => void;
    leaveCustomerView: () => void;
    refresh: () => Promise<unknown>;
    logout: () => Promise<void>;
    /** Persönliche Einstellungen (Darstellung, Favoriten) im Benutzerkonto speichern */
    saveSettings: (patch: BenutzerEinstellungen) => Promise<void>;
        ohneVerbindung: boolean;
    /** Start ohne Verbindung nicht möglich: Grund (kein bzw. verfallener Stand, abgeschaltet, PIN nicht festgelegt) */
    startHinweis: Exclude<StartstandErgebnis, {
        art: 'ok';
    }> | null;
    /** Start ohne Verbindung verlangt die PIN (Name der Person) */
    pinSperre: {
        anzeigename: string;
    } | null;
    pinEntsperren: (pin: string) => Promise<{
        ok: true;
    } | {
        ok: false;
        rest: number;
    }>;
    /** Betrieb verlangt eine PIN, auf diesem Gerät ist noch keine festgelegt */
    pinEinrichten: boolean;
    pinSetzen: (pin: string) => Promise<void>;
    pinSpaeter: () => void;
    /** Auf dem Gerät warten Vorgänge von Personen, die gerade nicht angemeldet sind (werden nicht übertragen) */
    wartendeAndere: {
        userId: string;
        anzeigename: string;
        benutzername: string;
        anzahl: number;
    }[];
}
export declare function useSession(): SessionContextValue;
