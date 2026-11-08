import type { BestaetigungZweck } from '../../../core/sicherheit.js';
interface BestaetigungsArten {
    passkey: boolean;
    kennwort: boolean;
    faktor: string | null;
}
/** Verfügbare Bestätigungsarten der angemeldeten Person */
export declare function useBestaetigungsArten(): import("@tanstack/react-query").UseQueryResult<BestaetigungsArten, Error>;
/** Passkey prüfen und Bestätigungstoken für den Zweck holen */
export declare function passkeyBestaetigungHolen(zweck: BestaetigungZweck): Promise<string>;
/**
 * Knopf „Mit Passkey bestätigen“. `onBestaetigt` erhält das Token und führt die eigentliche Aktion aus (Fehler der
 * Aktion zeigt der Dialog selbst an). Ohne verfügbaren Passkey wird nichts angezeigt.
 */
export declare function PasskeyBestaetigenKnopf({ zweck, onBestaetigt, disabled, variante, text, onFehler, }: {
    zweck: BestaetigungZweck;
    onBestaetigt: (token: string) => Promise<void> | void;
    disabled?: boolean;
    variante?: 'primary' | 'secondary';
    text?: string;
    onFehler?: (meldung: string) => void;
}): import("react").JSX.Element | null;
/** Trennzeile „oder“ zwischen Passkey und Kennwort (nur wenn ein Passkey verfügbar ist) */
export declare function OderKennwort({ text }: {
    text?: string;
}): import("react").JSX.Element | null;
