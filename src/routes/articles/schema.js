const S = require("fluent-json-schema");
// const profile = require("../profiles/schema");

const Article = S.object()
  .prop("slug", S.string())
  .prop("title", S.string())
  .prop("description", S.string())
  .prop("body", S.string())
  .prop("tagList", S.array().items(S.string()))
  .prop("createdAt", S.string())
  .prop("updatedAt", S.string())
  .prop("favorited", S.boolean())
  .prop("favoritesCount", S.number())
  //   .prop("author", profile.Profile);
  .required([
    "slug",
    "title",
    "description",
    "body",
    "tagList",
    "createdAt",
    "updatedAt",
    "favorited",
    "favoritesCount",
  ]);

const getArticle = {
  response: {
    200: S.object().prop("article", Article.ref()),
    404: S.object().prop("message", S.string()),
  },
};

const getArticles = {
  querystring: S.object()
    .prop("tag", S.string())
    .prop("author", S.string())
    .prop("favorited", S.string())
    .prop("limit", S.number())
    .prop("offset", S.number()),
  response: {
    200: S.object()
      .prop("articles", S.array().items(Article).ref())
      .prop("articlesCount", S.number().required()),
  },
};
const getFeed = {
  querystring: S.object().prop("limit", S.number()).prop("offset", S.number()),
  response: {
    200: S.object()
      .prop("articles", S.array().items(Article).ref())
      .prop("articlesCount", S.number().required()),
  },
};

const insert = {
  body: S.object().prop(
    "article",
    S.object()
      .prop("title", S.string().required())
      .prop("description", S.string().required())
      .prop("body", S.string().required())
      .prop("tagList", S.array().items(S.string()).required())
  ),
  response: {
    201: S.object().prop("article", Article.ref()),
  },
};

const update = {
  body: S.object().prop(
    "article",
    S.object()
      .prop("title", S.string())
      .prop("description", S.string())
      .prop("body", S.string())
  ),
  response: {
    200: S.object().prop("article", Article.ref()),
  },
};

const remove = {
  response: {
    404: S.object().prop("message", S.string()),
  },
};

module.exports = { getArticles, getArticle, getFeed, insert, update, remove };
