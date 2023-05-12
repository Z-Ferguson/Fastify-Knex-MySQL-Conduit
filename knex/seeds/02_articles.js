const { faker } = require("@faker-js/faker");

/**
 * Added a prefix of 02 to make sure users are created first
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("articles").del();
  await knex("articles").insert(
    Array.from({ length: 5 }, (v, i) => {
      const description = faker.lorem.sentences();
      return {
        id: i,
        slug: faker.lorem.slug(),
        title: faker.lorem.sentence(),
        description: description.slice(0, 255), // truncate to 255 characters
        body: faker.lorem.paragraphs(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        author: i,
      };
    })
  );
};
