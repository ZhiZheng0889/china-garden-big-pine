/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('order_items', (table) => {
    table.integer('order_id').unsigned().notNullable();
    table
      .foreign('order_id')
      .references('order_id')
      .inTable('orders')
      .onDelete('CASCADE');
    table.integer('food_id').unsigned().notNullable();
    table.foreign('food_id').references('food_id').inTable('foods');
    table.integer('food_option_id').unsigned().nullable();
    table
      .foreign('food_option_id')
      .references('food_option_id')
      .inTable('food_options');
    table.integer('food_size_id').unsigned().nullable();
    table
      .foreign('food_size_id')
      .references('food_size_id')
      .inTable('food_sizes');
    table.integer('food_amount_id').unsigned().nullable();
    table
      .foreign('food_amount_id')
      .references('food_amount_id')
      .inTable('food_amounts');
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
