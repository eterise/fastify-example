import fp from 'fastify-plugin';
import type { FastifyPluginAsync } from 'fastify';
import { PrismaClient } from '@prisma/client';


declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export const prismaPlugin: FastifyPluginAsync = fp(async (server, opts) => {
  const prisma = new PrismaClient();
  await prisma.$connect();

  server.decorate('prisma', prisma);
  server.addHook('onClose', async (server) => {
    await server.prisma.$disconnect();
  });
});
