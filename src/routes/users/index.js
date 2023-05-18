const fp = require("fastify-plugin");
const schema = require("./schema");
const createError = require("http-errors");
const { isUndefined } = require("knex/lib/util/is");

// SEE https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints

async function users(server, options, done) {
  const userModel = require("../../models/users")(server.knex);
  async function createToken(user, reply) {
    return await reply.jwtSign({ id: user.id, username: user.username });
  }

  server.route({
    method: "GET",
    path: options.prefix + "users/all",
    // onRequest: server.authenticate,
    // schema: schema.get,
    handler: onGet,
  });
  async function onGet(req, reply) {
    try {
      const users = await userModel.getAllUser();
      server.log.info("made it");
      return users;
    } catch (error) {
      reply.code(500).send({ error: "Internal Server Error" });
    }
  }

  done();
}
module.exports = fp(users);
