import type { FastifyInstance } from "fastify";

import * as controllers from "../controllers/index.js";
import { createUserSchema } from "../schema/index.js";

export const userRouter = async (fastify: FastifyInstance) => {
  
  fastify.route({
    method: "POST",
    url: "/users/create",
    schema: createUserSchema,
    handler: controllers.user,
  });
};
