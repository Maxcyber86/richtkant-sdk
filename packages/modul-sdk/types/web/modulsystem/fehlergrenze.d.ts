import { Component, type ErrorInfo, type ReactNode } from 'react';
interface Props {
        modul: string;
    /** Bereich für die Meldung, z. B. der Slot 'kunde.abschnitte' oder 'Seite' */
    bereich: string;
    children: ReactNode;
    /** Kurzer Hinweis (z. B. in einer Tabellenzeile oder neben einem Formularfeld) */
    kompakt?: boolean;
}
interface Zustand {
    fehler: Error | null;
}
export declare class ModulFehlergrenze extends Component<Props, Zustand> {
    state: Zustand;
    static getDerivedStateFromError(fehler: Error): Zustand;
    componentDidCatch(fehler: Error, info: ErrorInfo): void;
    render(): ReactNode;
}
