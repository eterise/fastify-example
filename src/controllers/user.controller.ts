/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FastifyReply, FastifyRequest } from 'fastify';

import { LogRequest } from '#src/decorators/index.js';
import { appContainer } from '#struct/containers/app.container.js';
import type { UserService } from '#struct/services/index.js';
import type { CreateUserInput, LoginInput } from '#types/types.js';

/*
function UserServiceIncluded<T>() {
  return function (target: T, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (this: any, ...args: any[]) {
      const req = args[0] as FastifyRequest;

      console.log(req.ip);
      //TODO: Create a typeguard

      if (!req) throw new Error('Bad.');

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
*/

export class UserController {
  private userService: UserService | undefined;

  //TODO: REMOVE UNDEFINED
  constructor() {
    this.userService = appContainer.resolve<UserService>('usersService');
  }

  @LogRequest()
  public async users(req: FastifyRequest, reply: FastifyReply) {
    const userService = appContainer.resolve<UserService>('usersService');

    if (!userService) {
      return reply.code(404).send('NOT FOUND BRO!');
    }

    const users = await userService.findMany();
    reply.code(200).send(users);
  }

  public async create(req: FastifyRequest<{ Body: CreateUserInput }>, reply: FastifyReply) {
    const userService = appContainer.resolve<UserService>('usersService');
    //Temporarily incorrect error-codes
    if (!userService) {
      return reply.code(404).send('NOT FOUND BRO!');
    }

    const res = await userService.signup(req.body).catch((err) => {
      return reply.code(409).send(err instanceof Error ? err.message : 'Unknown error');
    });

    reply.code(200).send(`Account was successfully created!: ${res.email} : ${res.password}`);
  }

  public async login(req: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) {
    const userService = appContainer.resolve<UserService>('usersService');
    //Temporarily incorrect error-codes
    if (!userService) {
      return reply.code(404).send('NOT FOUND BRO!');
    }

    const res = await userService.signin(req.body).catch((err) => {
      return reply.code(409).send(err instanceof Error ? err.message : 'Unknown error');
    });

    reply.code(200).send(`Successfully logged in!: ${res.email} : ${res.password}`);
  }
}

//export const userController = new UserController();

/*
ARCHIVED:
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
*/
