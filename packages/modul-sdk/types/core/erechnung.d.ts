export declare const ERECHNUNG_FORMATE: {
    readonly zugferd: "ZUGFeRD / Factur-X (PDF mit XML, Profil EN 16931)";
    readonly xrechnung_cii: "XRechnung (CII)";
    readonly xrechnung_ubl: "XRechnung (UBL)";
    readonly pdf: "PDF ohne strukturierte Daten";
};
export type ErechnungFormat = keyof typeof ERECHNUNG_FORMATE;
