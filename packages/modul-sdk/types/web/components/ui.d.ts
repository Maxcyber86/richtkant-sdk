import { type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from 'react';
import { type AnyFunktionKey } from '../../core/navigation.js';
import { type AbfrageLage } from '../lib/ladestand';
export declare function cx(...parts: (string | false | null | undefined)[]): string;
type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
export declare function buttonClass(variant?: Variant, size?: 'sm' | 'md', extra?: string): string;
export declare const Button: import("react").ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    size?: "sm" | "md";
    busy?: boolean;
    icon?: ReactNode; /** 0.13.1: Erklärung als Tooltip (statt nativem `title`) */
    tooltip?: string;
} & import("react").RefAttributes<HTMLButtonElement>>;
/**
 * Knopf nur mit Symbol. `label` ist der zugängliche Name und zugleich der Tooltip (0.13.1: gestaltet wie das Symbol
 * „Kundenansicht“, bei Hover, Tastaturfokus und langem Druck). `tooltip` (bzw. `title`) ergänzt eine kurze Erklärung.
 */
export declare const IconButton: import("react").ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
    tooltip?: string;
} & import("react").RefAttributes<HTMLButtonElement>>;
export declare function Field({ label, hint, error, children, className, htmlFor, hinweisId: hinweisIdVorgabe }: {
    label: string;
    hint?: ReactNode;
    error?: string | null;
    children: ReactNode;
    className?: string;
    htmlFor?: string;
    hinweisId?: string;
}): import("react").JSX.Element;
export declare const TextInput: import("react").ForwardRefExoticComponent<InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    hint?: ReactNode;
    error?: string | null;
} & import("react").RefAttributes<HTMLInputElement>>;
export declare function SelectInput({ label, hint, error, className, id, children, busy, onChange, ...rest }: SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string;
    hint?: ReactNode;
    error?: string | null;
    busy?: boolean;
}): import("react").JSX.Element;
/** Zahleneingabe mit deutschem Dezimalkomma. Liefert null bei leerer Eingabe. */
export declare function NumberInput({ label, value, onChange, unit, digits, min, max, hint, className, id, disabled, placeholder, required, fixed, ariaLabel, onScanCode, }: {
    /** Zugänglicher Name, wenn keine sichtbare Beschriftung vorhanden ist */
    ariaLabel?: string;
    /**
     * 0.16.9: Mengenfeld an einer Scan-Erfassungsstelle – landet die Eingabe eines Tastatur-Scanners (GTIN) im Feld, bleibt
     * die Menge unverändert und der Code geht an diese Funktion (z. B. wie ein Scan im Scanfeld).
     */
    onScanCode?: (code: string) => void;
    /** Nachkommastellen immer anzeigen (z. B. Geldbeträge) */
    fixed?: boolean;
    label?: string;
    value: number | null | undefined;
    onChange: (v: number | null) => void;
    unit?: string;
    digits?: number;
    min?: number;
    max?: number;
    hint?: ReactNode;
    className?: string;
    id?: string;
    disabled?: boolean;
    placeholder?: string;
    required?: boolean;
}): import("react").JSX.Element;
export declare function Checkbox({ label, checked, onChange, hint, disabled, busy }: {
    label: ReactNode;
    checked: boolean;
    onChange: (v: boolean) => void;
    hint?: ReactNode;
    disabled?: boolean; /** 0.16.13: Aktion läuft – fokussierbar, keine Änderung */
    busy?: boolean;
}): import("react").JSX.Element;
/** Ein-/Aus-Schalter (WAI-ARIA switch); Beschriftung als zugänglicher Name */
export declare function Switch({ checked, onChange, label, disabled, title, id, ohneTooltip, busy, }: {
    checked: boolean;
    onChange: (v: boolean) => void;
    label: string;
    disabled?: boolean;
    title?: string;
    id?: string;
    /** Beschriftung steht sichtbar daneben (z. B. SchalterFeld): kein Tooltip mit demselben Text */
    ohneTooltip?: boolean;
    /** 0.16.13: Aktion läuft – der Schalter bleibt fokussierbar und schaltet nicht */
    busy?: boolean;
}): import("react").JSX.Element;
/** Schalter mit sichtbarer Beschriftung (Klick auf den Text schaltet ebenfalls) */
export declare function SchalterFeld({ label, sichtbar, hint, checked, onChange, disabled, busy, }: {
    label: string;
    sichtbar?: ReactNode;
    hint?: ReactNode;
    checked: boolean;
    onChange: (v: boolean) => void;
    disabled?: boolean;
    busy?: boolean;
}): import("react").JSX.Element;
export declare function Segmented<T extends string>({ value, onChange, options, label }: {
    value: T;
    onChange: (v: T) => void;
    options: {
        value: T;
        label: ReactNode;
        title?: string;
    }[];
    label: string;
}): import("react").JSX.Element;
/** Eintrag im Aktionsmenü: Handlung (`onClick`) oder Verweis (`href`, Pfad der Anwendung) */
export interface AktionsEintrag {
    label: string;
    icon?: ReactNode;
    onClick?: () => void;
    href?: string;
    danger?: boolean;
    disabled?: boolean;
    hidden?: boolean;
}
/**
 * 0.15.0 (VT-19): Überlaufmenü „Weitere“ für seltenere Aktionen, vor allem in Kopfzeilen auf dem Smartphone. Bedienung wie das
 * Benutzermenü: Pfeiltasten, Pos1/Ende, Esc (Fokus zurück zum Knopf), Tab bzw. Klick außerhalb schließt.
 */
export declare function AktionsMenue({ label, eintraege, className }: {
    label?: string;
    eintraege: AktionsEintrag[];
    className?: string;
}): import("react").JSX.Element | null;
export declare function Badge({ tone, children }: {
    tone?: 'neutral' | 'float' | 'warn' | 'err' | 'test';
    children: ReactNode;
}): import("react").JSX.Element;
export declare function TestBadge({ show }: {
    show: boolean;
}): import("react").JSX.Element | null;
export declare function Spinner({ label }: {
    label?: string;
}): import("react").JSX.Element | null;
/**
 * Zustand einer Abfrage ohne Daten: bei Fehlern (z. B. fehlender Berechtigung) die Meldung statt eines
 * endlosen Ladezustands (mit „Erneut versuchen“, wenn die Abfrage `refetch` mitbringt); ohne Verbindung zum
 * Server ein Hinweis statt Dauer-Laden; ist die Abfrage abgeschaltet und lädt nicht, die Leermeldung.
 * Nur einsetzen, solange keine Daten vorliegen: sonst stünde der Ladehinweis dauerhaft neben den Daten.
 */
export declare function AbfrageZustand({ abfrage, leer, nichtGefunden, }: {
    abfrage: AbfrageLage;
    leer?: ReactNode;
    /** Meldung, wenn der Datensatz nicht (mehr) vorhanden ist (nur bei Status 404; andere Fehler als Ladefehler) */
    nichtGefunden?: ReactNode;
}): import("react").JSX.Element | null;
/** Fehlerzustand einer Abfrage mit Meldung und „Erneut versuchen“ (statt endlosem Laden oder irreführender Leer- bzw. Nullwerte) */
export declare function AbfrageFehler({ fehler, erneut, titel }: {
    fehler: unknown;
    erneut?: () => void;
    titel?: string;
}): import("react").JSX.Element;
/**
 * Seitenkopf. Seiten einer Funktion übergeben `funktion`; der Titel kommt dann aus dem
 * Anwendungsverzeichnis und stimmt immer mit Menü, Favoriten und Verweisen überein.
 */
export declare function PageHeader({ title, funktion, description, actions, hilfe, kompaktMobil }: {
    title?: string;
    funktion?: AnyFunktionKey;
    description?: ReactNode;
    actions?: ReactNode;
    hilfe?: boolean;
    kompaktMobil?: boolean;
}): import("react").JSX.Element;
/** Kopf einer Detailseite mit Rückweg zur Liste, Kennzeichen, Kurzangaben und Aktionen */
export declare function DetailHeader({ back, title, badges, sub, actions }: {
    back: {
        to: string;
        label: string;
    };
    title: ReactNode;
    badges?: ReactNode;
    sub?: ReactNode;
    actions?: ReactNode;
}): import("react").JSX.Element;
export declare function EmptyState({ title, children, action, abfrage }: {
    title: string;
    children?: ReactNode;
    action?: ReactNode;
    abfrage?: AbfrageLage;
    ohneAbfrage?: true;
}): import("react").JSX.Element | null;
/**
 * Leerhinweis innerhalb einer Liste oder Kachel (z. B. „Keine offenen Anträge.“): nur nach erfolgreicher, leerer Antwort.
 * Fehlen die Daten der Seite wegen eines Ladefehlers, bleibt er aus; den Hinweis zeigt die Seitenhülle (0.12.2 UX-02).
 */
export declare function Leerhinweis({ children, abfrage }: {
    children: ReactNode;
    abfrage?: AbfrageLage;
}): import("react").JSX.Element | null;
export declare function Notice({ tone, children, title }: {
    tone: 'info' | 'warn' | 'err' | 'ok';
    title?: string;
    children: ReactNode;
}): import("react").JSX.Element;
/**
 * Gültigkeit für Formulare außerhalb von Dialogen: Ungültige Zahlenfelder halten jede Hauptaktion (`primary`, z. B.
 * „Speichern“) bzw. jeden Absendeknopf im Bereich an. Die Anwendung schließt jede Seite darin ein (AppShell); Dialoge bilden
 * darin einen eigenen Bereich.
 */
export declare function FormularGueltigkeitsBereich({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
/**
 * Dialog. Mit `onSubmit` sind Inhalt und Fußzeile ein Formular: Enter in einem einzeiligen Feld löst den Knopf mit
 * `type="submit"` aus (0.15.0, UX-Prozesstest), Esc schließt wie bisher.
 */
export declare function Dialog({ open, onClose, title, children, footer, width, onSubmit, }: {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    footer?: ReactNode;
    width?: number;
    onSubmit?: () => void;
}): import("react").JSX.Element;
export declare function ConfirmDialog({ open, title, children, confirmLabel, onConfirm, onClose, busy, danger, }: {
    open: boolean;
    title: string;
    children: ReactNode;
    confirmLabel: string;
    onConfirm: () => void;
    onClose: () => void;
    busy?: boolean;
    danger?: boolean;
}): import("react").JSX.Element;
interface Toast {
    id: number;
    tone: 'ok' | 'err';
    text: string;
    /** Anzahl gleicher Meldungen, die zusammengefasst wurden */
    anzahl: number;
}
export declare const useToast: () => (tone: Toast["tone"], text: string) => void;
export declare function Table({ children, className }: {
    children: ReactNode; /** 0.13.1: z. B. `table-fixed` für stabile Spaltenbreiten */
    className?: string;
}): import("react").JSX.Element;
