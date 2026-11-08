export declare const BESTAETIGUNG_ZWECKE: {
    readonly kundenansicht_beenden: "Kundenansicht beenden";
    readonly assistent_aktion: "Aktion des KI-Assistenten bestätigen";
    readonly mcp_freigabe: "Entwurf eines KI-Programms freigeben";
    readonly portal_vertretung: "Vertretungsansicht im Kundenportal öffnen";
    readonly modulverwaltung: "Module installieren, entfernen oder wiederherstellen";
    readonly faktoren: "Anmeldefaktoren ändern";
    readonly angebot_entscheidung: "Angebot des Anbieters annehmen oder ablehnen";
    readonly mgmt_fernzugriff: "Fernzugriff des Management-Servers ändern";
    readonly system_wartung: "Wartung mit automatischem Beginn ankündigen, beginnen, beenden oder eine Wartung des Anbieters zurückziehen";
    readonly sicherung_herunterladen: "Datensicherung herunterladen";
    readonly glas_auflagen: "Freigabe unter Auflagen";
};
export type BestaetigungZweck = keyof typeof BESTAETIGUNG_ZWECKE;
