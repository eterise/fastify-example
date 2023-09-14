import type { FastifyInstance } from "fastify";

import * as controllers from "../controllers/index.js";
import { createUserSchema } from "../schema/index.js";

export const userRouter = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/users/signup",
    schema: createUserSchema,
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
