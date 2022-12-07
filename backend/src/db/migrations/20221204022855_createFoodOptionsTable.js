/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('food_options', (table) => {
    table
      .integer('food_id')
      .references('food_id')
      .inTable('foods')
      .onDelete('CASCADE');
    table.string('option').notNullable();
    table.float('upcharge').defaultTo(0);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('food_options');
};
