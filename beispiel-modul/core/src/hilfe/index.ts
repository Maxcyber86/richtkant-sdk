/** Hilfeinhalte des Beispielmoduls (eigener Einstieg, damit sie nur bei Bedarf geladen werden). */
import { absatz, generiert, schritte, themen, tipp } from '@gm/core/hilfe';

export const BEISPIEL_HILFE_INHALTE = themen({
  'betriebsmittel.pruefpunkte': {
    titel: 'Prüfpunkte',
    art: 'funktion',
    funktion: 'betriebsmittel.pruefpunkte',
    eltern: 'modul.betriebsmittel',
    stand: '0.16.7',
    kurz: 'Wiederkehrende Prüfungen (z. B. Sicht- und Funktionsprüfungen) mit Intervall anlegen und ihre Fälligkeit im Blick behalten.',
    anleitung: [
      schritte('Bezeichnung und Prüfintervall in Tagen eingeben und `Anlegen` wählen.', 'Nach der Prüfung in der Zeile `Geprüft` wählen; das Datum ist der heutige Tag.'),
      tipp('Prüfpunkte, die in den nächsten 14 Tagen fällig werden, sind als „Bald fällig“ markiert.'),
    ],
    zusammenhaenge: [absatz('Fällig ist ein Prüfpunkt am Tag der letzten Prüfung plus Intervall. Ein Prüfpunkt, der noch nie geprüft wurde, gilt als „Noch nie geprüft“.')],
    technik: [generiert('rechte'), generiert('api')],
    stichworte: ['Prüfung', 'Intervall', 'Fälligkeit', 'Beispielmodul'],
  },
});
