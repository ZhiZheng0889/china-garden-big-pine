/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('order_items', (table) => {
    table
      .integer('order_id')
      .notNullable()
      .references('order_id')
      .onDelete('CASCADE')
      .inTable('orders');
    table
      .integer('food_id')
      .notNullable()
      .references('food_id')
      .inTable('foods');
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
