/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('food_amounts', (table) => {
    table
      .integer('food_id')
      .references('food_id')
      .inTable('foods')
      .notNullable();
    table.string('amount').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('food_amounts');
};
