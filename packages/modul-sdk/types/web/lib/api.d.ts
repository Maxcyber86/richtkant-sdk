export declare const api: {
    get: <T>(path: string, signal?: AbortSignal, optionen?: {
        timeoutMs?: number;
    }) => Promise<T>;
    post: <T>(path: string, body?: unknown, signal?: AbortSignal, optionen?: {
        idempotenz?: string;
    }) => Promise<T>;
    put: <T>(path: string, body: unknown) => Promise<T>;
    patch: <T>(path: string, body: unknown) => Promise<T>;
    del: <T>(path: string) => Promise<T>;
};
export declare function errorMessage(err: unknown): string;
/**
 * Lädt eine Datei der API herunter (GET oder POST mit Eingabe) und bietet sie zum Speichern an.
 * Der Dateiname stammt aus der Antwort des Servers.
 */
export declare function apiDownload(path: string, init?: {
    method?: 'GET' | 'POST';
    body?: unknown;
    dateiname?: string;
}): Promise<void>;
