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
