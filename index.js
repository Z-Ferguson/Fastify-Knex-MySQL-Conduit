const getConfig = require("./src/config/index");
const startServer = require("./src/app");
const fastify = require("fastify")();

const main = async () => {
  process.on("unhandledRejection", (err) => {
    console.error(err);
    process.exit(1);
  });
  const config = await getConfig();

  const server = require("fastify")(config.fastifyInit);
  server.register(startServer, config);
  // server.log.info(config);
  const address = await server.listen(config.fastify);
  server.log.info(`Server running at: ${address}`);
};

main();
