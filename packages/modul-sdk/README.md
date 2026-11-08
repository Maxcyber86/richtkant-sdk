# @richtkant/modul-sdk

Typdeklarationen der Modul-Schnittstelle von Richtkant ERP 0.16.7 (Modulvertrag 2.2.0). Nur `.d.ts`-Dateien, kein
ausführbarer Code; erzeugt aus dem Quelltext des Core mit `tsc --emitDeclarationOnly` und beschränkt auf die öffentliche
Erweiterungsschnittstelle (ausdrücklich freigegebene Namen und die Typen, auf die sie verweisen). Interne Typen des Core und
Bausteine, die nur die Module des Herstellers nutzen, sind nicht enthalten.

| Importname im Modul | Einstieg | Inhalt |
|---|---|---|
| `@gm/core` | `types/core.d.ts` | Manifest und Modulsystem, Hilfsfunktionen und Typen, die Module nutzen |
| `@gm/core/hilfe` | `types/core-hilfe.d.ts` | Bausteine für Hilfeartikel (`themen`, `schritte`, `tipp` …), `HilfeThema`, `HilfeKey` |
| `@gm/server/sdk` | `types/server.d.ts` | `ServerModul`, Erweiterungspunkte, Dienste (Protokoll, Benachrichtigung, Einstellungen, Demodaten …), Fastify-Erweiterungen |
| `@gm/server/sdk/db` | `types/server-db.d.ts` | Stammdaten-Tabellen des Core als Verweisziele und zum Lesen (`customers`, `suppliers`, `articles`, `users`) und `timestamps` |
| `@gm/web/sdk` | `types/web.d.ts` | `WebModul`, Slots, Bausteine der Oberfläche, Schnittstellenzugriff, Sitzung, Formate |

Einbindung über `paths` in der `tsconfig.json` des Moduls (wie in `tsconfig.base.json` dieses Repositorys):

```json
{
  "compilerOptions": {
    "paths": {
      "@gm/core": ["./packages/modul-sdk/types/core.d.ts"],
      "@gm/core/hilfe": ["./packages/modul-sdk/types/core-hilfe.d.ts"],
      "@gm/server/sdk": ["./packages/modul-sdk/types/server.d.ts"],
      "@gm/server/sdk/db": ["./packages/modul-sdk/types/server-db.d.ts"],
      "@gm/web/sdk": ["./packages/modul-sdk/types/web.d.ts"]
    }
  }
}
```

Die Deklarationen verweisen auf die Typen der Laufzeitbibliotheken (@tanstack/react-query, drizzle-orm, fastify, fastify-type-provider-zod, react, zod); sie sind als `peerDependencies`
angegeben. Lizenz: Apache-2.0 (siehe LICENSE im Wurzelverzeichnis).
