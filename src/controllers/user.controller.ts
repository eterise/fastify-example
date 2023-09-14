import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateUserInput } from "src/types/types.js";

export const user = async (
  req: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply
) => {
  reply
    .code(200)
    .send(
      `Account was successfully created!: ${req.body.email} : ${req.body.password}`
    );
};
