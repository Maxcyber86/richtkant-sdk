import type { AnyFunktionKey, EntitaetTyp, NummernkreisKey, RouteKey } from '../navigation.js';
import type { Permission } from '../permissions.js';
/** Recht eines Moduls (manifest.rechte) */
export declare const modulRecht: (recht: string) => Permission;
/** Funktion eines Moduls (manifest.verzeichnis.funktionen) */
export declare const modulFunktion: (key: string) => AnyFunktionKey;
/** Route eines Moduls (manifest.verzeichnis.routen) */
export declare const modulRoute: (key: string) => RouteKey;
/** Datensatztyp eines Moduls (manifest.verzeichnis.entitaeten) */
export declare const modulEntitaet: (key: string) => EntitaetTyp;
/** Nummernkreis eines Moduls (manifest.verzeichnis.nummernkreise) */
export declare const modulNummernkreis: (key: string) => NummernkreisKey;
