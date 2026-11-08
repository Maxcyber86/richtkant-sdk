import type { DbOrTx } from '../db/client.js';
export declare function getSetting<T>(db: DbOrTx, key: string): Promise<T | null>;
export declare function putSetting(db: DbOrTx, key: string, value: unknown, userId: string | null): Promise<void>;
