/** Zweck eines Laufs (Vertrag 8.3): Altdatenübernahme oder Kataloge */
declare const KI_LAUF_ZWECKE_CORE: {
    readonly altdaten: "Datenübernahme aus dem Altsystem";
    readonly lieferantenkatalog: "Lieferantenkatalog (Artikel und Preise)";
};
/** Zweck eines Laufs: Core oder (0.13.0) Katalogläufe eines Moduls (Bezeichnung über manifest.kataloge.datenuebernahmeZwecke) */
export type KiLaufZweck = keyof typeof KI_LAUF_ZWECKE_CORE | (string & {});
