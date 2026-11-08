import { type StartOhneNetzEinstellungen } from '../../core/start-ohne-netz.js';
import type { Me } from './types';
export type StartMe = Pick<Me, 'id' | 'benutzername' | 'anzeigename' | 'rollen' | 'rollenNamen' | 'berechtigungen' | 'nurLesen' | 'einstellungen' | 'deaktiviert' | 'module'>;
interface PinHash {
    salz: string;
    hash: string;
    iterationen: number;
}
export interface Startstand {
    userId: string;
    me: StartMe;
    gemerktAm: string;
    regeln: StartOhneNetzEinstellungen;
    pin: PinHash | null;
    fehlversuche: number;
}
export type StartstandErgebnis = {
    art: 'ok';
    stand: Startstand;
} | {
    art: 'keiner';
} | {
    art: 'verfallen';
    anzeigename: string;
} | {
    art: 'aus';
} | {
    art: 'pin_fehlt';
    anzeigename: string;
};
