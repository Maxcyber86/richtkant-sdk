# Öffentliche API (Instanz-API /api/v1)

Richtkant ERP 0.16.8 · Modulvertrag 2.2.0 · Stand 2026-11-09
Verantwortlich: Christian Heitzer, www.heitzer.info

Die maschinenlesbare Beschreibung aller über einen API-Zugang erreichbaren Endpunkte liegt in
[openapi/openapi.json](../openapi/openapi.json) (OpenAPI 3, erzeugt aus Richtkant Core 0.16.8 ohne Module; Endpunkte, die über
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
(Löschläufe, Anonymisierung), Demodaten, Zugangsdaten von Schnittstellen, Portalzugänge. Ein Fremdsystem verwaltet die Instanz nicht.

Schritte, die eine Person persönlich bestätigen muss (Kennwort, zweiter Faktor, frische Microsoft-Anmeldung, Zustimmung zur
Übertragung an eine KI), sind über einen API-Zugang nie möglich.

## 3. Antworten und Fehler

- JSON, Beträge in Cent, Datumswerte ISO 8601 (Zeitpunkte UTC mit `Z`, Kalendertage `YYYY-MM-DD`).
- Fehler: HTTP-Status mit `{ "code": "<CODE>", "message": "<Text>" }` (Prüffehler der Eingaben: Code `VALIDIERUNG` mit `details`). Codes des Zugangs: `API_SCHLUESSEL_UNGUELTIG` (401),
  `API_ZUGANG_GESPERRT` (401), `API_ZUGANG_ABGELAUFEN` (401), `API_IP_NICHT_ERLAUBT` (403), `API_NUR_LESEN` (403),
  `API_GESPERRT` (403), `API_NICHT_LIZENZIERT` (403), `429` bei Überschreiten der Grenze.
- Schreibende Aufrufe mit Versionsfeld (z. B. Belege) verlangen die aktuelle `version`; sonst `409`.

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
