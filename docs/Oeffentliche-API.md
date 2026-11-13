# Öffentliche API (Instanz-API /api/v1)

Richtkant ERP 0.16.14 · Modulvertrag 2.4.0 · Stand 2026-11-13
Verantwortlich: Christian Heitzer, www.heitzer.info

Die maschinenlesbare Beschreibung aller über einen API-Zugang erreichbaren Endpunkte liegt in
[openapi/openapi.json](../openapi/openapi.json) (OpenAPI 3, erzeugt aus Richtkant Core 0.16.14 ohne Module; Endpunkte, die über
die API immer gesperrt sind, sind dort nicht enthalten). Jede Instanz liefert ihre eigene, vollständige Beschreibung unter
`GET /api/v1/openapi.json`, einschließlich der Endpunkte ihrer installierten Module.

Fremdsysteme (Shop, Zeiterfassung, Lohn, Großhandel, eigene Auswertungen) sprechen Richtkant über dieselbe REST-Schnittstelle
an, die auch die Oberfläche nutzt: `https://<instanz>/api/v1/…`. Neben dem KI-Zugriff über MCP ist das der zweite Weg von außen.

## 1. Zugang

- **API-Zugang** unter Administration › Schnittstellen › API-Zugänge (Recht „API-Zugänge verwalten“, `api.verwalten`).
- Jeder Zugang hat ein eigenes **Dienstkonto** (Anmeldeart `api`): Es kann sich nicht in der Oberfläche anmelden, hat kein
  Kennwort und keinen zweiten Faktor. Seine **Rollen** bestimmen, was der Zugang darf – mit denselben Regeln wie für Personen
  (Rechte, Nur-Lesen-Rollen, Modulschalter, Preissichtbarkeit, Kundenansicht, Protokoll).
- **Schlüssel** `rkapi_` + 43 Zeichen (32 Zufallsbytes, base64url). Er wird nur beim Anlegen bzw. Erneuern einmal angezeigt;
  gespeichert wird nur der SHA-256. Anzeige danach nur mit dem Anfang (`rkapi_ab12…`).
- Senden: `Authorization: Bearer rkapi_…`. Ein Schlüssel in der Adresse (z. B. `?access_token=`) wird nicht ausgewertet (Antwort `401`); bitte nie so senden, Adressen landen in Protokollen.
- **Umfang:** `lesen` (nur `GET`/`HEAD`) oder `schreiben` (alle Methoden, soweit die Rollen es erlauben).
- **Ablauf** (optional), **Sperren/Entsperren**, **Erneuern** (neuer Schlüssel, der alte gilt sofort nicht mehr), **Löschen**
  (Zugang gesperrt und ausgeblendet, Dienstkonto deaktiviert; Protokoll bleibt).
- **IP-Einschränkung** (optional): Liste von Adressen bzw. Netzen (IPv4/IPv6, CIDR). Maßgeblich ist die Adresse, die die
  Instanz sieht (hinter dem Reverse Proxy die weitergereichte Adresse).
- **Grenze je Minute** (1–1200, Standard 120) je Zugang; darüber `429` mit `Retry-After`. Abgewiesene Aufrufe (ungültiger,
  gesperrter oder abgelaufener Schlüssel, Adresse, Nur-Lesen, gesperrter Bereich) zählen je IP-Adresse; ab 30 je Minute antwortet die
  Instanz sofort mit `429` (`ZU_VIELE_FEHLVERSUCHE`). Eine fehlende Lizenz (`API_NICHT_LIZENZIERT`) zählt nicht als
  Fehlversuch: Ein gültiger Schlüssel erhält dann immer `403`, nie `429`.
- Dienstkonten sind keine Personen und zählen nicht als belegte Plätze der Lizenz.

## 1a. Lizenz (ab 0.16.8)

Die öffentliche API ist ein Paket im Vertrag: Höchstzahl aktiver Zugänge, ob Schreiben erlaubt ist, und
die Obergrenze der Anfragen je Minute und Zugang. Ohne Paket bzw. bei abgelaufener Lizenz antworten alle Zugänge mit `403`
`API_NICHT_LIZENZIERT` (in der Kulanzzeit wirken sie weiter). Erlaubt das Paket kein Schreiben, wirken auch Zugänge mit Umfang
„schreiben“ nur lesend. Instanzen ohne Lizenzprüfung (Selbstbetrieb, Entwicklung) nutzen die API ohne diese Grenzen.
Enthält die Lizenz das Paket ohne Angaben zum Umfang, gelten die Standardwerte (3 Zugänge, Schreiben erlaubt, 120 Anfragen je
Minute). Als aktiv zählt ein Zugang, der nicht gesperrt, nicht gelöscht und nicht abgelaufen ist; die Grenze gilt beim Anlegen,
Entsperren und Verlängern eines abgelaufenen Zugangs, auch bei gleichzeitigen Anfragen. Einschränken ist auch ohne Lizenz
möglich: Sperren, Löschen, Umfang „lesen“ und eine kleinere Grenze je Minute.

## 2. Immer gesperrt über die API

Unabhängig von den Rollen (Antwort `403`, Code `API_GESPERRT`): Anmeldung und Sitzungen (`/auth/*`), die API-Zugänge selbst
(`/api-zugaenge*`), Kundenportal (`/portal*`, `/portal-verwaltung*`) sowie alle Bereiche der zentralen Sperrliste des KI-Zugriffs
(`KI_SPERRLISTE` in `@gm/core`): Sicherheit und zweiter Faktor, Benutzer und Rollen (ändern), Anbindung an die Verwaltung des Herstellers,
Lizenz und Fernzugriff, Wartung, Datensicherung und Wiederherstellung, Module, KI-Einstellungen und KI-Funktionen (auch die
KI-Zuordnung von Ausschreibungen `/gaeb/vorgaenge/:id/ki-*`), Datenschutz
(Löschläufe, Anonymisierung), Demodaten, Zugangsdaten von Schnittstellen, Portalzugänge, ab 0.16.10 Zahlungsfreigaben
(Freigeben, Zahlungsrichtlinien, Bestätigen von Bankverbindungen; Lesen bleibt möglich). Ein Fremdsystem verwaltet die Instanz nicht.

Schritte, die eine Person persönlich bestätigen muss (Kennwort, zweiter Faktor, frische Microsoft-Anmeldung, Zustimmung zur
Übertragung an eine KI), sind über einen API-Zugang nie möglich.

## 3. Antworten und Fehler

- JSON, Beträge in Cent, Datumswerte ISO 8601 (Zeitpunkte UTC mit `Z`, Kalendertage `YYYY-MM-DD`).
- Fehler: HTTP-Status mit `{ "code": "<CODE>", "message": "<Text>" }` (Prüffehler der Eingaben: Code `VALIDIERUNG` mit `details`). Codes des Zugangs: `API_SCHLUESSEL_UNGUELTIG` (401),
  `API_ZUGANG_GESPERRT` (401), `API_ZUGANG_ABGELAUFEN` (401), `API_IP_NICHT_ERLAUBT` (403), `API_NUR_LESEN` (403),
  `API_GESPERRT` (403), `API_NICHT_LIZENZIERT` (403), `429` bei Überschreiten der Grenze.
- Schreibende Aufrufe mit Versionsfeld (z. B. Belege) verlangen die aktuelle `version`; sonst `409`.
- Fachliche Codes (Auswahl, ab 0.16.11): `CURSOR_UNGUELTIG` (400, ungültige Fortsetzung einer Liste, Abschnitt 5c),
  `IMPORT_WEITERVERWENDET` (409, Rückgängig eines Imports, wenn ein zugehöriger Datensatz danach geändert oder weiterverwendet
  wurde), `UNGUELTIG` (400, z. B. dieselbe Position zweimal in einer Rechnungskorrektur). Die Codes `HERKUNFT_UNBEKANNT`,
  `KONTO_GELOESCHT`, `KONTO_GEAENDERT` (409) und `GESPERRT` (423) gehören zu Routen, die über die API gesperrt sind (Abschnitt 2).
- Ab 0.16.12: `WISSEN_NACHWEISE_VORHANDEN` (409, `DELETE /api/v1/wissen/artikel/{id}`, wenn Lesebestätigungen, Pflichtzuweisungen
  oder Rückfragen bestehen – Artikel archivieren statt löschen). Gleichzeitige Bearbeitung ergibt bei Abwesenheiten, Feedback, Prüfterminen, Eingangsrechnungs-Entscheidung und
  GAEB-Zuordnung `409` (`KONFLIKT` bzw. `BELEG_GEAENDERT`). `PUT /api/v1/teams/{id}` und Arbeitsschritte in
  `POST/PUT /api/v1/arbeitsauftraege`: fehlende optionale Felder lassen den gespeicherten Wert unverändert (bisher gelöscht).

## 4. Beschreibung der Endpunkte

- `GET /api/v1/openapi.json` liefert die OpenAPI-3-Beschreibung aller Endpunkte der Instanz (mit Schlüssel oder angemeldet).
- Beispiele:

```bash
# Kunden suchen (nur lesen)
curl -s -H "Authorization: Bearer $RK_API" "https://erp.example.com/api/v1/customers?q=Muster"

# Beleg lesen
curl -s -H "Authorization: Bearer $RK_API" "https://erp.example.com/api/v1/documents/<id>"

# Kunden anlegen (Umfang „schreiben“, Rolle mit „Kunden bearbeiten“)
curl -s -X POST -H "Authorization: Bearer $RK_API" -H "Content-Type: application/json" \
  -d '{"typ":"firma","firma":"Muster GmbH","email":"info@muster.example"}' "https://erp.example.com/api/v1/customers"
```

## 5. Versionierung und Verträglichkeit

- Der Pfad `/api/v1` bleibt abwärtsverträglich: Felder und Endpunkte kommen hinzu, bestehende ändern Bedeutung und Format nicht
  und entfallen nicht ohne Ankündigung. Unbekannte Felder in Antworten bitte ignorieren.
- Eine unverträgliche Änderung käme unter `/api/v2`; `/api/v1` liefe dann mindestens zwölf Monate parallel (Hinweis im Changelog
  und in der Kopfzeile `Deprecation`).
- Die Programmversion steht in der Kopfzeile `X-Richtkant-Version`.

### 5a. Personen an Einsätzen (ab 0.16.9)

Seit 0.16.9 werden Einsätze der Personalakte zugeteilt; auch Helfer ohne Benutzerkonto lassen sich einplanen.
`GET /api/v1/einsaetze` und `GET /api/v1/einsaetze/{id}` liefern je Person in `mitarbeiter[]`:

| Feld | Bedeutung |
|---|---|
| `id` | **Personenkennung, kein fester Typ:** die Benutzer-ID, wenn die Person ein Benutzerkonto hat (unverändert wie bis 0.16.8), sonst die Mitarbeiter-ID (Personalakte). Bitte nicht als Mitarbeiter-ID auswerten. |
| `mitarbeiterId` | Mitarbeiter-ID (Personalakte) oder `null`, wenn die Zuteilung nur über ein Konto ohne passende Akte besteht. |
| `benutzerId` | Benutzer-ID oder `null` bei Helfern ohne Konto. |
| `konto` | `true`, wenn die Person ein Benutzerkonto hat. |

- Zum Abgleich mit Personal- bzw. Lohnsystemen `mitarbeiterId` verwenden, für Konten `benutzerId`; `id` nur als Kennung innerhalb
  der Antwort bzw. beim Einplanen (die Liste `mitarbeiter` beim Anlegen/Ändern nimmt Benutzer- oder Mitarbeiter-IDs an).
- Filter `?mitarbeiterId=` (Mitarbeiter-ID): trifft Zuteilungen über die Akte und – wie bis 0.16.8 – Zuteilungen über das mit der
  Akte verknüpfte Benutzerkonto.
- Wechselt das Konto einer Akte, gehen ihre Zuteilungen auf das neue Konto über; `id` ändert sich dann entsprechend.

### 5b. Bestellpositionen mit Bestelleinheit (ab 0.16.9)

Seit 0.16.9 kann eine Bestellposition in einer Bestelleinheit des Artikels bestellt sein (z. B. Karton = 50 Stück).
`GET /api/v1/bestellungen/{id}` liefert dann zusätzlich `bestellEinheit`, `bestellFaktor`, `bestellMenge` und `ekCentEinheit`
(Preis je Bestelleinheit); `menge` und `ekCent` bleiben wie bis 0.16.8 in der Lagereinheit (`ekCent` auf ganze Cent gerundet).

Beim Ändern bzw. Anlegen (`PUT /api/v1/bestellungen/{id}/positionen`, `POST /api/v1/bestellungen`) gilt je Position:

| Angabe | `menge` und `ekCent` gelten … |
|---|---|
| ohne `einheitId` (Aufrufer bis 0.16.8) | **je Lagereinheit.** Eine vorhandene Bestelleinheit bleibt; die Anzahl Bestelleinheiten wird berechnet und muss ganz sein, sonst `400` (z. B. 160 Stück bei Karton = 50). Ein unverändert zurückgesendeter `ekCent` behält den genauen Preis je Bestelleinheit, ein geänderter wird mit dem Faktor umgerechnet. |
| `einheitId` = ID einer Einheit des Artikels | je dieser Einheit (Preis je Bestelleinheit). |
| `einheitId: null` | je Lagereinheit, ohne Bestelleinheit. |
| ohne `einheitId`, `mengeInBestelleinheit: true` | je vorhandener Bestelleinheit der Position (so arbeitet die Oberfläche). |

Preisanfragen (`/api/v1/einkauf/preisanfragen`) nehmen je Artikelposition optional `einheitId` an; Menge und Angebotspreise gelten
dann je dieser Einheit. Exporte in offenen Formaten: `GET /api/v1/einkauf/preisanfragen/export?format=csv|json` und
`GET /api/v1/articles/einheiten/export?format=csv|json` (jeweils `demo=true` mit Demodaten).

### 5c. Listen (ab 0.16.11)

Listen mit Anzeigegrenze kürzen nie still. Gemeinsamer Listenvertrag:

| Feld | Bedeutung |
|---|---|
| `items` | Einträge dieser Seite |
| `weitere` | `true`, wenn hinter dieser Seite weitere Einträge folgen (immer vorhanden) |
| `gesamt` | Gesamtzahl der Treffer, wo die Zählung bezahlbar ist (sonst nicht enthalten) |
| `cursor` | Fortsetzung für die nächste Seite (nur bei `weitere: true`); als `?cursor=` unverändert zurücksenden |

- Der Cursor ist ein undurchsichtiger Schlüssel über die Sortierwerte (letzte Stufe die ID); Einträge werden auch bei
  gleichzeitigen Änderungen weder doppelt noch ausgelassen. Er gehört zu genau einer Liste, ist mit dem Schlüssel der Instanz
  geschützt (Prüfsumme) und gilt nur in dieser Instanz und bis zu einem Wechsel ihres Schlüssels. Ein veränderter, fremder
  (andere Liste bzw. Instanz) oder unlesbarer Cursor ergibt `400 CURSOR_UNGUELTIG`, nie einen Serverfehler; dann die Liste ohne
  `cursor` neu laden.
- Listen dürfen `gesamt` auf Folgeseiten auslassen; `GET /api/v1/kontakte/loeschvorschlaege` liefert es nur auf der ersten Seite (ohne `cursor`).
- Die Seitengröße wählt `proSeite` (Grenze je Liste, höchstens 500). Vollständige Abrufe folgen `cursor`, bis `weitere` `false` ist.
- Ältere Listen mit Array-Antwort bleiben unverändert; mit `format=seite` antworten sie im Listenvertrag (z. B.
  `GET /api/v1/zahlungsverkehr/ueberweisungen/kandidaten?format=seite`).
- **Verhaltensänderung 0.16.11:** `GET /api/v1/kontakte/loeschvorschlaege` liefert Seiten im Listenvertrag (Standard 200 je Seite,
  älteste zuerst); bis 0.16.10 kamen alle fälligen der ersten 500 Interessenten ohne Seiten.
- Weitere Listen mit `weitere`/`gesamt` ab 0.16.11: `GET /api/v1/documents/einbehalte`, `GET /api/v1/mahnwesen/nebenposten` (Summen
  über alle Treffer), `GET /api/v1/wiedervorlagen` (`weitere`), `GET /api/v1/betriebsmittel/{id}/verlauf` (`cursor`).
  `GET /api/v1/articles?lieferantId=` filtert serverseitig nach Lieferant.
- **Ab 0.16.12** antworten mit `format=seite` zusätzlich im Listenvertrag mit `cursor` (Seitengröße `proSeite`,
  `gesamt` auf der ersten Seite); ohne `format` bleibt die Antwort unverändert:
  `GET /api/v1/articles` (Standard 50, höchstens 200; bisher wirkten `format`/`proSeite` hier nicht), `GET /api/v1/customers`
  (Standard 50, höchstens 200; alle Sortierungen über `sort`/`richtung`), `GET /api/v1/suppliers`, `GET /api/v1/projekte`,
  `GET /api/v1/bestellungen`, `GET /api/v1/documents`, `GET /api/v1/reklamationen`, `GET /api/v1/eingangsrechnungen`
  (jeweils Standard 100, höchstens 500) und `GET /api/v1/lager/bestellvorschlag` (zusätzlich `vorschlaege` = Zahl der
  Artikel mit Vorschlag auf der ersten Seite).
- Ältere Listen mit fester Grenze melden mit `format=seite` (ohne Cursor) `weitere`, wenn hinter der Grenze weitere Einträge
  folgen, z. B. `GET /api/v1/suppliers/{id}/bestellungen`, `/mahnwesen/laeufe`, `/wartung/vertraege`, `/wartung/termine`,
  `/wareneingang/bestellungen`, `/zahlungsverkehr/lastschriften/kandidaten`, `/zahlungsverkehr/lastschriften/eingereicht`,
  `/zahlungsverkehr/mandate`, `/zeiten/korrekturen`, `/shopfloor/auftraege`.
- `GET /api/v1/einkauf/artikel` nimmt `q` (Nummer oder Bezeichnung enthält), `ohneDienstleistung=true` und `limit` (1–200) an;
  ohne Parameter wie bisher alle aktiven Artikel.
- `GET /api/v1/lager` (Lagerbestand, ab 0.16.12) mit `format=seite`, `proSeite` (1–500, Standard 100) und `cursor`: Seiten nach
  Artikelnummer, Suche `q` und Filter `alle` in SQL vor der Grenze; auf der ersten Seite `gesamt` und `mitBestand` (Artikel mit
  Gesamtbestand > 0 über alle Artikel, unabhängig von `q` und `alle`). Felder je Eintrag wie in der Altantwort (Array aller Treffer).
- **Kleine Antwortmodelle (ab 0.16.12):** `GET /api/v1/auswertungen/katalog?umfang=start` liefert nur `{ startDashboard, heute }`,
  `GET /api/v1/system/demodaten?umfang=start` nur `{ summe, demoZugaenge }`; ohne `umfang` unverändert.
- **Verhaltensänderung 0.16.12:** `GET /api/v1/vertrieb/pipeline` liefert je Spalte höchstens 50 Karten (bisher 200); `anzahl`,
  `summeCent` und `gewichtetCent` zählen weiter alle Einträge. `GET /api/v1/system/lizenzen` und `GET /api/v1/hilfe/schnittstellen`
  senden einen `ETag`; mit `If-None-Match` und unverändertem Stand antworten sie `304` ohne Rumpf.

### 5d. Änderungen 0.16.14

- **Verhaltensänderung (angekündigt im Schnittstellendokument, Regel 12.2a):** `GET`/`PUT /api/v1/eingangsrechnungen-regeln` –
  `grenzeCent` gilt ab 0.16.14 **einschließlich**: Zwei Freigaben sind ab diesem Bruttobetrag nötig (bis 0.16.13: darüber). Gespeicherte
  Grenzen hat das Update um 1 Cent erhöht (Verhalten unverändert); `GET` liefert dazu `grenzeAb: true` (setzt der Server, beim `PUT` nicht
  nötig). Ohne gespeicherte Regel gilt die Vorgabe ab 5.000,00 € (bis 0.16.13: über 5.000,00 €). Wer das bisherige Verhalten per `PUT`
  setzen will, sendet den Wert um 1 Cent erhöht.
- **Fehlercodes (zusätzlich):** Ein Bezug auf einen nicht vorhandenen Datensatz beim Anlegen bzw. Ändern antwortet `400 BEZUG_UNBEKANNT`
  (bisher `409 IN_VERWENDUNG`; beim Löschen verwendeter Datensätze bleibt `409 IN_VERWENDUNG`); eine unbekannte Maschine in den
  Arbeitsschritten von `POST`/`PUT /api/v1/arbeitsauftraege` `400 MASCHINE_UNBEKANNT`; Löschen eines Auftrags mit Projektzeiten ohne
  Projekt `409` mit Begründung (bisher `400 VALIDIERUNG`). Die Texte in `details[].meldung` der Eingabeprüfung sind deutsch (Code
  `VALIDIERUNG` und Feldpfade unverändert).
- **Positionen eines Belegs:** Mit `positionId` je Position ändert `PUT` die Position an Ort und Stelle (Kennung und Bezüge von
  Arbeitsaufträgen, Lieferschein-, Bestell- und Einsatzpositionen bleiben); ohne `positionId` wie bisher neu angelegt.
- **Neue Endpunkte (additiv):** `POST /api/v1/auswertungen/ausfuehren/buendel` (1–40 Kachel-Definitionen in einer Anfrage, Ergebnis bzw.
  Fehler je Kachel; Rechte je Kachel wie `/auswertungen/ausfuehren`), `GET /api/v1/admin/feldregister` (Beschreibung aller Einstellungen
  der Bereiche, die der Zugang öffnen darf; ohne Werte der Instanz), `GET /api/v1/datenschutz/fristen` (Lösch- und Aufbewahrungsfristen
  mit aktuellem Wert), `GET /api/v1/admin/freigaben-uebersicht` (Freigabe- und Vier-Augen-Regeln mit Zustand). Der CSV-Export der
  Rechte-Matrix (`GET /api/v1/roles/rechte-matrix.csv`) gehört zu Benutzer und Rollen und ist über die API gesperrt (Abschnitt 2).
- **Protokoll:** Jede Änderung einer Einstellung, auch über die API, erscheint als `einstellungen.geaendert` mit geänderten Feldern
  und vorher/nachher (Geheimnisse maskiert); bisherige Einzelaktionen bleiben zusätzlich.

## 6. Protokoll und Datenschutz

- Jeder Aufruf wird ohne Inhalte protokolliert: Zeit, Zugang, Methode, Endpunkt (Muster, ohne IDs der Abfrage), Status, Dauer,
  IP-Adresse. Einsicht unter Administration › Schnittstellen › API-Zugänge, Aufbewahrung 90 Tage.
- Änderungen über die API stehen zusätzlich im allgemeinen Protokoll mit dem Dienstkonto als handelnder Person.

## 7. Einschränkungen in 0.16.7

- Drucken über ein Standort-Gateway und das Einplanen von Wartungsterminen leiten intern mit der Sitzung der Oberfläche weiter und
  stehen über die API noch nicht zur Verfügung (Antwort `401`).
- Bei einer angekündigten Wartung können API-Zugänge bis zu eine Stunde früher als angemeldete Personen `503` erhalten.

## 8. Ausbaustufe (nicht in 0.16.7)

- Webhooks (Benachrichtigung bei Ereignissen), OAuth-Client-Credentials, Schlüssel mit Umfang je Bereich statt je Rolle.
