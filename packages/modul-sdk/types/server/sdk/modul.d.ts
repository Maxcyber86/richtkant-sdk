import type { FastifyPluginAsync } from 'fastify';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import type { ErweiterungsSatz } from '../erweiterungen.js';
import type { FunktionKey } from '../../core/navigation.js';
import type { ModulManifest } from '../../core/modulsystem/vertrag.js';
import type { HilfeThema } from '../../core/hilfe/modell.js';
import type { Ctx } from '../services/context.js';
/** Wiederkehrende Hintergrundaufgabe eines Moduls (läuft nur, solange das Modul aktiv ist) */
export interface ModulHintergrundaufgabe {
    /** Eindeutiger Name innerhalb des Moduls (Protokoll, Sperre) */
    name: string;
    intervallMs: number;
    /** Funktion, deren Schaltzustand die Aufgabe steuert (optional) */
    funktion?: FunktionKey | string;
    run: (ctx: Ctx) => Promise<void>;
}
export type ServerErweiterungen = ErweiterungsSatz;
export type ServerErweiterungspunkt = keyof ErweiterungsSatz;
/** Server-Teil eines Moduls */
export interface ServerModul {
    manifest: ModulManifest;
        plugin: FastifyPluginAsync | FastifyPluginAsyncZod;
    /** Idempotente Startaufgabe (z. B. Stammdaten sichern) */
    beimStart?: (ctx: Ctx) => Promise<void>;
    /**
     * Vertrag 2.0.0: einmalig bei der Installation über Administration › Module (vor `beimStart`), z. B. Vorgabedaten
     * anlegen. `erstinstallation`: die Instanz hatte das Modul nie installiert; `archivId`: Daten wurden aus einem Archiv
     * wiederhergestellt (dann keine Vorgaben anlegen). Ein Fehler wird protokolliert und lässt die Installation bestehen.
     */
    beiInstallation?: (ctx: Ctx, anlass: {
        erstinstallation: boolean;
        archivId: string | null;
    }) => Promise<void>;
    hintergrund?: ModulHintergrundaufgabe[];
    /** MCP-Werkzeuge des Moduls (Vertrag folgt mit der MCP-Anbindung der Module) */
    mcp?: unknown[];
    erweiterungen?: ServerErweiterungen;
    /**
     * Hilfeartikel des Moduls (Inhalte aus dem Modul-Kern, z. B. `@rk-modul/<m>-core/hilfe`). Der Core registriert sie
     * beim Start (hilfeRegistrieren); sichtbar sind sie nur, solange das Modul aktiv ist (MCP-Hilfe, Suche).
     */
    hilfe?: Record<string, HilfeThema>;
    /**
     * Migrationsordner (nur `manifest.daten.migrationen = 'eigen'`). Ohne Angabe gilt die Konvention
     * `modules/<schluessel>/server/drizzle` (im Image unter /app/modules/<schluessel>/server/drizzle).
     */
    migrationsOrdner?: string;
}
