import { type FunktionKey } from '../../core/navigation.js';
import type { DbOrTx } from '../db/client.js';
export declare function funktionAktiv(db: DbOrTx, key: FunktionKey): Promise<boolean>;
