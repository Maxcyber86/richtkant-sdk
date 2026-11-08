/**
 * Kataloge des Core mit Beiträgen der Module (0.13.0, Vorgabe „Core als eigenständiges Produkt“).
 *
 * Persistierte Auswahllisten (Artikel-Grundarten, Reklamationskategorien, Maschinentypen, Benachrichtigungsarten,
 * Etikettenarten und -quellen, Katalogformate, Importarten, Zwecke der Datenübernahme, Qualifikationsvorlagen) enthalten
 * im Core nur branchenneutrale Einträge. Module steuern ihre Einträge über das Manifest bei (`kataloge`,
 * `qualifikationsvorlagen`, `artikelGrundarten`). Die Registry trägt sie beim Start in die Kataloge des Core ein;
 * Core-Einträge haben Vorrang. Die Schlüssel sind dauerhaft gespeichert und werden nie umgeschrieben: Fehlt das Modul
 * im Image, erscheint ein gespeicherter Schlüssel unverändert (z. B. in alten Reklamationen).
 *
 * Ob ein Eintrag auswählbar ist, entscheidet der Aufrufer anhand des Modulstatus (`katalogModul()`); die Kataloge
 * selbst enthalten alle verfügbaren Module, damit gespeicherte Werte immer eine Bezeichnung haben.
 *
 * Diese Datei hat keine Abhängigkeiten; die Kataloge melden sich beim Laden ihres Moduls hier an.
 */
/** Kataloge mit Bezeichnungen (Schlüssel → Text) */
export declare const KATALOG_NAMEN: readonly ["artikelGrundarten", "reklamationskategorien", "maschinentypen", "benachrichtigungsarten", "benachrichtigungsKategorien", "etikettenarten", "etikettenquellen", "etikettenStandardvorlagen", "katalogformate", "importarten", "datenuebernahmeZwecke", "geraetearten", "druckzwecke"];
export type KatalogName = (typeof KATALOG_NAMEN)[number];
/** Vorlage einer Qualifikation (wie QualifikationDef des Personalmoduls) */
export interface QualifikationsvorlageBeitrag {
    key: string;
    name: string;
    kategorie: string;
    gueltigkeitMonate: number | null;
    beschreibung: string | null;
}
/** Vorlage eines Bezugswegs (Lieferantenkatalog: „So bekommen Sie die Datei“) */
export interface BezugswegVorlageBeitrag {
    key: string;
    lieferant: string;
    format: string;
    text: string;
}
/**
 * Grundart des Artikelstamms (persistierte Kategorie, steuert Verhalten). Der Core führt branchenneutrale Grundarten;
 * Module steuern weitere bei (z. B. eine Grundart mit Erweiterungsfeld gleichen Namens an `articles`).
 */
export interface ArtikelGrundart {
    schluessel: string;
    label: string;
    /** Vorschlag der Einheit für neue Artikel */
    einheit: string;
    /** Weitere Schreibweisen im Datenimport (z. B. Plural, Abkürzung) */
    synonyme?: string[];
    /** Einheit ist fest (z. B. Preis je Fläche über die Preisliste des Lieferanten) */
    einheitFest?: boolean;
    /** Hinweis am Verkaufspreis im Artikelformular */
    preisHinweis?: string;
    /** Verkaufspreis entsteht in einer Kalkulation des Moduls (Listen zeigen „kalkuliert“) */
    vkKalkuliert?: boolean;
    /**
     * Erweiterungsfeld gleichen Namens an `articles` (Modul): Vorbelegung für neue Artikel (JSON). Die Eingabe übernimmt
     * der Beitrag des Moduls zum Slot `artikel.formular`, die Prüfung der Server-Teil des Moduls.
     */
    entwurf?: Record<string, unknown>;
    /** Modul, das die Grundart beiträgt (gesetzt von der Registry) */
    modul?: string;
}
