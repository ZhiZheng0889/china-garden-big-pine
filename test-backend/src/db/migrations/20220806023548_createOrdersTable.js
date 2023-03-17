/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('orders', (table) => {
    table.increments('order_id').primary().notNullable();
    table.text('phone_number').nullable();
    table.text('email').nullable();
    table.integer('user_id').unsigned().nullable();
    table.foreign('user_id').references('user_id').inTable('users');
    table.boolean('is_complete').defaultTo(0);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('orders');
};
