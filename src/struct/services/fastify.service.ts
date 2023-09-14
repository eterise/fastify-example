import Fastify from "fastify";
import type { CreateFastifyOptions, FastifyPlugin } from "src/types/types.js";

export class FastifyService {
  private fastify: ReturnType<typeof this.createNewFastify>;

  constructor(opts?: CreateFastifyOptions) {
    this.fastify = this.createNewFastify(opts);
  }

  public async init(listenOpts: Fastify.FastifyListenOptions) {
    this.setErrorHandler();

    await this.listen(listenOpts);
  }

  public registerMany(plugins: FastifyPlugin[]) {
    for (const plugin of plugins) {
      this.fastify.register(plugin);
    }
  }

  public register(plugin: FastifyPlugin) {
    this.fastify.register(plugin);
  }

  private async listen(opts: Fastify.FastifyListenOptions) {
    const address = await this.fastify.listen(opts).catch((err) => {
      this.fastify.log.error(err);
      process.exit(1);
    });

    console.log(`Server has started: ${address}`);
  }

  private setErrorHandler() {
    this.fastify.setErrorHandler((error, req, reply) => {
      if (error instanceof Fastify.errorCodes.FST_ERR_BAD_STATUS_CODE) {
        this.fastify.log.error(error);

        reply.status(500).send({ ok: false });
        return;
      }

      reply.send(error);
    });
  }

  private createNewFastify(opts?: CreateFastifyOptions) {
    return Fastify(opts);
  }
}
