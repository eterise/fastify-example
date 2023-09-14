import type { FastifyReply, FastifyRequest } from "fastify";

import type { CreateUserInput } from "#src/schema/index.js";
import { appContainer } from "#struct/containers/app.container.js";
import type { UserService } from "#struct/services/index.js";

export const user = async (
  req: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply
) => {
  const userService = appContainer.resolve<UserService>("usersService");

  //Temporarily incorrect error-codes
  if (!userService) {
    return reply.code(404).send("NOT FOUND BRO!");
  }

  const res = await userService.signup(req.body).catch((err) => {
    return reply
      .code(409)
      .send(err instanceof Error ? err.message : "Unknown error");
  });

  reply
    .code(200)
    .send(`Account was successfully created!: ${res.email} : ${res.password}`);
};
