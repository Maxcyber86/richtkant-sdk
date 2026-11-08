declare const ETIKETT_ARTEN_CORE: {
    readonly lagerplatz: "Lagerplatz";
    readonly artikel: "Artikel";
};
/**
 * Etikettenart: Core (Lagerplatz, Artikel) oder (0.13.0) eine Art eines Moduls, z. B. Teile aus Kalkulationen
 * (Bezeichnung über manifest.kataloge.etikettenarten; Schlüssel = Grundart bzw. Positionstyp des Moduls).
 */
export type EtikettArt = keyof typeof ETIKETT_ARTEN_CORE | (string & {});
