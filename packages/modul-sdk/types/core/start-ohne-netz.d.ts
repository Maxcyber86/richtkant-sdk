import { z } from 'zod';
/** Einstellungen des Betriebs zum Start ohne Verbindung (Teil der Einstellungen der Offline-Erfassung) */
export declare const startOhneNetzSchema: z.ZodObject<{
    aktiv: z.ZodDefault<z.ZodBoolean>;
    verfallTage: z.ZodDefault<z.ZodNumber>;
    pin: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export type StartOhneNetzEinstellungen = z.infer<typeof startOhneNetzSchema>;
