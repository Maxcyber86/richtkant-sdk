import { type ModulZustand } from '../../core/modulsystem/vertrag.js';
import type { DbOrTx } from '../db/client.js';
/** Zustand eines verfügbaren Moduls */
export declare function modulZustand(db: DbOrTx, schluessel: string): Promise<ModulZustand>;
/** Wirksam aktiv (installiert_aktiv und lizenziert) */
export declare function modulAktiv(db: DbOrTx, schluessel: string): Promise<boolean>;
