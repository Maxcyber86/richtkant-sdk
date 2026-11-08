/**
 * Konformität des Beispielmoduls gegen den Modulvertrag (Manifest, Registrierung, Migrationen, Hilfe, Versionsverlauf,
 * Laufzeit gegen einen minimalen Core: Installation, Aktivieren, Deaktivieren, Deinstallieren, Wiederherstellen).
 *
 * Das Modul-Testkit `@rk/modul-testkit` braucht den Richtkant Core und ist nicht Teil dieses Repositorys. Die Datei
 * läuft daher nur in der Testumgebung des Herstellers (siehe docs/Entwicklung-und-Test.md); mit diesem Repository
 * allein laufen die Fachtests unter core/test.
 */
import { konformitaetsSuite } from '@rk/modul-testkit';

konformitaetsSuite('beispiel');
