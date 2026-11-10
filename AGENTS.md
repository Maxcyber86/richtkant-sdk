# Hinweise für automatisierte Prüfungen und Mitwirkende

Dieses Repository ist das **Richtkant Modul-SDK** (Apache-2.0) für Richtkant Core 0.16.10, Modulvertrag 2.2.0.
Es wird bei jedem Release des Core automatisch aus dem Hauptprojekt erzeugt; Änderungen direkt hier werden beim nächsten Release
überschrieben. Sprache: Deutsch.

## Inhalt

- `packages/modul-sdk/`: nur Typdeklarationen (`.d.ts`) der Erweiterungspunkte – kein Quelltext des Core.
- `beispiel-modul/`: Vorlage für eigene Module mit Fachtests.
- `openapi/openapi.json`: Beschreibung der öffentlichen API (ohne über die API gesperrte Endpunkte).
- `docs/`: Modulvertrag, Erweiterungspunkte, öffentliche API, Entwicklung und Test.

## Abgrenzung

Das SDK dient ausschließlich **Erweiterungen von außen** (zusätzliche Module, Anpassungen, Anbindungen über die öffentliche API).
Es ist nicht dafür gedacht, Richtkant selbst weiterzuentwickeln, und enthält keinen Core-Quelltext.

## Worauf Reviews achten sollen

1. Sicherheit der Vorlage: jede Route mit Rechteprüfung, Eingaben mit Schemas, keine Geheimnisse, keine Interna in Fehlermeldungen,
   Kundenansicht beachten.
2. Übereinstimmung der Dokumentation mit den Typdeklarationen und der OpenAPI-Beschreibung.
3. Exit-Fähigkeit: Module legen ihre Daten so ab, dass sie vollständig in offenen Formaten exportierbar sind.
4. Lizenz: nur Apache-2.0-verträgliche Inhalte.

Sicherheitslücken bitte nicht öffentlich, sondern nach `SECURITY.md` melden.
