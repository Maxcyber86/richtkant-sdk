import { z } from 'zod';
/**
 * Zeichnungsmodell: Ansichtsrahmen (x nach rechts, y nach unten wie SVG) und Elemente. `bemassung: true` kennzeichnet
 * Elemente der Bemaßung; sie entfallen, wenn die Belegart ohne Bemaßung druckt.
 */
export declare const belegZeichnungSchema: z.ZodObject<{
    v: z.ZodLiteral<1>;
    breite: z.ZodNumber;
    hoehe: z.ZodNumber;
    elemente: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        bemassung: z.ZodOptional<z.ZodBoolean>;
        art: z.ZodLiteral<"pfad">;
        d: z.ZodString;
        linie: z.ZodOptional<z.ZodEnum<{
            linie: "linie";
            linie2: "linie2";
            flaeche: "flaeche";
            leer: "leer";
            akzent: "akzent";
        }>>;
        fuellung: z.ZodOptional<z.ZodEnum<{
            linie: "linie";
            linie2: "linie2";
            flaeche: "flaeche";
            leer: "leer";
            akzent: "akzent";
        }>>;
        staerke: z.ZodOptional<z.ZodNumber>;
        gestrichelt: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>, z.ZodObject<{
        bemassung: z.ZodOptional<z.ZodBoolean>;
        art: z.ZodLiteral<"kreis">;
        x: z.ZodNumber;
        y: z.ZodNumber;
        r: z.ZodNumber;
        linie: z.ZodOptional<z.ZodEnum<{
            linie: "linie";
            linie2: "linie2";
            flaeche: "flaeche";
            leer: "leer";
            akzent: "akzent";
        }>>;
        fuellung: z.ZodOptional<z.ZodEnum<{
            linie: "linie";
            linie2: "linie2";
            flaeche: "flaeche";
            leer: "leer";
            akzent: "akzent";
        }>>;
        staerke: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>, z.ZodObject<{
        bemassung: z.ZodOptional<z.ZodBoolean>;
        art: z.ZodLiteral<"linie">;
        x1: z.ZodNumber;
        y1: z.ZodNumber;
        x2: z.ZodNumber;
        y2: z.ZodNumber;
        linie: z.ZodOptional<z.ZodEnum<{
            linie: "linie";
            linie2: "linie2";
            flaeche: "flaeche";
            leer: "leer";
            akzent: "akzent";
        }>>;
        staerke: z.ZodOptional<z.ZodNumber>;
        gestrichelt: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>, z.ZodObject<{
        bemassung: z.ZodOptional<z.ZodBoolean>;
        art: z.ZodLiteral<"text">;
        x: z.ZodNumber;
        y: z.ZodNumber;
        text: z.ZodString;
        groesse: z.ZodNumber;
        ausrichtung: z.ZodOptional<z.ZodEnum<{
            ende: "ende";
            start: "start";
            mitte: "mitte";
        }>>;
        drehung: z.ZodOptional<z.ZodNumber>;
        farbe: z.ZodOptional<z.ZodEnum<{
            linie: "linie";
            linie2: "linie2";
            flaeche: "flaeche";
            leer: "leer";
            akzent: "akzent";
        }>>;
    }, z.core.$strip>], "art">>;
    alt: z.ZodString;
}, z.core.$strip>;
export type BelegZeichnung = z.infer<typeof belegZeichnungSchema>;
