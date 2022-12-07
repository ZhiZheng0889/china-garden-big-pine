/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('food_sizes', (table) => {
    table
      .integer('food_id')
      .references('food_id')
      .inTable('foods')
      .onDelete('CASCADE')
      .notNullable();
    table.string('size').notNullable();
    table.float('upcharge').defaultTo(0);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('food_sizes');
};
