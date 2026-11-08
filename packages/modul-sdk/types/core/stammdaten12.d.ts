import { z } from 'zod';
declare const IMPORT_ARTEN_CORE: {
    readonly kunden: "Kunden";
    readonly lieferanten: "Lieferanten";
    readonly artikel: "Artikel";
    readonly preisliste: "Preisliste (Bezugsquellen und Einkaufspreise)";
    readonly offene_posten: "Offene Posten (Altbestand)";
    readonly lieferantenkatalog: "Lieferantenkatalog (Artikel und Preise)";
    readonly betriebsmittel: "Betriebsmittel (Fahrzeuge, Geräte, Maschinen, Werkzeuge)";
    readonly ansprechpartner: "Ansprechpartner (zu vorhandenen Kunden)";
};
/**
 * Importart: Schlüssel des Core oder (0.13.0) einer Importart eines Moduls (z. B. Katalogläufe eines Moduls; Bezeichnung
 * über manifest.kataloge.importarten). Schlüssel sind in import_laeufe gespeichert und bleiben unverändert.
 */
export type ImportArt = keyof typeof IMPORT_ARTEN_CORE | (string & {});
export declare const importOptionenSchema: z.ZodObject<{
    dubletten: z.ZodDefault<z.ZodEnum<{
        ueberspringen: "ueberspringen";
        aktualisieren: "aktualisieren";
        anlegen: "anlegen";
    }>>;
    richtung: z.ZodDefault<z.ZodEnum<{
        einkauf: "einkauf";
        verkauf: "verkauf";
    }>>;
    demo: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export type ImportOptionen = z.infer<typeof importOptionenSchema>;
