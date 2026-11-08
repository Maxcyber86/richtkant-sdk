import { z } from 'zod';
/**
 * Gespeicherte Form eines Kalenderanhangs je Person (`notifications.kalender`). Enthält nur, was die E-Mail ohnehin
 * nennt; Absender, Empfängeradresse und Zeitstempel werden erst beim Versand eingesetzt.
 */
export declare const kalenderVormerkungSchema: z.ZodObject<{
    v: z.ZodLiteral<1>;
    methode: z.ZodEnum<{
        REQUEST: "REQUEST";
        CANCEL: "CANCEL";
    }>;
    art: z.ZodString;
    id: z.ZodString;
    uid: z.ZodNullable<z.ZodString>;
    sequenz: z.ZodNumber;
    zeit: z.ZodDiscriminatedUnion<[z.ZodObject<{
        art: z.ZodLiteral<"zeit">;
        beginn: z.ZodISODateTime;
        ende: z.ZodISODateTime;
    }, z.core.$strip>, z.ZodObject<{
        art: z.ZodLiteral<"ganztaegig">;
        von: z.ZodISODate;
        bis: z.ZodISODate;
    }, z.core.$strip>], "art">;
    titel: z.ZodString;
    ort: z.ZodNullable<z.ZodString>;
    zeilen: z.ZodArray<z.ZodString>;
    link: z.ZodString;
    erinnerungMinuten: z.ZodNullable<z.ZodNumber>;
}, z.core.$strip>;
export type KalenderVormerkung = z.infer<typeof kalenderVormerkungSchema>;
