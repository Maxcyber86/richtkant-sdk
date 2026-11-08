export declare function formatCent(cent: number | null | undefined): string;
export declare function formatNumber(value: number, digits?: number): string;
/** Wandelt eine deutschsprachige Eingabe ("1.234,56") in Cent um. */
export declare function parseEuroToCent(input: string): number | null;
