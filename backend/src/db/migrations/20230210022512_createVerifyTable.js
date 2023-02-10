/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('verify', (table) => {
    table.increments('verify_id').primary();
    table.string('email').unsigned().notNullable().unique();
    table
      .foreign('email')
      .references('email')
      .inTable('users')
      .onDelete('CASCADE');
    table.text('secret');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('verify');
};
