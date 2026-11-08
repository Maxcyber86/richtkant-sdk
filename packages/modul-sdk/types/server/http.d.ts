import type { FastifyRequest, preHandlerHookHandler } from 'fastify';
import type { Permission } from '../core/permissions.js';
import type { UnumkehrbarArt } from '../core/assistent.js';
import type { SessionUser } from './auth/session.js';
export declare class HttpError extends Error {
    readonly statusCode: number;
    readonly code: string;
    readonly payload?: Record<string, unknown> | undefined;
    constructor(statusCode: number, message: string, code?: string, payload?: Record<string, unknown> | undefined);
}
export declare const notFound: (what?: string) => HttpError;
export declare const conflict: (message: string) => HttpError;
export declare const badRequest: (message: string) => HttpError;
export declare function currentUser(req: FastifyRequest): SessionUser;
export declare function has(req: FastifyRequest, permission: Permission): boolean;
/** Preise sind sichtbar, wenn die Berechtigung vorliegt und keine Kundenansicht aktiv ist. */
export declare function priceVisibility(req: FastifyRequest): {
    ek: boolean;
    vk: boolean;
};
declare module 'fastify' {
    interface FastifyContextConfig {
        /**
         * Rechteprüfung im Handler (z. B. „eigene oder alle Einsätze“): nur für das Schnittstellenverzeichnis.
         * Die Prüfung selbst bleibt im Handler; die Angabe muss sie zutreffend beschreiben.
         */
        zugriffImHandler?: Zugriffsregel & {
            hinweis?: string;
        };
        /** Lesende Methode mit schreibender Wirkung (z. B. Weiterleitung, die eine Verbindung anlegt) */
        schreibend?: boolean;
        /**
         * 0.13.1: Buchung mit GoBD- bzw. Bestandswirkung (KI-Assistent: Bestätigung mit Kennwort; MCP: immer Entwurf).
         * Core-Routen stehen in UNUMKEHRBARE_ROUTEN (@gm/core); Module kennzeichnen eigene Routen hier.
         */
        unumkehrbar?: {
            art: UnumkehrbarArt;
            grund: string;
        };
    }
}
/**
 * Zugriffsregel eines Schutzes, für die automatisch erzeugte Schnittstellenübersicht
 * (App-Hilfe › Technik und Betrieb). Die Prüfung selbst bleibt in der Funktion.
 */
export interface Zugriffsregel {
        art: 'angemeldet' | 'alle' | 'eines' | 'portal';
    rechte: Permission[];
}
/**
 * Angemeldet. Rein lesende Rollen (z. B. Betriebsprüfung) dürfen über diesen Schutz nichts ändern:
 * Schreibende Aufrufe, die nur eine Anmeldung verlangen (User Stories, Kommentare, Rückmeldungen),
 * werden für sie abgelehnt. Eigene Einstellungen, Kennwort und Benachrichtigungen: `requireAuthEigene`.
 */
export declare const requireAuth: preHandlerHookHandler;
export declare function requirePermission(...permissions: Permission[]): preHandlerHookHandler;
/** Mindestens eine der Berechtigungen ist erforderlich */
export declare function requireAnyPermission(...permissions: Permission[]): preHandlerHookHandler;
export declare const paginationQuery: {
    limit: (v: unknown) => number;
    offset: (v: unknown) => number;
};
/** Escaping für ILIKE-Suchmuster */
export declare function likePattern(q: string): string;
