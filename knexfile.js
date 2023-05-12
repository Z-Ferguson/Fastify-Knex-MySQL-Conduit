// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const configs = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "password",
      database: "conduit",
      port: "5432",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./knex/migrations",
    },
    seeds: {
      directory: "./knex/seeds",
    },
  },
};

module.exports = configs;
