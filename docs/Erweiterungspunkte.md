# Referenz der Erweiterungspunkte

Richtkant ERP 0.16.14 · Modulvertrag 2.4.0 · Stand 2026-11-13
Verantwortlich: Christian Heitzer, www.heitzer.info

Erzeugt aus den Typdeklarationen in `packages/modul-sdk` (maßgeblich sind die Typen; Regeln und Aufrufstellen im Core:
[Modul-SDK.md](Modul-SDK.md), Abschnitt 3). Ein Beitrag zählt nur, solange sein Modul installiert, aktiv, lizenziert und nicht
gestört ist; jeder Beitrag läuft in der Fehlerisolation des Core.

## Server: ServerModul (`@gm/server/sdk`)

Server-Teil eines Moduls

| Feld | Pflicht | Typ | Beschreibung |
|---|---|---|---|
| `manifest` | ja | `ModulManifest` | – |
| `plugin` | ja | `FastifyPluginAsync \| FastifyPluginAsyncZod` | – |
| `beimStart` | nein | `(ctx: Ctx) => Promise<void>` | Idempotente Startaufgabe (z. B. Stammdaten sichern) |
| `beiInstallation` | nein | `(ctx: Ctx, anlass: { erstinstallation: boolean; archivId: string \| null; …` | Vertrag 2.0.0: einmalig bei der Installation über Administration › Module (vor `beimStart`), z. B. Vorgabedaten anlegen. `erstinstallation`: die Instanz hatte das Modul nie installiert; `archivId`: Daten wurden aus einem Archiv wiederhergestellt (dann keine Vorgaben anlegen). Ein Fehler wird protokolliert und lässt die Installation bestehen. |
| `hintergrund` | nein | `ModulHintergrundaufgabe[]` | – |
| `mcp` | nein | `unknown[]` | MCP-Werkzeuge des Moduls (Vertrag folgt mit der MCP-Anbindung der Module) |
| `erweiterungen` | nein | `ServerErweiterungen` | – |
| `hilfe` | nein | `Record<string, HilfeThema>` | Hilfeartikel des Moduls (Inhalte aus dem Modul-Kern, z. B. `@rk-modul/<m>-core/hilfe`). Der Core registriert sie beim Start (hilfeRegistrieren); sichtbar sind sie nur, solange das Modul aktiv ist (MCP-Hilfe, Suche). |
| `migrationsOrdner` | nein | `string` | Migrationsordner (nur `manifest.daten.migrationen = 'eigen'`). Ohne Angabe gilt die Konvention `modules/<schluessel>/server/drizzle` (im Image unter /app/modules/&lt;schluessel>/server/drizzle). |

## Server: Erweiterungspunkte (`ErweiterungsSatz`, Feld `erweiterungen`)

Alle Beiträge eines Moduls

| Feld | Pflicht | Typ | Beschreibung |
|---|---|---|---|
| `positionstypen` | nein | `PositionstypErweiterung[]` | – |
| `bedarfsQuellen` | nein | `BedarfsQuelle[]` | – |
| `etikettenQuellen` | nein | `EtikettenQuelle[]` | – |
| `aaQuellen` | nein | `AaQuelle[]` | – |
| `insightQuellen` | nein | `InsightQuelle[]` | – |
| `datenschutzHooks` | nein | `DatenschutzHook[]` | – |
| `kalkulationsQuellen` | nein | `KalkulationsQuelle[]` | – |
| `artikelErweiterungen` | nein | `ArtikelErweiterung[]` | – |
| `preisStichtag` | nein | `PreisStichtagBeitrag[]` | – |
| `demoBeitraege` | nein | `DemoBeitrag[]` | – |
| `demodaten` | nein | `DemoUmsetzung[]` | Demodaten-Bausteine des Moduls (Umsetzung zum Katalog im Manifest, Besitz der Tabellen) |
| `lohnsatz` | nein | `LohnsatzQuelle[]` | – |
| `stammdatenFelder` | nein | `StammdatenFeld[]` | – |
| `fertigungsGeneratoren` | nein | `Record<string, FertigungsGenerator>` | Fertigungsgeneratoren je Fertigungsart (`fertigungsauftraege.art`) |
| `fuellungen` | nein | `FuellungsAnbieter[]` | Füllungsanbieter (Vertrag 2.0.0): Füllungspreis und -berechnung für Elemente anderer Module |
| `assistentWerkzeuge` | nein | `AssistentWerkzeugBeitrag[]` | 0.13.1: Werkzeuge für den KI-Assistenten und den KI-Zugriff (MCP) |
| `kiGlossar` | nein | `KiGlossarBeitrag[]` | 0.13.2 (Vertrag 2.1.0): Fachbegriffe für das Glossar des KI-Assistenten |
| `aufmassZiele` | nein | `AufmassZiel[]` | – |
| `freigabeRegeln` | nein | `FreigabeRegelQuelle[]` | 0.16.14 (Vertrag 2.4.0, optional): Freigabe- und Vier-Augen-Regeln für die Systemübersicht |

## Web: WebModul (`@gm/web/sdk`)

Web-Teil eines Moduls

| Feld | Pflicht | Typ | Beschreibung |
|---|---|---|---|
| `manifest` | ja | `ModulManifest` | – |
| `seiten` | ja | `Record<string, LazyExoticComponent<ComponentType>>` | Routenschlüssel des Manifests → nachgeladene Seite |
| `admin` | ja | `Record<string, WebAdminSeite \| (() => ReactNode)>` | Admin-Funktion des Moduls (unter Administration › Module › &lt;Modul>) → Inhalt |
| `icons` | ja | `Record<string, ModulIcon>` | Symbole je Funktion bzw. Menübereich des Moduls |
| `slots` | nein | `Partial<Record<WebSlot, Record<string, ComponentType<Record<string, unknown>>>>>` | – |
| `hilfe` | nein | `() => Promise<Record<string, HilfeThema>>` | Hilfeartikel des Moduls (nachgeladen) |
| `changelog` | nein | `() => Promise<readonly ModulChangelogEintrag[]>` | 0.13.1: Versionsverlauf des Moduls (eigene Versionierung), nachgeladen aus dem Subpfad `/changelog` des Kernpakets des Moduls. Der Versionsdialog zeigt ihn für installierte Module. |

## Web: Einhängepunkte (Slots)

| Slot | Props |
|---|---|
| `kunde.abschnitte` | `Record<string, never>` |
| `artikel.formular` | `{ wert: unknown; setzen: (wert: unknown) => void; offen: boolean; gueltigMelden: (gueltig: boolean) => void; }` |
| `fertigung.geometrie` | `{ daten: unknown; }` |
| `beleg.positionsHinweis` | `{ positionen: readonly unknown[]; }` |
| `beleg.quellenDialog` | `Record<string, never>` |
| `kalkulationen.quelle` | `Record<string, never>` |
| `aa.quelleDetail` | `{ aa: unknown; }` |
| `lieferant.reiter` | `{ lieferantId: string \| null; entwurf: Record<string, unknown>; setzen: (feld: string, wert: unknown) => void; }` |

## Manifest: ModulManifest (`@gm/core`)

Manifest eines Moduls (versionierter Vertrag)

| Feld | Pflicht | Typ | Beschreibung |
|---|---|---|---|
| `schluessel` | ja | `string` | – |
| `name` | ja | `string` | – |
| `version` | ja | `string` | SemVer des Moduls |
| `vertrag` | ja | `string \| number` | Benötigter Modulvertrag als Semver-Bereich, z. B. '^2.0.0' (ab 0.13.1). Die Zahl 1 (Form bis 0.13.0) gilt als '^1.0.0' und wird übergangsweise angenommen (MODUL_VERTRAG_UNTERSTUETZT). |
| `core` | ja | `string` | SemVer-Bereich der unterstützten Core-Version, z. B. '>=0.13.0 &lt;0.14.0' |
| `abhaengig` | nein | `ModulAbhaengigkeit[]` | – |
| `herausgeber` | ja | `ModulHerausgeber` | – |
| `lizenz` | ja | `{ spdx: string; hinweise?: string; }` | Lizenzvermerk je Modul (SPDX-Ausdruck bzw. 'LicenseRef-…' für proprietäre Module) |
| `verzeichnis` | ja | `ModulVerzeichnis` | – |
| `rechte` | nein | `Record<string, string>` | Recht → Klartext |
| `systemrollen` | nein | `Record<string, string[]>` | Systemrolle → zusätzliche Rechte aus diesem Modul |
| `schaltbar` | nein | `Record<string, FunktionsSchalter>` | Schaltbare Funktionen des Moduls (bisherige SCHALTBAR-Einträge) |
| `protokollAktionen` | nein | `Record<string, string>` | Klartexte der Protokollaktionen des Moduls (Audit-Protokoll, Export, Verlauf). Aktionsschlüssel sind dauerhaft gespeichert; ohne das Modul im Image erscheint der Schlüssel selbst. |
| `protokollBereiche` | nein | `Record<string, string>` | – |
| `positionstypen` | nein | `{ typ: string; label: string; fertigungsart?: string; }[]` | Positionstypen in Belegen; `fertigungsart` = Bezeichnung als Art eines Fertigungsauftrags (Auswertungen) |
| `einstellungen` | nein | `{ schluessel: string; }[]` | Einstellungsschlüssel (settings.key), die dem Modul gehören |
| `daten` | ja | `ModulDaten` | – |
| `hilfe` | nein | `string[]` | Hilfeschlüssel; die Inhalte liefert die Web- bzw. Core-Seite des Moduls |
| `demodaten` | nein | `string[]` | Schlüssel der Demodaten-Bausteine |
| `demodatenKatalog` | nein | `DemoModulDef[]` | Katalog der Demodaten-Bausteine des Moduls (Anzeige unter Administration › Demodaten, Abhängigkeiten, Tabellenbezeichnungen). Die Umsetzung (Einspielen, Vorhanden-Prüfung, Besitz der Tabellen) liefert der Server-Teil. |
| `auswertungen` | nein | `{ quellen?: string[]; vorlagen?: string[]; }` | – |
| `bestand` | nein | `ModulBestand` | Übergang: Schlüssel im Core-Verzeichnis, die diesem Modul gehören (siehe ModulBestand) |
| `zweiFaktorRechte` | nein | `string[]` | Rechte des Moduls, die für jede Rolle (auch eigene) den zweiten Anmeldefaktor erzwingen (wie ZWEI_FAKTOR_PFLICHT_RECHTE des Core). Gilt, solange das Modul verfügbar ist. |
| `beschreibung` | nein | `string` | Kurzbeschreibung für Administration › Module und die Versionsübersicht |
| `kataloge` | nein | `Partial<Record<KatalogName, Record<string, string>>>` | Einträge des Moduls in Katalogen des Core (Schlüssel → Bezeichnung), z. B. Reklamationskategorien, Maschinentypen, Benachrichtigungsarten, Etikettenarten. Schlüssel sind dauerhaft gespeichert; Core-Schlüssel haben Vorrang. |
| `qualifikationsvorlagen` | nein | `QualifikationsvorlageBeitrag[]` | Vorlagen des Qualifikationskatalogs (Personal), die das Modul beisteuert |
| `bezugswegVorlagen` | nein | `BezugswegVorlageBeitrag[]` | Vorlagen der Bezugswege für Lieferantenkataloge (Lieferanten der Branche des Moduls) |
| `artikelGrundarten` | nein | `Omit<ArtikelGrundart, 'modul'>[]` | Grundarten des Artikelstamms, die das Modul beisteuert (Verhalten im Artikelformular, Erweiterungsfeld) |

## Manifest: Verzeichnis (`ModulVerzeichnis`)

Beiträge eines Moduls zum Anwendungsverzeichnis (navigation.ts)

| Feld | Pflicht | Typ | Beschreibung |
|---|---|---|---|
| `module` | nein | `ModulMenuebereich[]` | – |
| `funktionen` | nein | `ModulFunktion[]` | – |
| `routen` | nein | `Record<string, string>` | Routenschlüssel → Seitenadresse (z. B. { kalkulator: '/kalkulator' }) |
| `entitaeten` | nein | `Record<string, ModulEntitaet>` | – |
| `protokollObjekte` | nein | `Record<string, { label: string; funktion: string; }>` | – |
| `nachfolger` | nein | `Partial<Record<'modul' \| 'funktion' \| 'entitaet' \| 'storyBereich', Record<string, string>…` | Nachfolger entfallener Schlüssel je Art (wie NACHFOLGER) |
| `nummernkreise` | nein | `Record<string, Nummernkreis>` | – |
| `ansichten` | nein | `Partial<Record<'kunde' \| 'lieferant' \| 'mitarbeiter' \| 'projekt', string[]>>` | Zusätzliche Reiter an Core-Detailseiten (z. B. { kunde: ['kalkulationen'] }) |
| `adminWeiterleitungen` | nein | `Record<string, string>` | Frühere Adressteile von Admin-Bereichen (/admin/&lt;alt>) → Funktionsschlüssel des heutigen Bereichs. Damit bleiben Lesezeichen gültig, wenn ein Modul seine Einstellungsseiten umbenennt oder zusammenlegt. |

## Manifest: Daten (`ModulDaten`)

Daten eines Moduls (Sicherung, Archiv, Deinstallation)

| Feld | Pflicht | Typ | Beschreibung |
|---|---|---|---|
| `tabellen` | ja | `string[]` | Tabellen in Fremdschlüssel-Reihenfolge (Eltern zuerst) |
| `erweiterungsspalten` | nein | `{ tabelle: string; spalte: string; }[]` | Spalten des Moduls an Core-Tabellen; sie bleiben bei der Deinstallation immer stehen |
| `migrationen` | ja | `'bestand' \| 'eigen'` | – |
| `kalkulationsunterlagen` | nein | `string[]` | Tabellen mit Kalkulationsunterlagen (Aufbewahrung 6 Jahre ab Jahresende, § 147 Abs. 1 Nr. 5 AO; Annahme). Sie sperren das Löschen der Moduldaten, solange ein Datensatz in der Frist liegt. Ohne Angabe gelten alle Tabellen als solche. |
| `bezeichnungen` | nein | `Record<string, string>` | Lesbare Bezeichnung der Tabellen (Meldungen des Core, z. B. Verweise beim Rückgängigmachen eines Imports) |
| `kundenbezug` | nein | `ModulKundenbezug[]` | Personenbezug zu Kunden (DSGVO, ab 0.13.0): Spalten der Modultabellen mit der ID eines Kunden. Der Core nimmt die Zeilen in die Auskunft nach Art. 15 auf und wendet beim Anonymisieren die Regel an: `leeren` setzt die Spalte auf NULL, `loeschen` entfernt die Zeilen. Die Angaben werden im Bestandseintrag gespeichert, damit Auskunft und Anonymisierung auch wirken, wenn das Modul im laufenden Image fehlt („nicht verfügbar“). Datenschutz-Hooks des Moduls laufen zusätzlich, solange das Modul im Image ist. |
