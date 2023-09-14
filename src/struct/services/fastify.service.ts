import Fastify from "fastify";
import type { CreateFastifyOptions, FastifyPlugin } from "src/types/types.js";

export class FastifyService {
  private fastify: ReturnType<typeof this.createNewFastify>;

  constructor(opts?: CreateFastifyOptions) {
    this.fastify = this.createNewFastify(opts);
  }

  public async listen(opts: Fastify.FastifyListenOptions) {
    const address = await this.fastify.listen(opts).catch((err) => {
      this.fastify.log.error(err);
      process.exit(1);
    });

    console.log(`Server has started: ${address}`);

    //this.createTestPath();
  }

  public register(plugin: FastifyPlugin) {
    this.fastify.register(plugin);
  }

  private createNewFastify(opts?: CreateFastifyOptions) {
    return Fastify(opts);
  }
}

//TODO: ADD ERROR HANDLER
