/**
 * Routen des Beispielmoduls. Der Core registriert sie unter /api/v1 und kapselt sie mit der Modulwache: Ist das Modul
 * nicht installiert bzw. nicht aktiv, antwortet jede Route mit 403 (MODUL_NICHT_INSTALLIERT bzw. MODUL_NICHT_AKTIV).
 * Jede Route prüft ihre Rechte selbst (`requirePermission`) und erscheint mit `tags` in der OpenAPI-Beschreibung.
 *
 * Schreibende Routen: fachliche Änderung und Audit-Nachweis in einer Transaktion (`db.transaction`, `audit(tx, …)`). Lehnt die
 * Datenbank den Nachweis ab, wird auch die Änderung zurückgenommen und die Route antwortet mit einem Fehler – eine Änderung ohne
 * Nachweis entsteht nicht. (`audit(db, …)` außerhalb einer Transaktion protokolliert eigene Schreibfehler nur.)
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { asc, eq } from 'drizzle-orm';
import { istDemoName, modulRecht } from '@gm/core';
import { audit, notFound, requirePermission, todayIso } from '@gm/server/sdk';
import { faelligkeit, pruefpunktEingabeSchema, type PruefpunktAnsicht } from '@rk-modul/beispiel-core';
import { beispielPruefpunkte } from './db/eigen.js';

const RECHT = modulRecht('beispiel.pruefpunkte');
const TAGS = ['Beispielmodul'];
const idParam = z.object({ id: z.string().uuid() });

type Zeile = typeof beispielPruefpunkte.$inferSelect;

export function ansicht(z: Zeile, heute: string): PruefpunktAnsicht {
  const f = faelligkeit(z.letztePruefung, z.intervallTage, heute);
  return { id: z.id, bezeichnung: z.bezeichnung, intervallTage: z.intervallTage, letztePruefung: z.letztePruefung, kundeId: z.kundeId, isTest: z.isTest, ...f };
}

export const beispielRouten: FastifyPluginAsyncZod = async (app) => {
  const { db } = app;

  app.get('/beispiel/pruefpunkte', { preHandler: requirePermission(RECHT), schema: { tags: TAGS } }, async () => {
    const heute = todayIso();
    const zeilen = await db.select().from(beispielPruefpunkte).orderBy(asc(beispielPruefpunkte.bezeichnung));
    return zeilen.map((z) => ansicht(z, heute));
  });

  app.post('/beispiel/pruefpunkte', { preHandler: requirePermission(RECHT), schema: { tags: TAGS, body: pruefpunktEingabeSchema } }, async (req, reply) => {
    const z = await db.transaction(async (tx) => {
      const [z] = await tx
        .insert(beispielPruefpunkte)
        .values({ bezeichnung: req.body.bezeichnung, intervallTage: req.body.intervallTage, kundeId: req.body.kundeId ?? null, isTest: istDemoName(req.body.bezeichnung) })
        .returning();
      await audit(tx, req, { aktion: 'pruefpunkt.angelegt', entitaet: 'pruefpunkt', entitaetId: z!.id });
      return z!;
    });
    return reply.code(201).send(ansicht(z, todayIso()));
  });

  app.post('/beispiel/pruefpunkte/:id/geprueft', { preHandler: requirePermission(RECHT), schema: { tags: TAGS, params: idParam } }, async (req) => {
    const heute = todayIso();
    const z = await db.transaction(async (tx) => {
      const [z] = await tx.update(beispielPruefpunkte).set({ letztePruefung: heute, updatedAt: new Date() }).where(eq(beispielPruefpunkte.id, req.params.id)).returning();
      if (!z) throw notFound('Prüfpunkt');
      await audit(tx, req, { aktion: 'pruefpunkt.geprueft', entitaet: 'pruefpunkt', entitaetId: z.id, details: { datum: heute } });
      return z;
    });
    return ansicht(z, heute);
  });
};
