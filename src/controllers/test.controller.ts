import type { FastifyReply, FastifyRequest } from "fastify";

export const test = async (req: FastifyRequest, reply: FastifyReply) => {
    reply.code(200).send('Hello world');
};
