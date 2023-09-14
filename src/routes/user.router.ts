import type { FastifyInstance } from "fastify";

import { $ref } from "#src/schema/index.js";

import * as controllers from "../controllers/index.js";

export const userRouter = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/users/signup",
    schema: {
      body: $ref('createUserSchema'),
      response: {
        201: $ref('createUserResponseSchema')
      }
    },
    handler: controllers.user,
  });

  /*
  fastify.route({
    method: "POST",
    url: "/users/signin",
    schema: createUserSchema,
    handler: controllers.user,
  });
  */
};
