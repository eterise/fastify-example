/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FastifyInstance } from 'fastify';

import * as controllers from '../controllers/index.js';
import { createUserSchema, loginSchema } from '../schema/index.js';

export const userRouter = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'POST',
    url: '/users/signup',
    schema: createUserSchema,
    handler: controllers.createUser,
  });

  fastify.route({
    method: 'POST',
    url: '/users/signin',
    schema: loginSchema,
    handler: controllers.login,
  });
  
  fastify.route({
    method: 'GET',
    url: '/users',
    handler: controllers.getUsers
  })
};
