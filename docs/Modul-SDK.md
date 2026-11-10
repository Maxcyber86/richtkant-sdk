# Modul-SDK und Modulvertrag 2.2.0

Richtkant ERP 0.16.9 · Modulvertrag 2.2.0 · Stand 2026-11-10
Verantwortlich: Christian Heitzer, www.heitzer.info

Versionierter Vertrag zwischen Richtkant Core und Modulen: Versionierung, Abwärtskompatibilität und Deprecation, die vollständige
Liste der Erweiterungspunkte und die Fehlerisolation. Paketaufbau, Manifest, Lebenszyklus und Migrationen:
[Module.md](Module.md); Typen je Erweiterungspunkt: [Erweiterungspunkte.md](Erweiterungspunkte.md); Entwickeln und Testen:
[Entwicklung-und-Test.md](Entwicklung-und-Test.md) (dort auch, was der Hersteller beim Einbau prüft). Die Nummerierung entspricht
der Dokumentation des Herstellers; Abschnitte zur internen Entwicklung sind nicht enthalten.

---

## 1. Vertrag und Versionierung

- **Vertragsversion des Core:** `MODUL_VERTRAG_VERSION = '2.2.0'` (ab 0.14.0; `@gm/core`, Semantic Versioning).
- **Anforderung des Moduls:** `manifest.vertrag` ist ein Semver-Bereich, in der Regel `'^2.0.0'` (Minor- und Patch-Versionen des Vertrags 2 sind zulässig). Ein Modul, das einen erst mit 2.1.0 eingeführten Punkt nutzt, erklärt `'^2.1.0'`; ein Core mit 2.0.0 lehnt es dann ab.
- **Prüfung:** `vertragKompatibel(anforderung)` (Registry). Kompatibel, wenn `MODUL_VERTRAG_VERSION` den Bereich erfüllt. Unterstützte ältere Hauptversionen (`MODUL_VERTRAG_UNTERSTUETZT`, derzeit `[1, 2]`) werden zusätzlich angenommen; sie stehen in `MODUL_VERTRAG_VERALTET` und erzeugen einen Hinweis (`VERTRAG_VERALTET`, sichtbar in `GET /module/pakete` als `hinweise`), keinen Fehler.
- **Abbildung der Altform:** Die bis 0.13.0 übliche Zahl `vertrag: 1` gilt als `'^1.0.0'`; eine einfache Version wie `'2.0.0'` gilt als `'^2.0.0'`.
- **Bereichsangaben:** `>=`, `>`, `<=`, `<`, `=`, durch Leerzeichen verknüpft, Alternativen mit `||` sowie die Kurzformen `^x.y.z` und `~x.y.z` (Semver-Regeln, auch für `0.y.z`).
- **Weitere Versionen:** `manifest.version` (Semver des Moduls, gleich der Version in den drei `package.json` des Moduls; Regeln für Patch, Minor und Major in Abschnitt 10), `manifest.core` (benötigte Core-Version, z. B. `'>=0.13.0 <0.14.0'`), `abhaengig[].version` (Version eines anderen Moduls).

| Änderung am Vertrag | Version |
|---|---|
| Neuer Erweiterungspunkt, neues optionales Feld in Manifest, `ServerModul`, `WebModul` oder einem Beitrag, neue optionale Slot-Prop, neuer SDK-Export | Minor (2.x.0) |
| Klarstellung in Dokumentation oder Typkommentar ohne Formänderung | Patch (2.0.x) |
| Entfernen oder Umbenennen eines Punkts, Exports oder Felds, neues Pflichtfeld, geänderte Signatur oder Bedeutung | Major (3.0.0) |

**Was 2.2.0 gegenüber 2.1.0 ändert (0.14.0, Minor, abwärtskompatibel):** neue SDK-Exporte für die Bestätigung per Passkey: `mitPasskeyBestaetigt` (`@gm/server/sdk`, prüft ein einmaliges Bestätigungstoken je Person, Sitzung und Zweck) sowie `PasskeyBestaetigenKnopf`, `OderKennwort`, `passkeyBestaetigungHolen` und `useBestaetigungsArten` (`@gm/web/sdk`). Außerdem: optionales Feld `unter` an Funktionen im Verzeichnis (Einordnung als Unterpunkt eines Menüeintrags statt `menue: true`, z. B. `unter: 'vertrieb.kalkulationen'`) und der Server-Erweiterungspunkt `aufmassZiele` (Übernahme einer Aufmaßposition aus dem Einsatz in die Kalkulation des Moduls). Module, die einen dieser Punkte nutzen, erklären `vertrag: '^2.2.0'`; Module mit `'^2.0.0'` bzw. `'^2.1.0'` laufen unverändert weiter.

**Was 2.1.0 gegenüber 2.0.0 ändert (0.13.2, Minor, abwärtskompatibel):** neuer Erweiterungspunkt `kiGlossar` (Fachbegriffe für das Glossar des KI-Assistenten, Abschnitt 3); Typen `KiGlossarBeitrag` (Server-SDK) und `KiGlossarEintrag` (`@gm/core`). Module, die den Punkt nutzen, erklären `vertrag: '^2.1.0'`; Module mit `'^2.0.0'` laufen unverändert weiter.

**Was 2.0.0 gegenüber 1 ändert:** `vertrag` als Semver-Bereich (Typ `string | number`), Erweiterungspunkt `fuellungen`, `ServerModul.beiInstallation`, typisierte Slot-Props (`WebSlotProps`), Fehlerisolation (Abschnitt 5), Status `gestoert`, `DemoModulDef.abhaengigOptional`, tolerante Registrierung beim Start. Alle Punkte von Vertrag 1 bestehen unverändert; Module mit Vertrag 1 laufen daher weiter (veraltet).

## 2. Abwärtskompatibilität und Deprecation

1. **Additiv innerhalb einer Hauptversion.** Bestehende Punkte, Felder, SDK-Exporte (`@gm/server/sdk`, `@gm/server/sdk/db`, `@gm/web/sdk`, `@gm/core`) und gespeicherte Schlüssel bleiben in Form und Bedeutung erhalten.
2. **Deprecation.** Ein Punkt bzw. Export, der entfallen soll, wird im Typkommentar mit `@deprecated` und Nachfolger gekennzeichnet, in dieser Datei und im Changelog angekündigt und bleibt mindestens bis zur übernächsten Minor-Version des Core (z. B. angekündigt in 0.13.x, frühestens entfernt in 0.15.0) und nur mit einer neuen Hauptversion des Vertrags entfernt.
3. **Ältere Hauptversion.** Nach einem Major-Wechsel nimmt der Core Module der vorigen Hauptversion an, solange sie in `MODUL_VERTRAG_UNTERSTUETZT` steht (Hinweis „veraltet“). Das Ende der Unterstützung wird wie unter 2. angekündigt.
4. **Gespeicherte Schlüssel** werden nie umgeschrieben. Neue Bedeutungen erhalten neue Felder.

**Derzeit angekündigte Deprecations**

| Punkt | Nachfolger | Ende frühestens |
|---|---|---|
| Vertrag 1 (`vertrag: 1`) | `vertrag: '^2.0.0'` | 0.15.0 |

## 3. Erweiterungspunkte (vollständige Liste)

Alle Typen sind im SDK exportiert. Ein Beitrag zählt nur, solange sein Modul wirksam aktiv ist (installiert, aktiv, lizenziert, nicht gestört); Ausnahme siehe Datenschutz-Hooks.

**Server: `ServerModul`** (`@gm/server/sdk`)

| Feld | Zweck |
|---|---|
| `manifest` | Vertrag (siehe `docs/Module.md` Abschnitt 3) |
| `plugin` | Routen unter `/api/v1`, gekapselt durch Modulwache und Plugin-Hülle |
| `beimStart(ctx)` | idempotente Startaufgabe (nur aktive Module) |
| `beiInstallation(ctx, { erstinstallation, archivId })` | 2.0.0: einmalig bei der Installation, z. B. Vorgabedaten |
| `hintergrund[]` | wiederkehrende Aufgaben (`name`, `intervallMs`, `funktion?`, `run`) |
| `erweiterungen` | `ErweiterungsSatz` (unten) |
| `hilfe` | Hilfeartikel des Moduls |
| `migrationsOrdner` | eigener Migrationsordner (`daten.migrationen = 'eigen'`) |
| `mcp` | vorbereitet (ungenutzt; Werkzeuge über den Erweiterungspunkt `assistentWerkzeuge`) |

**Server: `ErweiterungsSatz`** (`@gm/server/sdk`)

| Punkt | Typ | Aufrufstelle im Core |
|---|---|---|
| `positionstypen` | `PositionstypErweiterung` | Belege: EK je Stück, Position aus Kalkulation, Demo-Sperre, Angebotsbetreff |
| `bedarfsQuellen` | `BedarfsQuelle` | Einkauf, Bestellvorschlag, Material bestellen |
| `etikettenQuellen` | `EtikettenQuelle` | Etiketten zu Kalkulation bzw. Auftrag |
| `aaQuellen` | `AaQuelle` | Arbeitsaufträge: Material, Maße, Schritte, Detail, Blatt, Zeichnung |
| `insightQuellen` | `InsightQuelle` | Lieferanten-Kennzahlen |
| `datenschutzHooks` | `DatenschutzHook` | DSGVO-Anonymisierung (läuft unabhängig vom Status, solange Daten vorhanden) |
| `kalkulationsQuellen` | `KalkulationsQuelle` | Kunde › Kalkulationen, Kalkulationsliste, Übernahme in Belege |
| `artikelErweiterungen` | `ArtikelErweiterung` | Artikel anlegen/ändern, Stammdatenimport |
| `stammdatenFelder` | `StammdatenFeld` | Erweiterungsfelder an Artikel und Lieferant |
| `preisStichtag` | `PreisStichtagBeitrag` | täglicher Preis-Stichtag |
| `demoBeitraege` | `DemoBeitrag` | Inhalte in Core-Demobausteinen |
| `demodaten` | `DemoUmsetzung` | Demodaten-Bausteine des Moduls |
| `lohnsatz` | `LohnsatzQuelle` | Vorschlag Stundensatz in Belegen |
| `fertigungsGeneratoren` | `Record<string, FertigungsGenerator>` | Fertigung: Geometrie, NC-Programm |
| `fuellungen` | `FuellungsAnbieter` | 2.0.0: Füllungen von Elementen (Abschnitt 4) |
| `assistentWerkzeuge` | `AssistentWerkzeugBeitrag` | 0.13.1: Werkzeuge für KI-Assistent und KI-Zugriff (MCP); nur bei aktivem Modul, mit Rechteprüfung, Positivliste der Schnittstellenaufrufe (`routen`), schreibende Werkzeuge liefern einen Plan (`planen`), ausgeführt wird erst nach Bestätigung durch den Core |
| `kiGlossar` | `KiGlossarBeitrag` (`modul`, `titel`, `eintraege: { begriff, erklaerung }[]`) | 2.1.0: Fachbegriffe für das Glossar im festen Anfang jeder Anfrage des KI-Assistenten (nach den Systemregeln, vor dem Werkzeugkatalog); nur aktive Module; reine Daten. Grenzen: Begriff bis 60, Erläuterung bis 400 Zeichen, höchstens 150 Einträge je Modul; ungültige Einträge entfallen, doppelte Begriffe zählen einmal. Ausgabe stabil: Core zuerst, Module nach Schlüssel, Begriffe nach Codepunkt sortiert (bitgleich zwischen Anfragen). Inhalte knapp und fachlich belegt (Norm bzw. Fundstelle), nichts Unbelegtes. B. |

Katalogarten, Importadapter und Laufzwecke registrieren Module beim Laden über `katalogArtRegistrieren`, `importAdapterRegistrieren`, `laufZweckRegistrieren` (SDK).

**Web: `WebModul`** (`@gm/web/sdk`): `seiten` (je Routenschlüssel, nachgeladen), `admin` (je Admin-Funktion), `icons`, `slots`, `hilfe`, `changelog` (Abschnitt 10). Bausteine der Oberfläche kommen ausschließlich aus `@gm/web/sdk`, darunter ab 0.13.1 `Tooltip` und `useTooltip` sowie `IconButton`/`Button` mit Prop `tooltip` und `ModulFehlergrenze`. Slots mit Props (`WebSlotProps`, Komponente `WebSlotKomponente<S>`):

| Slot | Props | Schlüssel des Beitrags |
|---|---|---|
| `artikel.formular` | `wert`, `setzen(wert)`, `offen`, `gueltigMelden(gueltig)` | Grundart |
| `fertigung.geometrie` | `daten` | Fertigungsart |
| `beleg.positionsHinweis` | `positionen` | beliebig |
| `aa.quelleDetail` | `aa` | beliebig |
| `lieferant.reiter` | `lieferantId`, `entwurf`, `setzen(feld, wert)`; statische Angaben `reiter: WebReiterAngaben` an der Komponente | Reiter |
| `kunde.abschnitte`, `beleg.quellenDialog`, `kalkulationen.quelle` | reserviert (keine Aufrufstelle) | – |

**Core-Kataloge und Manifest** (`@gm/core`): Katalogeinträge (`kataloge`: Reklamationskategorien, Maschinentypen, Benachrichtigungsarten und -kategorien, Etikettenarten, -quellen und -standardvorlagen, Katalogformate, Importarten, Datenübernahme-Zwecke, Grundarten), `artikelGrundarten`, `qualifikationsvorlagen`, `bezugswegVorlagen`, `positionstypen`, `verzeichnis` (Menü, Funktionen, Routen, Datensätze, Protokollobjekte, Nummernkreise, Reiter an Core-Detailseiten, Admin-Weiterleitungen), `rechte`, `systemrollen`, `zweiFaktorRechte`, `schaltbar`, `protokollAktionen`, `protokollBereiche`, `einstellungen`, `daten`, `hilfe`, `demodaten`, `demodatenKatalog` (mit `abhaengigOptional`, 2.0.0), `auswertungen`.

**Werte aus Modulen in der Datenbank:** Grundarten der Artikelarten, Formate der Importprofile, Zwecke der KI-Datenübernahme und Quellen der Arbeitsaufträge prüft die Datenbank nur noch auf ihre Form; welche Werte zulässig sind, entscheidet die Anwendung über Core und Modulregister. Ein neues Modul kann damit eigene Werte beitragen, ohne dass der Core geändert wird.

## 4. Erweiterungspunkt Füllung

Damit kein Modul ein anderes voraussetzt, rechnet der Verbraucher nur über den Core:

- **Verbraucher:** `fuellungsAuswahl(db)` liefert die aktiven Anbieter und wählbare Artikel; `fuellungVorbereiten(db, artikel, { standardGewichtKgM2 })` liefert einen synchronen `FuellungsRechner`; manuell erfasste Füllungen rechnet `fuellungFrei({ bezeichnung, preisM2Cent, gewichtKgM2, dickeMm? })`.
- **`FuellungsRechner`** (`@gm/core`): `art`, `artikelId`, `lieferantId`, `bezeichnung`, `gewichtKgM2`, `merkmale`, `ekProM2Cent`, `teil({ breite, hoehe, bezeichnung })` → `{ flaecheM2, ekCent, vollstaendig, befunde }`, `spezifikation({ breite, hoehe })` (Bestellangabe), `hinweise({ elementtyp, tuer })`.
- **Anbieter:** `FuellungsAnbieter` mit `art`, `label`, `zustaendig(artikel)`, `vorbereiten(db, artikel)`, `auswahl(db, limit)`.
- **Rückfall des Core (ohne zuständigen Anbieter):** Preis je m² (Einheit m²) bzw. je Stück (Einheit Stk) aus Artikel bzw. gewählter Bezugsquelle, kein Preis bei anderen Einheiten (Hinweis `FUELLUNG_EINHEIT`), Gewicht aus der Einstellung des Verbrauchers bzw. 25 kg/m², Hinweis `FUELLUNG_ANGABEN` (Anforderungen an Verletzungs-, Absturz- und Wärmeschutz selbst prüfen).

## 5. Fehlerisolation

Ein Fehler in einem Modul darf den Core nicht stören.

| Stelle | Verhalten |
|---|---|
| Manifest ungültig bzw. Pflichtvoraussetzung fehlt | Modul „gestört“ (nicht registriert), Core und übrige Module starten |
| Plugin lässt sich nicht einrichten (auch verschachtelt) | Modul „gestört“; seine Routen antworten `503 MODUL_GESTOERT` |
| Migration des Moduls scheitert | Modul „gestört“, Daten unverändert |
| Startaufgabe (`beimStart`) scheitert | Modul „gestört“ bis zum nächsten Start |
| Programmfehler in einem Beitrag (TypeError u. ä.) | Protokoll, Antwort `500 MODUL_FEHLER` mit verständlicher Meldung; Core antwortet weiter |
| Beitrag antwortet nicht | nach 30 s `504 MODUL_ZEITUEBERSCHREITUNG` (nicht für Datenschutz-Hooks, Demodaten und Preis-Stichtag, die in Transaktionen bzw. bewusst lange laufen) |
| Fachlicher Fehler eines Beitrags (HttpError, Fehler mit `statusCode`/`code`, eigene Fehlerklassen wie EinkaufError) | unverändert weitergereicht |
| Hintergrundaufgabe scheitert | Protokoll, nächster Lauf wie geplant |
| Web: Slot-Beitrag, Modulseite, Admin-Bereich, Lieferanten-Reiter wirft beim Anzeigen | Hinweis „Das Modul … konnte diesen Bereich nicht anzeigen“ mit „Erneut versuchen“; Seite, Navigation und andere Module bleiben bedienbar |

Ein gestörtes Modul ist wirksam nicht aktiv; `modul_installationen`, Tabellen und Einstellungen bleiben unverändert. Ein Neustart (z. B. mit korrigiertem Image) prüft erneut. Zähler der abgefangenen Fehler je Modul: `modulFehlerStand()`.

## 10. Changelog und Versionierung je Modul

- Jedes Modul hat eine eigene Version nach SemVer, unabhängig vom Core: gleich in `manifest.version` und den `package.json` von `core`, `server` und `web` (Prüfung beim Bau und in der Konformitätssuite). Interne Abhängigkeiten zwischen den Paketen eines Moduls nennen dieselbe Version.
- **Patch:** Fehlerbehebung ohne Änderung von Schnittstellen, Daten oder Abhängigkeiten. **Minor:** neue Funktionen, neue Migrationen (additiv) oder eine geänderte Kompatibilitätsaussage, die bestehende Instanzen nicht bricht (z. B. eine entfallene Abhängigkeit). **Major:** inkompatible Änderung an Daten, Schlüsseln oder Verhalten, die eine Migration oder Entscheidung beim Kunden verlangt.
- Versionsverlauf in `modules/<m>/core/src/changelog.ts` (`<M>_CHANGELOG: ModulChangelogEintrag[]`, Typ in `@gm/core`; Felder `version`, `datum`, `titel`, `neu`, `verbessert`, `behoben`, `betrieb?`, `benoetigtCore?`), Export über den Subpfad `@rk-modul/<m>-core/changelog`, im Web-Teil als `changelog: () => import(…)` (nachgeladen). Der Versionsdialog zeigt den Verlauf des Core und der installierten Module.
