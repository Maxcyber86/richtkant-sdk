import { type Permission } from '../../core/permissions.js';
export interface SessionUser {
    id: string;
    benutzername: string;
    anzeigename: string;
    email: string | null;
    authProvider: string;
    mussPasswortAendern: boolean;
    rollen: string[];
    /** Anzeigenamen der Rollen in gleicher Reihenfolge (auch für selbst angelegte Rollen) */
    rollenNamen: string[];
    berechtigungen: Permission[];
    /** Ausschließlich rein lesende Rollen (Betriebsprüfung oder eigene Rollen mit Nur-Lesen-Kennzeichen): keine fachlichen Schreibaktionen */
    nurLesen: boolean;
    sessionId: string;
        faktor: string | null;
        zweiFaktorAktiv: boolean;
        zweiFaktorPflicht: boolean;
    /** 0.13.1: Sitzung der Wartungsfreigabe (Anmeldung während einer Wartung mit Recht system.wartung und zweitem Faktor) */
    wartungsfreigabe: boolean;
    /** 0.16.6 (WCAG 2.2.1): Ende der Sitzung ohne Bedienung bzw. spätestes Ende (Höchstdauer) */
    sitzungAblauf: Date;
    sitzungEnde: Date;
}
