/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('order_items', (table) => {
    table
      .integer('order_id')
      .references('order_id')
      .inTable('orders')
      .onDelete('CASCADE');
    table.integer('food_id').references('food_id').inTable('foods');
    table
      .integer('food_option_id')
      .references('food_option_id')
      .inTable('food_options')
      .nullable();
    table
      .integer('food_size_id')
      .references('food_size_id')
      .inTable('food_sizes')
      .nullable();
    table
      .integer('food_amount_id')
      .references('food_amount_id')
      .inTable('food_amounts')
      .nullable();
    table.string('requests', 500).nullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('order_items');
};
