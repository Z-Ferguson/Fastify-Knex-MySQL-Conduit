const fp = require("fastify-plugin");
const schema = require("./schema");

// SEE https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints

async function profiles(server, options, done) {
  const articlesModel = require("../../models/articles")(server.knex);

  server.route({
    method: "GET",
    path: options.prefix + "articles",
    // onRequest: server.authenticate_optional,
    // schema: schema.getArticles,
    handler: onGetArticlesAll,
  });
  async function onGetArticlesAll(req, reply) {
    return await articlesModel.getArticlesAll();
  }

  server.route({
    method: "GET",
    path: options.prefix + "articles/:slug",
    // onRequest: server.authenticate_optional,
    // schema: schema.getArticle,
    handler: onGetArticle,
  });
  async function onGetArticle(req, reply) {
    const currid = req.user ? req.user.id : "";
    const article = await articlesModel.getArticle(currid, req.params.slug);
    if (!article) {
      reply.code(404).send({ message: "not found" });
    } else {
      return { article };
    }
  }

  done();
}

module.exports = fp(profiles);
