const slug = require("slug");

/**
 * @param { import("knex").Knex } knex
 */
module.exports = function (knex) {
  function articleMap(article) {
    article.author = {
      username: article.username,
      bio: article.bio,
      image: article.image,
      following: !!article.following,
    };
    delete article.username;
    delete article.bio;
    delete article.image;
    delete article.following;
    article.favorited = article.favorited > 0;
    article.tagList = article.tagList ? article.tagList.split(",") : [];
    article.tagList.sort();
    article.updatedAt = new Date(article.updatedAt).toISOString();
    article.createdAt = new Date(article.createdAt).toISOString();
    return article;
  }

  return {
    getArticlesAll: async function () {
      const query = knex("articles");
      query.select(
        "articles.id",
        "articles.slug",
        "articles.title",
        "articles.description",
        "articles.body",
        "articles.created_at as createdAt",
        "articles.updated_at as updatedAt"
      );

      const articles = await query;
      articles.map(articleMap);
      return { articles };
    },

    getArticle: async function (userId, slug) {
      const query = knex("articles")
        .where("articles.slug", slug)
        .orderBy("articles.created_at", "desc");

      query
        .select(
          "articles.id",
          "articles.slug",
          "articles.title",
          "articles.description",
          "articles.body",
          "articles.created_at as createdAt",
          "articles.updated_at as updatedAt"
        )
        .groupBy("articles.id");

      const articles = await query;
      articles.map(articleMap);
      return articles[0] || null;
    },
  };
};
