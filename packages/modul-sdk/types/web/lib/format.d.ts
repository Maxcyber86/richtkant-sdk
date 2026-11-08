/** Anzeigeformate (deutsch) */
export declare function formatDateTime(iso: string | null | undefined): string;
/** Datei per Formular hochladen (multipart); Felder werden vor den Dateien gesendet */
export declare function uploadFiles<T>(path: string, fields: Record<string, string>, files: File[]): Promise<T>;
