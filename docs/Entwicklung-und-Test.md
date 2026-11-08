# Entwicklung und Test eines Moduls

Richtkant ERP 0.16.7 · Modulvertrag 2.2.0 · Stand 2026-11-08
Verantwortlich: Christian Heitzer, www.heitzer.info

## 0. Abgrenzung

Dieses SDK ist für Erweiterungen von außen: zusätzliche Module über die vorgesehenen Erweiterungspunkte, kundenspezifische
Anpassungen als eigenes Modul und Anbindungen über die öffentliche API. Es ist nicht dafür da, Richtkant selbst (Core,
Branchenmodule des Herstellers) weiterzuentwickeln; deren Quelltext, Aufbau und Entwicklungsabläufe sind nicht Teil des SDK.

| Ein Modul darf | Ein Modul darf nicht |
|---|---|
| eigene Seiten, Menüpunkte, Rechte, Hilfe, Demodaten, Einstellungen und Routen unter `/api/v1` beitragen | Quelltext, interne Dienste oder Typen des Core bzw. anderer Module verwenden (nur die Importflächen des SDK) |
| eigene Tabellen mit eigener Migrationshistorie anlegen, mit Verweisen auf Stammdaten des Core | Tabellen des Core ändern oder anlegen lassen; Fremdschlüssel von Core-Tabellen auf Modultabellen |
| sich an den Erweiterungspunkten und Einhängepunkten des Core beteiligen | Verhalten des Core außerhalb der Erweiterungspunkte ändern, Rechteprüfung, Modulwache oder Kundenansicht umgehen |
| Stammdaten des Core lesen (`customers`, `suppliers`, `articles`, `users` aus `@gm/server/sdk/db`) | Daten anderer Module lesen oder schreiben; gespeicherte Schlüssel umbenennen |
| eigene Fremdabhängigkeiten nach Lizenz- und Sicherheitsprüfung mitbringen | Code zur Laufzeit nachladen oder ausführen |

## 1. Was mit diesem Repository allein geht

| Schritt | Befehl | Ohne Richtkant Core? |
|---|---|---|
| Typprüfung des Moduls gegen den Modulvertrag (alle drei Pakete) | `npm run typecheck` | ja |
| Fachtests der reinen Logik (`core/test`) | `npm test` | ja |
| Migration erzeugen | `npx drizzle-kit generate` im Server-Paket (vorher `drizzle-kit` installieren) | ja, ohne Datenbank; danach von Hand prüfen |
| Konformitätssuite gegen den Vertrag (Manifest, Registrierung, Migrationen, Hilfe, Versionsverlauf, Laufzeit) | `server/test/konformitaet.test.ts` | **nein** |
| Modul in einer laufenden Instanz ausprobieren (Seiten, Routen, Demodaten) | – | **nein** |

Die Typdeklarationen in `packages/modul-sdk` beschreiben die Importflächen `@gm/core`, `@gm/core/hilfe`, `@gm/server/sdk`,
`@gm/server/sdk/db` und `@gm/web/sdk` vollständig; sie enthalten keinen ausführbaren Code. Die Zuordnung der Importnamen auf
die Deklarationen steht in `tsconfig.base.json` (`paths`). Laufzeitbibliotheken (fastify, drizzle-orm, zod, react,
@tanstack/react-query, lucide-react) stellt in der Instanz der Core bereit; im Modul stehen sie nur als `peerDependencies`.

OFFEN: Eine Testumgebung, in der externe Entwickler die Konformitätssuite und das Modul gegen einen laufenden Core ausführen
(z. B. ein Container mit Richtkant Core und dem Modul-Testkit), gibt es noch nicht. Bis dahin prüft der Hersteller eingereichte
Module in seiner Testumgebung; die Ergebnisse (Konformitätssuite, Modulsuite, Integrationsrauchtest) gehen an den Herausgeber
zurück. Anfrage über www.heitzer.info.

## 2. Was der Hersteller beim Einbau prüft

Ein Modul kommt nur beim Bau in ein Image (kein Hochladen zur Laufzeit). Vor dem Einbau laufen:

1. **Konformitätssuite** (Modulvertrag, [Modul-SDK.md](Modul-SDK.md)): Manifest gültig und gleich in Kern-,
   Server- und Web-Teil; Versionen in Manifest und den drei `package.json` gleich; Vertrags- und Core-Bereich erfüllt;
   registrierbar ohne Kollision; Migrationen vollständig und nur mit Verweisen auf eigene oder Core-Tabellen; jeder
   Hilfeschlüssel mit Artikel; Versionsverlauf absteigend mit der Modulversion zuerst; Slots, Seiten und Admin-Bereiche nur an
   erklärten Stellen; Laufzeit: Installation, Aktivieren, Deaktivieren (`403 MODUL_NICHT_AKTIV`), Deinstallieren mit Archiv
   (`403 MODUL_NICHT_INSTALLIERT`), Wiederherstellen, Image-Wechsel ohne das Modul und zurück.
2. **Modulsuite:** die Tests der Modulpakete (Skript `test` in `core`, `server`, `web`).
3. **Integrationsrauchtest:** Core mit dem Modul und seinen Pflichtabhängigkeiten (Gesundheit, Anmeldung, Versions-API,
   Installation, Menüdaten).
4. **Architektur- und Textprüfungen:** nur Importe aus den SDK-Flächen, Rechteprüfung jeder Route, Tooltip an Symbolknöpfen,
   Fehlercodes und Protokoll-Klartexte.
5. **Lizenz- und Abhängigkeitsprüfung** jeder eigenen Fremdabhängigkeit (Lizenz, Version, Sicherheit, Wartung) und eine SBOM des
   Moduls. GPL, AGPL und unklare Lizenzen werden gesondert geprüft.
6. **Barrierefreiheit** der Oberfläche nach WCAG 2.2 Stufe AA (Tastatur, sichtbarer Fokus, Beschriftungen, Kontrast, Zielgrößen
   24 px, Zoom, Screenreader) in Desktop- und Mobilansicht.

## 3. Checkliste für ein neues Modul

1. `beispiel-modul` kopieren; Paketnamen `@rk-modul/<schluessel>-core|server|web`, Schlüssel `[a-z][a-z0-9_]{1,31}`,
   dauerhaft eindeutig. `herausgeber: 'partner'`, Lizenzvermerk (`lizenz.spdx`), `vertrag` und `core` setzen.
2. Funktionen, Routen, Rechte, Hilfe, Demodaten, Protokollaktionen und gegebenenfalls Katalogeinträge im Manifest erklären.
   Jede Funktion braucht einen Hilfeartikel mit ihrem Schlüssel; jede Funktion hat Demodaten.
3. Server nur über `@gm/server/sdk`, Oberfläche nur über `@gm/web/sdk`, Typen und Hilfsfunktionen über `@gm/core`.
   Kein Zugriff auf interne Dienste des Core.
4. Tabellen mit eigener Migrationshistorie (`daten.migrationen: 'eigen'`, Ordner `server/drizzle`); `daten.tabellen` in
   Fremdschlüssel-Reihenfolge; jeder Kundenbezug in `daten.kundenbezug` (DSGVO-Auskunft und -Anonymisierung).
   Migrationen nur additiv; Kundendaten nie verändern.
5. Jede Route mit `requirePermission(…)` und `schema` (zod) inklusive `tags`; Preise und interne Werte in der Kundenansicht
   (`req.kundenansicht`) serverseitig ausblenden.
6. Versionsverlauf in `core/src/changelog.ts`, Version nach SemVer gleich in Manifest und den drei `package.json`.
7. `npm run typecheck` und `npm test` ohne Fehler; danach beim Hersteller einreichen (Abschnitt 4).

## 4. Einreichen

OFFEN: Der formale Weg für Module anderer Herausgeber (Vertrag, Prüfung, Auslieferung an Instanzen, Lizenzierung über den
Hersteller) ist noch nicht festgelegt. Bis dahin Kontakt über www.heitzer.info.
