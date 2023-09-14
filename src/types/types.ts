import Fastify from "fastify";
import type { IncomingMessage, Server, ServerResponse } from "http";

export type CreateFastifyOptions =
  | Fastify.FastifyHttpOptions<
      Server<typeof IncomingMessage, typeof ServerResponse>,
      Fastify.FastifyBaseLogger
    >
  | undefined;

export type FastifyPlugin = Fastify.FastifyPluginCallback<
  Fastify.FastifyPluginOptions,
  Fastify.RawServerDefault,
  Fastify.FastifyTypeProvider,
  Fastify.FastifyBaseLogger
>;