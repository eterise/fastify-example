import { controllersPlugin } from './plugins/controllers.js';
import { testRouter, userRouter } from './routes/index.js';
import { FastifyService } from './struct/services/fastify.service.js';


const service = new FastifyService();

const build = async () => {
  service.register(controllersPlugin);
  service.registerMany([testRouter, userRouter]);
  await service.init({ port: 3000 });
};

build();

//TODO: ADD PRISMA
//TODO: ADD POSTS
//TODOL ADD CONSTANT FOLDER INTO HELPERS (WITH CODES, ERRORS ETC)
//TODO: TRY TO USE ZOD
