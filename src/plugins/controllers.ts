import fp from 'fastify-plugin';

import { UserController } from '#src/controllers/index.js';
import type { FastifyPlugin } from '#src/types/types.js';

declare module 'fastify' {
  interface FastifyInstance {
    controllers: {
      user: UserController;
    };
  }
}

export const controllersPlugin: FastifyPlugin = fp((f, opts, done) => {
  f.decorate('controllers', {
    user: new UserController(),
  });

  done();
});
