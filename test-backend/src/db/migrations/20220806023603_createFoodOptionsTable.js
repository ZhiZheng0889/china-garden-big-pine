/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('food_options', (table) => {
    table.increments('food_option_id').primary().notNullable();
    table.integer('food_id').unsigned().notNullable();
    table
      .foreign('food_id')
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
