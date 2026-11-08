import { type BedarfsPosition } from '../../core/einkauf.js';
export interface Bedarf {
    positionen: BedarfsPosition[];
    technischeFehler: {
        quelle: string;
        text: string;
    }[];
    isTest: boolean;
    /** Vorschlag für Projekt und Auftrag (aus der Quelle) */
    auftragId: string | null;
    kundeId: string | null;
}
