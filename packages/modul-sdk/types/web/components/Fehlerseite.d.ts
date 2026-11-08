import { type ReactNode } from 'react';
/**
 * Datensatz einer Detailseite nicht vorhanden (gelöscht, nie vorhanden, ungültige Adresse) bzw. nicht ladbar:
 * Meldung mit Rückweg statt endlosem „Wird geladen …“.
 */
export declare function NichtGefunden({ titel, fehler, zurueck, erneut, children, }: {
    titel: string;
    fehler?: unknown;
    zurueck?: {
        to: string;
        label: string;
    };
    /** Bei einem Ladefehler (nicht 404): erneut laden (0.12.2 UX-04) */
    erneut?: () => void;
    children?: ReactNode;
}): import("react").JSX.Element;
