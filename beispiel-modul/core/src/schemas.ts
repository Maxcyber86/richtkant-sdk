/** Eingabeprüfung des Beispielmoduls (zod; dieselben Schemas in Server und Oberfläche) */
import { z } from 'zod';

export const pruefpunktEingabeSchema = z.object({
  bezeichnung: z.string().trim().min(2).max(120),
  intervallTage: z.number().int().min(1).max(3650),
  kundeId: z.string().uuid().nullish(),
});
export type PruefpunktEingabe = z.infer<typeof pruefpunktEingabeSchema>;

/** Antwort der Schnittstelle je Prüfpunkt */
export interface PruefpunktAnsicht {
  id: string;
  bezeichnung: string;
  intervallTage: number;
  letztePruefung: string | null;
  kundeId: string | null;
  isTest: boolean;
  status: 'nie_geprueft' | 'faellig' | 'bald_faellig' | 'in_ordnung';
  faelligAm: string | null;
  restTage: number | null;
}
