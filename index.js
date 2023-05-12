const getConfig = require("./src/config/index");
// const startServer = require("./src/server");
const startServer = require("./src/app");

const main = async () => {
  process.on("unhandledRejection", (err) => {
    console.error(err);
    process.exit(1);
  });
  const config = await getConfig();
  console.log(config);

  const server = require("fastify")(config.fastifyInit);
  server.register(startServer, config);

  const address = await server.listen(config.fastify);
  server.log.info(`Server running at: ${address}`);
};

main();
