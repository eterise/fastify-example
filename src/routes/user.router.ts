/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FastifyInstance } from 'fastify';

import { createUserSchema, loginSchema } from '../schema/index.js';

export const userRouter = async (fastify: FastifyInstance) => {
  const { user } = fastify.controllers;

  fastify.route({
    method: 'POST',
    url: '/users/signup',
    schema: createUserSchema,
    handler: user.create,
  });

  fastify.route({
    method: 'POST',
    url: '/users/signin',
    schema: loginSchema,
    handler: user.login,
  });

  fastify.route({
    method: 'GET',
    url: '/users',
    handler: user.users,
  });
};
