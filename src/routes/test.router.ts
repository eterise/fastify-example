import type { FastifyInstance } from "fastify";

import * as controllers from "../controllers/index.js";

export const testRouter = async (fastify: FastifyInstance) => {
  //fastify.decorateRequest('test', '')

  fastify.route({
    method: "GET",
    url: "/",
    handler: controllers.test,
  });
};
