import { type ReactNode } from 'react';
interface StandardKontext {
    einstellung: string;
    wert: unknown;
}
/**
 * Einstellung und bearbeiteter Wert für die Felder darunter. `automatisch`: Formularbausteine mit passender Beschriftung zeigen
 * „Abweichend vom Standard“ selbst (Seiten mit eigenen Formularen, 0.17.0); ohne bleibt es bei `FeldStandard` je Feld.
 */
export declare function EinstellungStandard({ einstellung, wert, automatisch, children }: StandardKontext & {
    automatisch?: boolean;
    children: ReactNode;
}): import("react").JSX.Element;
/**
 * Hinweis „Abweichend vom Standard“ unter einem Feld. `feld` ist der Feldschlüssel (`kontakte.interessentLoeschMonate`) oder, im
 * Kontext einer Einstellung, nur der Pfad (`interessentLoeschMonate`). Ohne `wert` gilt der Wert aus dem Kontext.
 */
export declare function FeldStandard({ feld, wert, className }: {
    feld: string;
    wert?: unknown;
    className?: string;
}): import("react").JSX.Element | null;
/**
 * „Auf Standard zurücksetzen“ für eine Einstellung. `wert` ist der bearbeitete Wert, `zuruecksetzen` erhält den Wert mit den
 * Standardwerten (Geheimnisse unverändert) und speichert ihn. Ohne Abweichung erscheint der Knopf nicht.
 */
export declare function AufStandardKnopf<T>({ einstellung, wert, zuruecksetzen, busy, disabled, bereich, }: {
    einstellung: string;
    wert: T;
    zuruecksetzen: (neu: T) => void;
    busy?: boolean;
    disabled?: boolean;
    /**
     * 0.17.0 (Paket H): nur Felder dieses Admin-Bereichs (Funktionsschlüssel), wenn eine Einstellung auf mehrere Seiten verteilt ist
     * (z. B. Buchhaltung: SEPA-Angaben unter Finanzen › Zahlungsverkehr). Felder anderer Bereiche bleiben unverändert.
     */
    bereich?: string;
}): import("react").JSX.Element;
