# Änderungen

Je Release von Richtkant Core: Version des Modulvertrags, Pfad der öffentlichen API und Änderungen für Modulentwickler und
API-Nutzer. Änderungen für Anwenderinnen und Anwender stehen im Versionsverlauf der Anwendung.

| Richtkant Core | Modulvertrag | API | Änderungen |
|---|---|---|---|
| 0.16.8 | 2.2.0 | /api/v1 | Öffentliche API: Nutzung als Lizenzpaket „api“ (Grenzen für aktive Zugänge, schreibenden Umfang und Anfragen je Minute); ohne Paket antworten Zugänge mit 403 API_NICHT_LIZENZIERT. Öffentliche API: GAEB-Endpunkte (/gaeb/…) für Ausschreibungen (X81/X83, GAEB 2000), Angebotsabgabe X84 und Auftragserteilung X86; KI-Vorschläge zum GAEB-Vorgang sind über die API gesperrt (neu in Richtkant Core 0.16.8). |
| 0.16.7 | 2.2.0 | /api/v1 | Erste Veröffentlichung des Modul-SDK: Typdeklarationen der Importflächen, Dokumentation des Modulvertrags, Referenz der Erweiterungspunkte und Beispielmodul. Öffentliche API /api/v1 mit API-Zugängen (Schlüssel rkapi_…, Dienstkonto mit Rollen, Umfang lesen oder schreiben, IP-Einschränkung, Grenze je Minute) und OpenAPI-Beschreibung (neu in Richtkant Core 0.16.7). |

## Verlauf des Modulvertrags

- **Modulvertrag 2.2.0** (gegenüber 2.1.0): neue SDK-Exporte für die Bestätigung per Passkey: `mitPasskeyBestaetigt` (`@gm/server/sdk`, prüft ein einmaliges Bestätigungstoken je Person, Sitzung und Zweck) sowie `PasskeyBestaetigenKnopf`, `OderKennwort`, `passkeyBestaetigungHolen` und `useBestaetigungsArten` (`@gm/web/sdk`). Außerdem: optionales Feld `unter` an Funktionen im Verzeichnis (Einordnung als Unterpunkt eines Menüeintrags statt `menue: true`, z. B. `unter: 'vertrieb.kalkulationen'`) und der Server-Erweiterungspunkt `aufmassZiele` (Übernahme einer Aufmaßposition aus dem Einsatz in die Kalkulation des Moduls). Module, die einen dieser Punkte nutzen, erklären `vertrag: '^2.2.0'`; Module mit `'^2.0.0'` bzw. `'^2.1.0'` laufen unverändert weiter.
- **Modulvertrag 2.1.0** (gegenüber 2.0.0): neuer Erweiterungspunkt `kiGlossar` (Fachbegriffe für das Glossar des KI-Assistenten, Abschnitt 3); Typen `KiGlossarBeitrag` (Server-SDK) und `KiGlossarEintrag` (`@gm/core`). Module, die den Punkt nutzen, erklären `vertrag: '^2.1.0'`; Module mit `'^2.0.0'` laufen unverändert weiter.
- **Modulvertrag 2.0.0** (gegenüber 1): `vertrag` als Semver-Bereich (Typ `string | number`), Erweiterungspunkt `fuellungen`, `ServerModul.beiInstallation`, typisierte Slot-Props (`WebSlotProps`), Fehlerisolation (Abschnitt 5), Status `gestoert`, `DemoModulDef.abhaengigOptional`, tolerante Registrierung beim Start. Alle Punkte von Vertrag 1 bestehen unverändert; Module mit Vertrag 1 laufen daher weiter (veraltet).
