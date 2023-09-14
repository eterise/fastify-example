import { testRouter, userRouter } from "./routes/index.js";
import { FastifyService } from "./struct/services/fastify.service.js";

const service = new FastifyService();

service.init({ port: 3000 });
service.registerMany([testRouter, userRouter]);

//TODO: ADD PRISMA
//TODO: ADD POSTS
//TODOL ADD CONSTANT FOLDER INTO HELPERS (WITH CODES, ERRORS ETC)
//TODO: TRY TO USE ZOD
