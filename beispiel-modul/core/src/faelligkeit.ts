/**
 * Reine Fachlogik des Beispielmoduls (ohne Datenbank, ohne Oberfläche): Fälligkeit eines wiederkehrenden Prüfpunkts.
 * Läuft identisch im Server (verbindliche Berechnung) und in der Oberfläche (Vorschau) und ist ohne Richtkant Core testbar.
 */

export type PruefStatus = 'nie_geprueft' | 'faellig' | 'bald_faellig' | 'in_ordnung';

export interface Faelligkeit {
  status: PruefStatus;
  /** Nächster Prüftag (JJJJ-MM-TT) oder null, wenn noch nie geprüft */
  faelligAm: string | null;
  /** Tage bis zur Fälligkeit (negativ = überfällig) oder null */
  restTage: number | null;
}

/** Vorlauf in Tagen, ab dem ein Prüfpunkt als „bald fällig“ gilt */
export const BALD_FAELLIG_TAGE = 14;

const TAG_MS = 86_400_000;
const KALENDERTAG = /^\d{4}-\d{2}-\d{2}$/;

const tagText = (zahl: number): string => new Date(zahl * TAG_MS).toISOString().slice(0, 10);

/**
 * Kalendertag als fortlaufende Tageszahl. Nicht existierende Tage (z. B. 31.02. oder 29.02. außerhalb eines Schaltjahrs) werden
 * abgelehnt statt in den Folgemonat verschoben: Der Tag muss nach der Umrechnung unverändert zurückkommen.
 */
function tagZahl(tag: string): number {
  if (!KALENDERTAG.test(tag)) throw new Error(`Ungültiger Kalendertag: ${tag}`);
  const ms = Date.parse(`${tag}T00:00:00Z`);
  if (Number.isNaN(ms)) throw new Error(`Ungültiger Kalendertag: ${tag}`);
  const zahl = Math.round(ms / TAG_MS);
  if (tagText(zahl) !== tag) throw new Error(`Ungültiger Kalendertag: ${tag}`);
  return zahl;
}

/**
 * Fälligkeit berechnen. `letztePruefung` und `heute` sind Kalendertage (JJJJ-MM-TT, ohne Zeitzone), `intervallTage`
 * eine ganze Zahl von 1 bis 3650.
 */
export function faelligkeit(letztePruefung: string | null, intervallTage: number, heute: string): Faelligkeit {
  if (!Number.isInteger(intervallTage) || intervallTage < 1 || intervallTage > 3650) throw new Error('Das Prüfintervall muss zwischen 1 und 3650 Tagen liegen.');
  const h = tagZahl(heute);
  if (!letztePruefung) return { status: 'nie_geprueft', faelligAm: null, restTage: null };
  const faellig = tagZahl(letztePruefung) + intervallTage;
  const rest = faellig - h;
  const status: PruefStatus = rest <= 0 ? 'faellig' : rest <= BALD_FAELLIG_TAGE ? 'bald_faellig' : 'in_ordnung';
  return { status, faelligAm: tagText(faellig), restTage: rest };
}

export const PRUEF_STATUS_LABEL: Record<PruefStatus, string> = {
  nie_geprueft: 'Noch nie geprüft',
  faellig: 'Fällig',
  bald_faellig: 'Bald fällig',
  in_ordnung: 'In Ordnung',
};
