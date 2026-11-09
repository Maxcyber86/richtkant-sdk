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
    oz: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    gaeb: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        art: z.ZodEnum<{
            normal: "normal";
            grund: "grund";
            wahl: "wahl";
            bedarf_mit_gb: "bedarf_mit_gb";
            bedarf_ohne_gb: "bedarf_ohne_gb";
            hinweis: "hinweis";
            ausfuehrung: "ausfuehrung";
            bereich: "bereich";
            los: "los";
        }>;
        id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        ebene: z.ZodOptional<z.ZodNumber>;
        zulage: z.ZodOptional<z.ZodBoolean>;
        pauschal: z.ZodOptional<z.ZodBoolean>;
        stundenlohn: z.ZodOptional<z.ZodBoolean>;
        altGruppe: z.ZodOptional<z.ZodString>;
        altNr: z.ZodOptional<z.ZodString>;
        einheit: z.ZodOptional<z.ZodString>;
        menge: z.ZodOptional<z.ZodNumber>;
        gekuerzt: z.ZodOptional<z.ZodBoolean>;
        inSumme: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>>>;
}, z.core.$strip>;
export type PositionInput = z.infer<typeof positionInputSchema>;
