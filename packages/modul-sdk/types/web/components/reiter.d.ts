import { type ReactNode } from 'react';
export interface Reiter<T extends string> {
    value: T;
    label: string;
    /** Zähler hinter der Beschriftung (0 und leer werden nicht angezeigt) */
    count?: number | null;
    hidden?: boolean;
    /** Kurzer Hinweis (z. B. „Prüfen“), ab Tabletbreite sichtbar */
    hint?: string;
    /** Zusätzliche Markierung, z. B. ein Fehlerpunkt mit Text für Screenreader */
    marke?: ReactNode;
    /** Reiter als Verweis (Seitenadresse) statt als Schaltfläche */
    href?: string;
}
export declare function TabBar<T extends string>({ tabs, value, onChange, label, idPrefix, panelId, kompakt, ende, className, }: {
    tabs: Reiter<T>[];
    value: T;
    onChange?: (v: T) => void;
    label: string;
    /** Eindeutiger Präfix für die IDs der Reiter (`${idPrefix}-${value}`), z. B. für aria-labelledby des Inhalts */
    idPrefix?: string;
    /** ID des Inhaltsbereichs (aria-controls des aktiven Reiters) */
    panelId?: string;
        kompakt?: boolean;
    /** Element am Ende der Leiste (z. B. Hilfeknopf); steht außerhalb der Reiterliste */
    ende?: ReactNode;
    className?: string;
}): import("react").JSX.Element;
