/** Fachlogik des Beispielmoduls: ohne Richtkant Core lauffähig (feste Prüftage, unabhängig vom Kalendertag). */
import { describe, expect, it } from 'vitest';
import { BALD_FAELLIG_TAGE, faelligkeit } from '../src/faelligkeit.js';

describe('faelligkeit', () => {
  it('noch nie geprüft', () => {
    expect(faelligkeit(null, 30, '2026-11-08')).toEqual({ status: 'nie_geprueft', faelligAm: null, restTage: null });
  });
  it('in Ordnung, bald fällig, fällig und überfällig', () => {
    expect(faelligkeit('2026-11-01', 30, '2026-11-08')).toEqual({ status: 'in_ordnung', faelligAm: '2026-12-01', restTage: 23 });
    expect(faelligkeit('2026-11-01', 30, '2026-11-17').status).toBe('bald_faellig');
    expect(faelligkeit('2026-11-01', 30, '2026-12-01')).toEqual({ status: 'faellig', faelligAm: '2026-12-01', restTage: 0 });
    expect(faelligkeit('2026-10-01', 7, '2026-11-08').restTage).toBe(-31);
  });
  it('Grenze „bald fällig“', () => {
    expect(faelligkeit('2026-01-01', BALD_FAELLIG_TAGE, '2026-01-01').status).toBe('bald_faellig');
    expect(faelligkeit('2026-01-01', BALD_FAELLIG_TAGE + 1, '2026-01-01').status).toBe('in_ordnung');
  });
  it('Jahreswechsel und Schaltjahr', () => {
    expect(faelligkeit('2027-12-20', 70, '2028-01-01').faelligAm).toBe('2028-02-28');
    expect(faelligkeit('2028-02-28', 1, '2028-02-28').faelligAm).toBe('2028-02-29');
  });
  it('ungültige Eingaben', () => {
    expect(() => faelligkeit(null, 0, '2026-11-08')).toThrow();
    expect(() => faelligkeit(null, 1.5, '2026-11-08')).toThrow();
    expect(() => faelligkeit('08.11.2026', 30, '2026-11-08')).toThrow();
    expect(() => faelligkeit(null, 30, '2026-13-01')).toThrow();
  });
  it('nicht existierende Kalendertage werden abgelehnt, nicht verschoben', () => {
    expect(() => faelligkeit('2026-02-31', 30, '2026-03-01')).toThrow(/Ungültiger Kalendertag/);
    expect(() => faelligkeit('2026-04-31', 30, '2026-05-01')).toThrow(/Ungültiger Kalendertag/);
    expect(() => faelligkeit('2026-01-01', 30, '2026-11-31')).toThrow(/Ungültiger Kalendertag/);
    expect(() => faelligkeit(null, 30, '2026-00-10')).toThrow(/Ungültiger Kalendertag/);
    expect(() => faelligkeit(null, 30, '2026-01-00')).toThrow(/Ungültiger Kalendertag/);
  });
  it('Monatsende und Nicht-Schaltjahr', () => {
    // 29.02. nur im Schaltjahr
    expect(() => faelligkeit('2026-02-29', 30, '2026-03-01')).toThrow(/Ungültiger Kalendertag/);
    expect(() => faelligkeit('2100-02-29', 30, '2100-03-01')).toThrow(/Ungültiger Kalendertag/);
    expect(faelligkeit('2028-02-29', 1, '2028-02-29').faelligAm).toBe('2028-03-01');
    expect(faelligkeit('2000-02-29', 1, '2000-02-29').faelligAm).toBe('2000-03-01');
    // letzter Tag der Monate ist gültig
    expect(faelligkeit('2026-01-31', 28, '2026-02-01')).toEqual({ status: 'in_ordnung', faelligAm: '2026-02-28', restTage: 27 });
    expect(faelligkeit('2026-04-30', 1, '2026-04-30').faelligAm).toBe('2026-05-01');
    expect(faelligkeit('2026-12-31', 1, '2026-12-31').faelligAm).toBe('2027-01-01');
  });
});
