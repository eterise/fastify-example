import { testRouter, userRouter } from "./routes/index.js";
import { FastifyService } from "./struct/services/fastify.service.js";

const service = new FastifyService();
service.listen({ port: 3000 });

service.register(testRouter)
service.register(userRouter)