/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("foods", (table) => {
    table.increments("food_id").primary().notNullable();
    table.string("name").notNullable();
    table.float("base_price");
    table.string("category").notNullable();
    table.string("description").nullable();
    table.boolean("spicy").defaultTo(0);
    table.boolean("available").defaultTo(1);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("foods");
};
