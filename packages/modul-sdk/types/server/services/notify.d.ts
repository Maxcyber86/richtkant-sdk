import { type NotificationType } from '../../core/modules.js';
import { type Permission } from '../../core/permissions.js';
import { type IcsMethode } from '../../core/ics.js';
import { type KalenderVormerkung } from './kalenderanhang.js';
import type { Ctx } from './context.js';
export interface NotificationInput {
    typ: NotificationType;
    titel: string;
    text?: string;
    /** Pfad innerhalb der Anwendung, z. B. /reklamationen/<id> */
    link?: string | null;
        kalender?: KalenderAnhang;
}
/** Termin-Anhang einer Benachrichtigung; nur Empfänger in `empfaenger` erhalten ihn (Konten ohne direkten M365-Kalender) */
export interface KalenderAnhang {
    methode: IcsMethode;
    empfaenger: ReadonlySet<string>;
    /**
     * Termindaten je Person (null = kein Anhang). Sie werden an der Benachrichtigung gespeichert (`notifications.kalender`)
     * und erst beim Versand zur iCalendar-Datei; so überstehen sie die Ruhezeit und einen Neustart.
     */
    daten: (userId: string) => KalenderVormerkung | null;
}
/**
 * Benachrichtigt Benutzer in der Anwendung und – je nach Kategorie, Einstellungen der Verwaltung und
 * persönlichem Profil – per E-Mail und Push-Mitteilung.
 *
 * Die auslösende Person (`exceptUserId`) wird grundsätzlich nicht benachrichtigt. Ist sie zugleich Empfänger und
 * gilt für sie „Auch über eigene Aktionen benachrichtigen“ (persönliches Profil vor Vorgabe der Verwaltung), erhält
 * sie die Benachrichtigung wie alle anderen. `selbstAusschlussFest` schließt sie unabhängig davon aus (z. B. bei
 * Vier-Augen-Freigaben, die sie selbst nicht erteilen darf).
 * E-Mail und Push laufen im Hintergrund und blockieren den Aufrufer nicht; Fehler werden protokolliert.
 * Demodaten-Personen erhalten ausschließlich die Benachrichtigung in der App.
 */
export declare function notify(ctx: Ctx, userIds: (string | null | undefined)[], n: NotificationInput, exceptUserId?: string | null, optionen?: {
    selbstAusschlussFest?: boolean;
}): Promise<number>;
/** Aktive Benutzer mit einer bestimmten Berechtigung (z. B. alle Einsatzplaner) */
export declare function usersWithPermission(ctx: Ctx, permission: Permission): Promise<string[]>;
