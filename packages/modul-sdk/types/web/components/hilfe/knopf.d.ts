import { type ReactNode } from 'react';
import type { HilfeKey } from '../../../core/hilfe/index.js';
/**
 * Fragezeichen neben einer Überschrift. `label` beschreibt den Bereich für Screenreader
 * („Hilfe zu Kanten“); ohne Angabe genügt der Titel der Überschrift daneben.
 */
export declare function HilfeKnopf({ thema, label, className, groesse, text }: {
    thema: HilfeKey;
    label?: string;
    className?: string;
    groesse?: 'sm' | 'md';
    text?: ReactNode;
}): import("react").JSX.Element | null;
