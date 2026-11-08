import { type FunktionKey, type ModulFunktionKey } from './navigation.js';
export interface ApiSperre {
    /** Pfad ohne /api/v1; „*“ steht für genau einen Abschnitt (z. B. eine ID) */
    pfad: string;
    /** Nur ändernde Anfragen sperren; gespeicherte Daten bleiben an anderer Stelle lesbar */
    nurSchreibend?: boolean;
}
export interface FunktionsSchalter {
    /** Funktionen des Core oder eines Moduls (Schalter der Module stehen in deren Manifest) */
    benoetigt?: (FunktionKey | ModulFunktionKey)[];
    teilVon?: FunktionKey | ModulFunktionKey;
    api?: ApiSperre[];
    /** Hinweis vor dem Abschalten (gesetzliche Pflichten, Folgen) */
    hinweis?: string;
}
