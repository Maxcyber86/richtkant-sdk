# Richtkant Modul-SDK

Entwickler-Repository für **Richtkant ERP**: Typdeklarationen der Modul-Schnittstelle, Dokumentation des Modulvertrags,
die Beschreibung der öffentlichen API und ein vollständiges Beispielmodul.

Stand: Richtkant Core **0.16.7** · Modulvertrag **2.2.0** · öffentliche API **/api/v1** · 2026-11-08

## Was ist Richtkant?

Richtkant ERP ist eine Unternehmenssoftware für Handwerk und Fertigung (Angebot, Auftrag, Rechnung, Einkauf, Lager,
Einsatzplanung, Personal, Projekte, Fertigung). Jeder Kunde erhält eine eigene, isolierte Instanz. Die Anwendung besteht aus dem
branchenneutralen **Richtkant Core** und **Modulen**, die ihn für eine Branche oder einen Zweck erweitern. Core und die
Branchenmodule des Herstellers sind proprietär und nicht Teil dieses Repositorys.

## Wofür dieses SDK gedacht ist

Das SDK ist ausschließlich für **Erweiterungen von außen** gedacht:

- **zusätzliche Module** anderer Herausgeber, die sich über die vorgesehenen Erweiterungspunkte einhängen,
- **kundenspezifische Anpassungen** als eigenes Modul,
- **Anbindungen** anderer Systeme (Shop, Zeiterfassung, Lohn, Großhandel, Auswertungen) über die öffentliche API.

Es dient **nicht** dazu, Richtkant selbst weiterzuentwickeln: Änderungen am Core oder an den Branchenmodulen des Herstellers
sind über dieses Repository nicht möglich und nicht vorgesehen. Beschrieben ist nur die öffentliche Modul- und
API-Schnittstelle, nicht der innere Aufbau der Anwendung.

## Was kann ein Modul?

Ein Modul spricht den Core ausschließlich über den versionierten Modulvertrag an und kann unter anderem:

- eigene Seiten, Menüpunkte, Rechte, Hilfeartikel, Demodaten und Einstellungsbereiche beitragen,
- eigene Tabellen mit eigener Migrationshistorie anlegen (Verweise nur auf Tabellen des Core),
- eigene Routen unter `/api/v1` anbieten (automatisch mit Modulwache, Rechteprüfung und OpenAPI-Beschreibung),
- sich an Erweiterungspunkten des Core einhängen: Positionstypen in Belegen, Kalkulationsquellen, Bedarfsquellen für den
  Einkauf, Etiketten, Arbeitsaufträge, Fertigungsgeneratoren, Füllungen, Artikel- und Stammdatenfelder, Datenschutz-Hooks,
  Werkzeuge für den KI-Assistenten, Fachbegriffe, Einhängepunkte in Seiten des Core.

Ein Modul darf **nicht**: Quelltext, Tabellen oder interne Dienste des Core bzw. anderer Module verwenden oder ändern (nur die
Importflächen `@gm/core`, `@gm/core/hilfe`, `@gm/server/sdk`, `@gm/server/sdk/db`, `@gm/web/sdk` und die eigenen Pakete),
Tabellen des Core per Migration ändern (eigene Tabellen dürfen auf Tabellen des Core verweisen, nie umgekehrt), Verhalten des
Core außerhalb der Erweiterungspunkte verändern, Rechteprüfung, Modulwache oder Kundenansicht umgehen, Code zur Laufzeit
nachladen. Ein Modul eines anderen Herausgebers importiert ein Modul des Herstellers nicht direkt; Zusammenarbeit läuft über
Erweiterungspunkte (z. B. Füllung).

Module werden beim Erstellen des Images eingebaut und je Instanz installiert, aktiviert, deaktiviert und deinstalliert.
Fremdcode zur Laufzeit hochzuladen oder auszuführen ist ausgeschlossen. Ein Fehler in einem Modul stört den Core nicht
(Fehlerisolation).

## Inhalt

| Pfad | Inhalt |
|---|---|
| [docs/Modul-SDK.md](docs/Modul-SDK.md) | Modulvertrag: Versionierung, Kompatibilität, alle Erweiterungspunkte, Fehlerisolation, Konformität |
| [docs/Module.md](docs/Module.md) | Paketaufbau, Manifest, Lebenszyklus, Migrationen |
| [docs/Erweiterungspunkte.md](docs/Erweiterungspunkte.md) | Referenz aller Felder und Erweiterungspunkte (aus den Typen erzeugt) |
| [docs/Oeffentliche-API.md](docs/Oeffentliche-API.md) | Öffentliche API: Zugang, Sperren, Fehler, Versionierung |
| [docs/Entwicklung-und-Test.md](docs/Entwicklung-und-Test.md) | Entwickeln, prüfen, testen, einreichen |
| [openapi/openapi.json](openapi/openapi.json) | OpenAPI-3-Beschreibung der öffentlichen API (Core ohne Module) |
| [packages/modul-sdk](packages/modul-sdk) | Typdeklarationen der Importflächen `@gm/core`, `@gm/core/hilfe`, `@gm/server/sdk`, `@gm/server/sdk/db`, `@gm/web/sdk` |
| [beispiel-modul](beispiel-modul) | Beispielmodul „Prüfpunkte“ (Kern, Server, Oberfläche, Hilfe, Demodaten, Migration, Tests) |
| [CHANGELOG.md](CHANGELOG.md) | Versionen von Core, Modulvertrag und API |

## Wie fange ich an?

Voraussetzung: Node.js 22 (ab 22.12) und npm.

```bash
npm install          # Typen der Laufzeitbibliotheken (fastify, drizzle-orm, zod, react …) und Werkzeuge
npm run typecheck    # Beispielmodul gegen die Typdeklarationen des SDK prüfen
npm test             # Fachtests des Beispielmoduls (laufen ohne Richtkant Core)
```

Danach das Beispielmodul kopieren, Schlüssel und Namen ändern (Schlüssel sind dauerhaft) und die Checkliste in
[docs/Entwicklung-und-Test.md](docs/Entwicklung-und-Test.md) abarbeiten. Für die öffentliche API reichen ein API-Zugang der
Instanz und [docs/Oeffentliche-API.md](docs/Oeffentliche-API.md).

## Kompatibilität und Versionen

- **Modulvertrag** (Semver, derzeit 2.2.0): Ein Modul erklärt in `manifest.vertrag` den benötigten Bereich (z. B.
  `^2.2.0`) und in `manifest.core` die unterstützten Versionen des Core (z. B. `>=0.16.7 <0.17.0`). Innerhalb einer
  Hauptversion des Vertrags kommt nur hinzu; Entfallendes wird vorher angekündigt ([Modul-SDK.md](docs/Modul-SDK.md), Abschnitt 2).
- **Öffentliche API** `/api/v1`: abwärtsverträglich; eine unverträgliche Änderung käme unter `/api/v2` mit mindestens zwölf
  Monaten Parallelbetrieb.
- Dieses Repository wird bei jedem Release des Core neu erzeugt; die Version des Core steht oben und in
  [sdk-stand.json](sdk-stand.json).

## Lizenz

Apache License 2.0 ([LICENSE](LICENSE), [NOTICE](NOTICE)) **nur** für den Inhalt dieses Repositorys: Typdeklarationen der
öffentlichen Schnittstelle, Beispielmodul, Dokumentation und OpenAPI-Beschreibung. Richtkant selbst (Core und die
Branchenmodule des Herstellers) bleibt proprietär und ist nicht Teil dieses Repositorys; für Nutzung und Betrieb von Richtkant
gelten die Verträge mit dem Hersteller.

## Kontakt

Christian Heitzer · [www.heitzer.info](https://www.heitzer.info) · Sicherheitslücken bitte nur über den Weg in
[SECURITY.md](SECURITY.md) melden.
