# Beispielmodul „Prüfpunkte“

Kleines, vollständiges Modul für Richtkant ERP 0.16.7 (Modulvertrag `^2.2.0`): wiederkehrende Prüfpunkte mit
Prüfintervall, Fälligkeit und „geprüft“-Markierung. Aufbau wie die Module des Herstellers:

```
core/     @rk-modul/beispiel-core    Manifest, reine Fachlogik (faelligkeit.ts), Schemas, Hilfe, Versionsverlauf, Fachtests
server/   @rk-modul/beispiel-server  ServerModul: Routen, Tabelle (src/db/eigen.ts), Migration (drizzle/), Demodaten
web/      @rk-modul/beispiel-web     WebModul: Seite „Prüfpunkte“, Symbole, Hilfe und Versionsverlauf (nachgeladen)
```

| Bestandteil | Datei | Vertrag |
|---|---|---|
| Manifest | `core/src/manifest.ts` | Schlüssel `beispiel`, Funktion `betriebsmittel.pruefpunkte` (Menü Betriebsmittel), Recht `beispiel.pruefpunkte`, Route `/pruefpunkte`, Daten mit eigener Migration und Kundenbezug |
| Route | `server/src/routes.ts` | `GET /api/v1/beispiel/pruefpunkte`, `POST /api/v1/beispiel/pruefpunkte`, `POST /api/v1/beispiel/pruefpunkte/{id}/geprueft` |
| Seite | `web/src/seite.tsx` | Routenschlüssel `pruefpunkte` |
| Hilfe | `core/src/hilfe/index.ts` | Artikel `betriebsmittel.pruefpunkte` |
| Demodaten | `server/src/demo.ts` | Baustein `beispiel` (drei Prüfpunkte, `is_test`) |
| Migration | `server/drizzle/0000_pruefpunkte.sql` | Tabelle `beispiel_pruefpunkte`, Verweis nur auf `customers` |
| Tests | `core/test/faelligkeit.test.ts`, `server/test/konformitaet.test.ts` | Fachtests ohne Core; Konformität nur in der Testumgebung des Herstellers |

Anleitung:

1. Im Wurzelverzeichnis `npm install`, dann `npm run typecheck` und `npm test`.
2. Eigenes Modul: Ordner kopieren, alle Vorkommen von `beispiel` (Schlüssel, Paketnamen, Tabellen-, Rechte- und
   Demo-Schlüssel) durch den eigenen Schlüssel ersetzen, Funktionen und Texte anpassen.
3. Neue Tabellen in `server/src/db/eigen.ts` definieren, `npx drizzle-kit generate` im Ordner `server` ausführen und die
   erzeugte SQL-Datei von Hand prüfen.
4. Checkliste und Prüfungen: [../docs/Entwicklung-und-Test.md](../docs/Entwicklung-und-Test.md).
