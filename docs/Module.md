# Module für Richtkant ERP

Richtkant ERP 0.16.9 · Modulvertrag 2.2.0 · Stand 2026-11-10
Verantwortlich: Christian Heitzer, www.heitzer.info

Entwicklerdokumentation für installierbare Module (Branchenmodule). „Richtkant Core“ ist das branchenneutrale Basis-ERP und
funktioniert ohne Module vollständig. Module ergänzen ihn über einen versionierten Vertrag ([Modul-SDK.md](Modul-SDK.md)),
werden beim Erstellen des Images eingebaut und je Instanz installiert, aktiviert, deaktiviert und deinstalliert. Fremdcode zur
Laufzeit hochzuladen oder auszuführen ist ausgeschlossen. Die Nummerierung entspricht der Herstellerdokumentation.

---

## 1. Grundsätze

- **Module nutzen nur das SDK.** Erlaubte Importflächen: `@gm/core`, `@gm/core/hilfe`, `@gm/server/sdk` (mit `@gm/server/sdk/db` für Tabellendefinitionen) und `@gm/web/sdk`. Ein Modul importiert ein anderes nur, wenn sein Manifest die Abhängigkeit erklärt.
- **Einhängen nur über deklarierte Erweiterungspunkte.** Menüeinträge, Reiter an Core-Detailseiten, Positionstypen, Katalogeinträge, Dashboard-Kacheln bzw. Berichtsquellen, Hilfe, Demodaten, Rechte, Einstellungsseite unter Administration › Module › Modul. Beim Deaktivieren bzw. Deinstallieren verschwinden alle Einhängungen; die Konformitätsprüfung beim Einbau prüft das je Modul (Entwicklung-und-Test.md, Abschnitt 2).
- **Keine Branchenbegriffe im Core.** Texte des Core (Bedienung, Hilfe, Demodaten, E-Mail- und PDF-Vorlagen) sind neutral; Branchentexte liefert das Modul.
- **Gespeicherte Schlüssel sind dauerhaft.** Positionstypen, Katalogschlüssel, Protokollaktionen und Funktionsschlüssel eines Moduls werden nie umgeschrieben. Fehlt ein Modul im Image, erscheint ein gespeicherter Schlüssel unverändert, Belege bleiben lesbar.
- **Out-of-process-fähig.** Der Vertrag ist so geschnitten, dass ein Modul später als eigener Container laufen kann: Es spricht den Core nur über SDK und Erweiterungspunkte an, nie über interne Dienste.

## 2. Paketaufbau

```
modules/<m>/core     @rk-modul/<m>-core     reine Fachlogik und Manifest (ohne Datenbank, ohne DOM), Hilfeartikel
modules/<m>/server   @rk-modul/<m>-server   ServerModul: Fastify-Plugin, Dienste, Tabellen, Demodaten, Erweiterungen
modules/<m>/web      @rk-modul/<m>-web      WebModul: Seiten (nachgeladen), Admin-Bereiche, Slots, Symbole
modules/<m>/server/drizzle                  Migrationen mit eigener Historie (Journal __drizzle_migrations_<m>)
```

Die Pakete sind npm-Workspaces der Wurzel (`package.json`, `workspaces`). Laufzeitbibliotheken (fastify, drizzle-orm, zod, react …) stellt der Core bereit; ein Modul bringt eigene Fremdabhängigkeiten nur nach Lizenzprüfung mit (Abhängigkeitsprüfung nach den Projektregeln: Lizenz, Version, Sicherheit, Wartung).

## 3. Vertrag (Manifest)

Typ `ModulManifest` in `@gm/core`, Vertragsversion `MODUL_VERTRAG_VERSION` (Semver; aktueller Stand in `docs/Modul-SDK.md`, Abschnitt 1). Das Modul erklärt in `vertrag` den benötigten Bereich (z. B. `'^2.0.0'`); die Registry prüft ihn (`vertragKompatibel`). Module mit der Altform `vertrag: 1` werden übergangsweise angenommen und als veraltet gemeldet. Regeln: `docs/Modul-SDK.md`.

| Feld | Bedeutung |
|---|---|
| `schluessel`, `name`, `version`, `vertrag`, `core` | dauerhafter Schlüssel (`[a-z][a-z0-9_]{1,31}`), Anzeigename, SemVer, benötigter Vertragsbereich (z. B. `'^2.0.0'`), benötigte Core-Version (z. B. `>=0.13.0 <0.14.0`) |
| `abhaengig` | andere Module (SemVer-Bereich, optional) |
| `herausgeber`, `lizenz` | `richtkant` oder `partner`; Lizenzvermerk (SPDX bzw. `LicenseRef-…`, Hinweise) |
| `verzeichnis` | Menübereiche, Funktionen (Menü, Seiten, Admin-Bereiche; `admin: 'Module'`), Routen, Datensätze (Permalinks), Protokollobjekte, Nachfolger, Nummernkreise, Reiter an Core-Detailseiten (`ansichten`), frühere Admin-Adressen (`adminWeiterleitungen`) |
| `rechte`, `systemrollen`, `zweiFaktorRechte` | Rechte mit Klartext, Zuordnung zu Systemrollen, Rechte mit Zwei-Faktor-Pflicht |
| `schaltbar` | Funktionsschalter des Moduls (Administration › Module › Module und Funktionen, Reiter Funktionen) |
| `protokollAktionen`, `protokollBereiche` | Klartexte des Änderungsprotokolls |
| `positionstypen` | Positionstypen in Belegen (`typ`, `label`, `fertigungsart`) |
| `kataloge` | Einträge in Katalogen des Core: `reklamationskategorien`, `maschinentypen`, `benachrichtigungsarten`, `benachrichtigungsKategorien`, `etikettenarten`, `etikettenquellen`, `etikettenStandardvorlagen`, `katalogformate`, `importarten`, `datenuebernahmeZwecke`, `artikelGrundarten` |
| `artikelGrundarten` | Grundarten des Artikelstamms mit Verhalten (Einheit, feste Einheit, Preishinweis, „kalkuliert“, Vorbelegung des Erweiterungsfelds, Schreibweisen im Import) |
| `qualifikationsvorlagen`, `bezugswegVorlagen` | Vorlagen für den Qualifikationskatalog bzw. die Bezugswege der Lieferantenkataloge |
| `einstellungen` | Einstellungsschlüssel (`settings.key`) des Moduls; Teil des Archivs, werden beim Löschen der Daten entfernt |
| `daten` | `tabellen` (Fremdschlüssel-Reihenfolge, Eltern zuerst), `erweiterungsspalten` (Spalten an Core-Tabellen, bleiben immer stehen), `migrationen` (`bestand` bzw. `eigen`), `kalkulationsunterlagen` (Tabellen mit 6-Jahres-Frist), `bezeichnungen`, `kundenbezug` (Spalten mit Kunden-ID und Regel `leeren` bzw. `loeschen` für DSGVO-Auskunft und -Anonymisierung, ab 0.13.0) |
| `hilfe`, `demodaten`, `demodatenKatalog`, `auswertungen`, `beschreibung` | Hilfeschlüssel, Demodaten-Bausteine, Berichte, Kurzbeschreibung |

Die Registry prüft Vertrag, Core-Version, Abhängigkeiten, Zyklen, Schlüsselkollisionen mit Core und anderen Modulen, Präfixe der Nummernkreise und die Auflösbarkeit aller Verweise. In der Build-Prüfung verhindert ein ungültiges Manifest den Bau (`moduleRegistrieren`); beim Start gilt ein solches Modul (und jedes Modul, dessen Pflichtvoraussetzung dadurch fehlt) als „gestört“ und wird nicht geladen, der Core und die übrigen Module starten (`moduleRegistrierenTolerant`, ab 0.13.1).

## 4. Erweiterungspunkte

**Server** (`ServerModul` in `@gm/server/sdk`): `plugin` (Routen unter `/api/v1`, gekapselt durch die Modulwache), `beimStart` (idempotent), `hintergrund` (Aufgaben, nur bei aktivem Modul), `erweiterungen` (`ErweiterungsSatz` in `@gm/server/sdk`: Positionstypen, Bedarfsquellen, Etikettenquellen, Arbeitsauftrag-Quellen, Lieferanten-Insights, Datenschutz-Hooks, Kalkulationsquellen, Artikel- und Stammdatenfelder, Preis-Stichtag, Demodaten, Lohnsatz-Vorschlag, Fertigungsgeneratoren, ab 0.13.1 Füllungen), `beiInstallation` (ab 0.13.1), `hilfe`, `migrationsOrdner` (optional), `mcp` (vorbereitet). Jeder Beitrag läuft geschützt (Fehlerisolation, `docs/Modul-SDK.md` Abschnitt 5).

**Web** (`WebModul` in `@gm/web/sdk`): `seiten` (nachgeladen je Routenschlüssel), `admin` (Inhalt je Admin-Funktion des Moduls; erscheint unter Administration › Module › Modul), `icons`, `slots` (`kunde.abschnitte`, `artikel.formular`, `fertigung.geometrie`, `beleg.positionsHinweis`, `beleg.quellenDialog`, `kalkulationen.quelle`, `aa.quelleDetail`, `lieferant.reiter`; Props in `WebSlotProps`), `hilfe`. Slots, Modulseiten und Admin-Bereiche stehen in einer Fehlergrenze (`ModulFehlergrenze`).

**Core-Kataloge** (`@gm/core`): Der Core führt nur neutrale Einträge; Module tragen ihre über das Manifest ein. Auswahllisten zeigen Core-Einträge und Einträge aktiver Module (`katalogAuswahl`, Web: `useKatalogAuswahl`, `useGrundarten`); gespeicherte Werte behalten ihre Bezeichnung.

Ein Datenschutz-Hook läuft unabhängig vom Status des Moduls, solange dessen Daten nicht gelöscht sind. Zusätzlich wendet der Core den im Manifest erklärten Personenbezug (`daten.kundenbezug`) generisch an: Die DSGVO-Auskunft enthält die Zeilen der Modultabellen mit der Kunden-ID, die Anonymisierung leert die Spalte bzw. löscht die Zeilen. Weil jeder Start mit dem Modul und jede Installation den Personenbezug im Bestandseintrag (`settings.modulsystem.bestand`) speichert, gilt das auch für Module, die im laufenden Image fehlen. Eine DSGVO-Auskunft oder -Löschung scheitert damit weder am Modulstatus noch am Programmstand.

## 5. Lebenszyklus

Zustände je Instanz (Tabelle `modul_installationen`): `verfuegbar` (im Image, keine Zeile) → `installiert_aktiv` ⇄ `installiert_inaktiv` → `deinstalliert` (Datenstatus `vorhanden`, `archiviert`, `geloescht`).

| Aktion | Endpunkt (Recht `einstellungen.verwalten`) | Wirkung |
|---|---|---|
| Übersicht | `GET /module/pakete` | Status, Version, Lizenz, Abhängigkeiten, Einstellungsbereiche, Datenumfang, Archive |
| Vorprüfung | `GET /module/pakete/:m/vorpruefung?ziel=deaktivieren\|deinstallieren` | Sperren (abhängige Module), Warnungen (Belegentwürfe, offene Fertigungs- und Arbeitsaufträge), Aufbewahrung, Bestätigungsart |
| Aktivieren / Deaktivieren | `POST /module/pakete/:m/aktivieren\|deaktivieren` | Menü, Seiten, Admin-Bereiche, Hilfe, Aufgaben erscheinen bzw. verschwinden; Daten bleiben |
| Deinstallieren | `POST /module/pakete/:m/deinstallieren` `{ bestaetigung, passwort, code?, datenLoeschen }` | Pflicht-Archiv, Status `deinstalliert`; optional Daten löschen (nur ohne Aufbewahrungssperre, sonst 409 und keine Änderung) |
| Daten löschen | `POST /module/pakete/:m/daten-loeschen` `{ bestaetigung, passwort, code? }` | neues Archiv, Leeren der Tabellen bzw. Entfernen des eigenen Schemas |
| Installieren | `POST /module/pakete/:m/installieren` `{ archivId? }` | Lizenz und Abhängigkeiten, Migrationen, optional Wiederherstellung aus dem Archiv (Prüfsummen, nur leere Tabellen), Startaufgabe |
| Archive | `GET /module/pakete/:m/archive`, `GET /module/archive/:id/datei` | Liste bzw. Download (ZIP) |

Bestätigung: Modulname, Kennwort und – falls eingerichtet – Code der Authenticator-App; Konten mit Microsoft-Anmeldung bestätigen über die dortige Mehrfaktor-Anmeldung. Alle Aktionen stehen im Änderungsprotokoll (`modul.aktiviert`, `modul.deaktiviert`, `modul.archiviert`, `modul.deinstalliert`, `modul.installiert`, `modul.wieder_installiert`, `modul.daten_geloescht`, `modul.archiv_heruntergeladen`).

**Wache.** Jede Route eines Modul-Plugins antwortet bei nicht installiertem Modul mit `403 MODUL_NICHT_INSTALLIERT`, bei inaktivem bzw. nicht lizenziertem mit `403 MODUL_NICHT_AKTIV` (lesende Zugriffe auf Pfade, die ein Schalter nur schreibend sperrt, bleiben erlaubt). Die Wache läuft vor Validierung und Rechteprüfung.

**Oberfläche.** Administration › Module › Module und Funktionen (Reiter „Module“ für den Lebenszyklus, Reiter „Funktionen“ für die Schalter). Die Einstellungen eines installierten Moduls stehen unter Administration › Module › Modul. Die Fachbereiche des Core (Vertrieb, Material, Personal …) stehen in der Gruppe „Fachbereiche“.

## 7. Migrationen

- `daten.migrationen = 'eigen'`: Ordner `modules/<m>/server/drizzle` mit `meta/_journal.json`, eigene Konfiguration `modules/<m>/server/drizzle.config.ts` (Schema `src/db/eigen.ts`, Journal `drizzle.__drizzle_migrations_<m>`), Erzeugen mit `npm run db:generate -w @rk-modul/<m>-server`. Ausführung beim Start nach dem Core in Abhängigkeitsreihenfolge, nur für installierte Module, sowie bei der Installation. Im Image liegen die Ordner unter `/app/modules/<m>/server/drizzle`; `RICHTKANT_MODULE_DIR` übersteuert die Wurzel.
- Regel: Modultabellen dürfen auf Core-Tabellen verweisen, niemals umgekehrt. Migrationen sind handgeschrieben und geprüft, additiv und bewahren Kundendaten.
