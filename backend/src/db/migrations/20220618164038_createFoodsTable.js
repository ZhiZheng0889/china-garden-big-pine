/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('foods', (table) => {
    table.increments('food_id').primary();
    table.string('name').notNullable();
    table.float('price', 2).notNullable();
    table.string('category').notNullable();
    table.boolean('spicy').defaultTo(0);
    table.boolean('available').defaultTo(1);
    table.string('size').nullable();
    table.integer('amount').nullable();
    table.specificType('options', 'text ARRAY');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('foods');
};
