import type { FastifyReply, FastifyRequest } from 'fastify';

import { appContainer } from '#struct/containers/app.container.js';
import type { UserService } from '#struct/services/index.js';
import type { CreateUserInput, LoginInput } from '#types/types.js';

export const getUsers = async (req: FastifyRequest, reply: FastifyReply) => {
  const userService = appContainer.resolve<UserService>('usersService');

  if (!userService) {
    return reply.code(404).send('NOT FOUND BRO!');
  }

  const users = await userService.findMany();
  reply.code(200).send(users);
};

export const createUser = async (req: FastifyRequest<{ Body: CreateUserInput }>, reply: FastifyReply) => {
  const userService = appContainer.resolve<UserService>('usersService');

  //Temporarily incorrect error-codes
  if (!userService) {
    return reply.code(404).send('NOT FOUND BRO!');
  }

  const res = await userService.signup(req.body).catch((err) => {
    return reply.code(409).send(err instanceof Error ? err.message : 'Unknown error');
  });

  reply.code(200).send(`Account was successfully created!: ${res.email} : ${res.password}`);
};

export const login = async (req: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) => {
  const userService = appContainer.resolve<UserService>('usersService');

  //Temporarily incorrect error-codes
  if (!userService) {
    return reply.code(404).send('NOT FOUND BRO!');
  }

  const res = await userService.signin(req.body).catch((err) => {
    return reply.code(409).send(err instanceof Error ? err.message : 'Unknown error');
  });

  reply.code(200).send(`Successfully logged in!: ${res.email} : ${res.password}`);
};
