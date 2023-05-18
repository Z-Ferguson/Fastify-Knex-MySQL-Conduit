/**
 * @param { import("knex").Knex } knex
 */
module.exports = function (knex) {
  return {
    getAllUser: async function () {
      try {
        return await knex.select("*").table("users");
      } catch (error) {
        console.error("Error retrieving users:", error);
        throw error; // Rethrow the error to handle it further up the call stack
      }
    },
  };
};
