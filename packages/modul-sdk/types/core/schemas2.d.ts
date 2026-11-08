import { z } from 'zod';
import { POSITION_TYPES } from './documents.js';
export declare const positionInputSchema: z.ZodObject<{
    typ: z.ZodType<(typeof POSITION_TYPES)[number], (typeof POSITION_TYPES)[number]>;
    artikelId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    quelleId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bezeichnung: z.ZodString;
    beschreibung: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    menge: z.ZodNumber;
    einheit: z.ZodString;
    einzelpreisCent: z.ZodNumber;
    ekCent: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    rabattProzent: z.ZodDefault<z.ZodNumber>;
    ustSatz: z.ZodDefault<z.ZodUnion<readonly [z.ZodLiteral<19>, z.ZodLiteral<7>, z.ZodLiteral<0>]>>;
    lieferscheinPositionId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    preisquelle: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
        rabattgruppe: "rabattgruppe";
        kundenpreis: "kundenpreis";
        listenpreis: "listenpreis";
    }>>>;
    preisVorschlag: z.ZodOptional<z.ZodBoolean>;
    positionId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export type PositionInput = z.infer<typeof positionInputSchema>;
