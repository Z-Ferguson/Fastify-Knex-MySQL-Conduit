/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (table) {
      table.increments("id").primary();
      table.string("email").unique().notNullable();
      table.string("username").unique().notNullable();
      table.string("image").defaultTo("");
      table.text("bio").defaultTo("");
      table.string("password").notNullable();
      table.timestamps(true, true);
    })
    .createTable("articles", function (table) {
      table.increments("id").primary();
      table.string("slug").unique().notNullable();
      table.string("title").notNullable();
      table.text("body").notNullable();
      table.string("description").notNullable();
      table.integer("favorites_count").defaultTo(0).notNullable();
      table.integer("author").unsigned().notNullable();
      table.foreign("author").references("users.id").onDelete("CASCADE");
      table.timestamps(true, true);
    })
    .createTable("comments", function (table) {
      table.increments("id").primary();
      table.text("body").notNullable();
      table.integer("author").unsigned().notNullable();
      table.foreign("author").references("users.id").onDelete("CASCADE");
      table.integer("article").unsigned().notNullable();
      table.foreign("article").references("articles.id").onDelete("CASCADE");
      table.timestamps(true, true);
    })
    .createTable("favorites", function (table) {
      table.increments("id").primary();
      table.integer("user").unsigned().notNullable();
      table.foreign("user").references("users.id").onDelete("CASCADE");
      table.integer("article").unsigned().notNullable();
      table.foreign("article").references("articles.id").onDelete("CASCADE");
      table.timestamps(true, true);
    })
    .createTable("followers", function (table) {
      table.increments("id").primary();
      table.integer("user").unsigned().notNullable();
      table.foreign("user").references("users.id").onDelete("CASCADE");
      table.integer("follower").unsigned().notNullable();
      table.foreign("follower").references("users.id").onDelete("CASCADE");
      table.unique(["user", "follower"]);
      table.timestamps(true, true);
    })
    .createTable("tags", function (table) {
      table.increments("id").primary();
      table.string("name").unique().notNullable();
      table.timestamps(true, true);
    })
    .createTable("articles_tags", function (table) {
      table.increments("id").primary();
      table.integer("article").unsigned().notNullable();
      table.foreign("article").references("articles.id").onDelete("CASCADE");
      table.integer("tag").unsigned().notNullable();
      table.foreign("tag").references("tags.id").onDelete("CASCADE");
      table.unique(["tag", "article"]);
      table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("articles_tags")
    .dropTableIfExists("tags")
    .dropTableIfExists("followers")
    .dropTableIfExists("favorites")
    .dropTableIfExists("comments")
    .dropTableIfExists("articles")
    .dropTableIfExists("users");
};
