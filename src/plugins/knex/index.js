"use strict";

const fp = require("fastify-plugin");
const knex = require("knex");

async function fastifyKnexJS(fastify, options, next) {
  try {
    const handler = knex(options.knex);
    // this will force migration and seed to run before the server starts

    // fastify.log.info({ knexOptions: options.knex }, "Config");
    // await handler.migrate.latest();
    // await handler.seed.run();

    // Enable query logging
    // handler.on("query", (queryData) => {
    //   fastify.log.info({ query: queryData.sql });
    //   fastify.log.info({ bindings: queryData.bindings });
    // });

    fastify.decorate("knex", handler).addHook("onClose", (instance, done) => {
      /* istanbul ignore else */
      if (instance.knex === handler) {
        instance.knex.destroy();
        delete instance.knex;
      }

      done();
    });

    // Test the database connection
    handler
      .raw("SELECT 1")
      .then(() => {
        fastify.log.info("Database connection successful");
        // Perform other database operations or start your application
      })
      .catch((error) => {
        fastify.log.error("Error connecting to the database:", error);
        // Handle the error or terminate the application
      });

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = fp(fastifyKnexJS, ">=0.30.0");
