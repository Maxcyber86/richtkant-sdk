import type { ComponentType, LazyExoticComponent, ReactNode } from 'react';
import type { ModulChangelogEintrag } from '../../core/modulsystem/changelog.js';
import type { ModulManifest } from '../../core/modulsystem/vertrag.js';
import type { HilfeThema } from '../../core/hilfe/modell.js';
export type ModulIcon = ComponentType<{
    className?: string;
}>;
export type WebSlot = 'kunde.abschnitte' | 'artikel.formular' | 'fertigung.geometrie' | 'beleg.positionsHinweis' | 'beleg.quellenDialog' | 'kalkulationen.quelle' | 'aa.quelleDetail' | 'lieferant.reiter';
/**
 * Vertrag 2.0.0: Props je Slot (Teil des Vertrags; Änderungen nur additiv, neue optionale Props = Minor).
 * Der Core übergibt genau diese Props; ein Beitrag darf weitere Props ignorieren. Slots ohne Aufrufstelle im Core
 * (`kunde.abschnitte`, `beleg.quellenDialog`, `kalkulationen.quelle`) sind reserviert und erhalten derzeit keine Props.
 */
export interface WebSlotProps {
    /** reserviert (Kunde › Abschnitte) */
    'kunde.abschnitte': Record<string, never>;
    /** Erweiterung der Grundart im Artikelformular; Schlüssel des Beitrags = Grundart */
    'artikel.formular': {
        wert: unknown;
        setzen: (wert: unknown) => void;
        offen: boolean;
        gueltigMelden: (gueltig: boolean) => void;
    };
    /** Geometrie eines Fertigungsauftrags; Schlüssel des Beitrags = Fertigungsart */
    'fertigung.geometrie': {
        daten: unknown;
    };
    /** Hinweis unter den Positionen eines Belegs */
    'beleg.positionsHinweis': {
        positionen: readonly unknown[];
    };
    /** reserviert (Beleg › Kalkulationen übernehmen; heute generisch über KalkulationsQuelle.liste) */
    'beleg.quellenDialog': Record<string, never>;
    /** reserviert (Kalkulationsliste; heute generisch über KalkulationsQuelle.liste) */
    'kalkulationen.quelle': Record<string, never>;
    /** Abschnitt der Quelle in der Arbeitsauftragsansicht */
    'aa.quelleDetail': {
        aa: unknown;
    };
    /** Reiter am Lieferanten (Angaben über `WebReiterAngaben` an der Komponente) */
    'lieferant.reiter': {
        lieferantId: string | null;
        entwurf: Record<string, unknown>;
        setzen: (feld: string, wert: unknown) => void;
    };
}
/** Komponente eines Slot-Beitrags mit den Props des Slots */
export type WebSlotKomponente<S extends WebSlot> = ComponentType<WebSlotProps[S]>;
/**
 * Statische Angaben eines Reiter-Beitrags (z. B. Slot `lieferant.reiter`), als Eigenschaft `reiter` an der Komponente.
 * `felder` sind Erweiterungsspalten des Datensatzes, die der Reiter bearbeitet; der Core übernimmt sie in den Entwurf
 * und sendet sie beim Speichern mit. `spalte` ergänzt die Liste der Datensätze um eine Spalte.
 */
export interface WebReiterAngaben {
    label: string;
    /** Nur mit diesem Recht sichtbar (z. B. preise.ek) */
    recht?: string;
    felder?: string[];
    spalte?: {
        titel: string;
        wert: (datensatz: Record<string, unknown>) => ReactNode;
    };
    /** Vertrag 2.0.0: Zeile im Abschnitt „Stammdaten“ der Detailseite (z. B. Lieferant), nur bei aktivem Modul */
    stammdaten?: {
        label: string;
        wert: (datensatz: Record<string, unknown>) => ReactNode;
    };
}
/** Admin-Bereich eines Moduls (unter Administration › Module › <Modul>) */
export interface WebAdminSeite {
    /** Inhalt einschließlich Seitenkopf (<PageHeader funktion=… />), nachgeladen */
    komponente: ComponentType;
    /** Kurzbeschreibung in der Übersicht der Administration */
    text: string;
    /** Suchbegriffe der Administration */
    stichworte?: string[];
}
/** Web-Teil eines Moduls */
export interface WebModul {
    manifest: ModulManifest;
    /** Routenschlüssel des Manifests → nachgeladene Seite */
    seiten: Record<string, LazyExoticComponent<ComponentType>>;
    /** Admin-Funktion des Moduls (unter Administration › Module › <Modul>) → Inhalt */
    admin: Record<string, WebAdminSeite | (() => ReactNode)>;
    /** Symbole je Funktion bzw. Menübereich des Moduls */
    icons: Record<string, ModulIcon>;
    slots?: Partial<Record<WebSlot, Record<string, ComponentType<Record<string, unknown>>>>>;
    /** Hilfeartikel des Moduls (nachgeladen) */
    hilfe?: () => Promise<Record<string, HilfeThema>>;
    /**
     * 0.13.1: Versionsverlauf des Moduls (eigene Versionierung), nachgeladen aus dem Subpfad `/changelog` des
     * Kernpakets des Moduls. Der Versionsdialog zeigt ihn für installierte Module.
     */
    changelog?: () => Promise<readonly ModulChangelogEintrag[]>;
}
