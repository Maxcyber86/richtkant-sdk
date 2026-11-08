import type { DB } from './db/client.js';
import type { SessionUser } from './auth/session.js';
import type { Ctx } from './services/context.js';
declare module 'fastify' {
    interface FastifyInstance {
        db: DB;
        ctx: Ctx;
    }
    interface FastifyRequest {
        user: SessionUser | null;
        kundenansicht: boolean;
    }
}
