# Sicherheitsrichtlinie – Richtkant Modul-SDK

Stand: Richtkant Core 0.16.14, 2026-11-13. Hersteller: Christian Heitzer, www.heitzer.info.

## Meldeweg

- **Kontakt:** christian@heitzer.info. Maßgeblich ist für eine laufende Instanz die Adresse unter `Contact:` in
  `https://<instanz>/.well-known/security.txt` (RFC 9116).
- Bitte Sicherheitslücken **nicht** öffentlich melden (keine Issues, Pull Requests oder Foren), sondern nur über diesen Weg.
- Hilfreich sind: betroffene Version (Core, Modulvertrag, ggf. Modul), betroffene Schnittstelle bzw. Datei, Schritte zur
  Nachstellung, erwartete Auswirkung und ein Kontakt für Rückfragen. Sprache: Deutsch oder Englisch.

## Ablauf

| Schritt | Ziel |
|---|---|
| Eingangsbestätigung | innerhalb von 3 Werktagen |
| Erste Bewertung (Schweregrad nach CVSS, betroffene Versionen) | innerhalb von 10 Werktagen |
| Korrektur und Auslieferung | nach Schweregrad, kritisch und hoch mit Vorrang |
| Offenlegung | abgestimmt mit der meldenden Person, spätestens 90 Tage nach Eingang |

Gutgläubige Sicherheitsforschung im Rahmen dieser Richtlinie (keine Beeinträchtigung des Betriebs, kein Zugriff auf fremde
Daten über den Nachweis hinaus) wird nicht rechtlich verfolgt. Ein Prämienprogramm gibt es nicht.

## Geltungsbereich

Die Richtlinie gilt für Richtkant ERP (Instanzen, öffentliche API, Modulschnittstelle) und für den Inhalt dieses Repositorys.
Schwachstellen in einem Modul eines anderen Herausgebers bitte zusätzlich an dessen Herausgeber melden.

Hinweise für Modulentwickler: keine Geheimnisse im Quelltext, Eingaben mit Schemas prüfen, jede Route mit Rechteprüfung,
Preise und interne Werte in der Kundenansicht serverseitig ausblenden, personenbezogene Daten im Manifest erklären
(`daten.kundenbezug`).
