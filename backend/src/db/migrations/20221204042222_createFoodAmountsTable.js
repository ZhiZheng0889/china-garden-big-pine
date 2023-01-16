/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('food_amounts', (table) => {
    table.increments('food_amount_id').primary().notNullable();
    table
      .integer('food_id')
      .references('food_id')
      .inTable('foods')
      .onDelete('CASCADE');
    table.string('amount').notNullable();
    table.string('amount_size').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('food_amounts');
};
