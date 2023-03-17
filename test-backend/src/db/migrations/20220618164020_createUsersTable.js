/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('user_id').primary();
    table.string('email').unique().notNullable();
    table.string('first_name').notNullable();
    table.string('last_name').nullable();
    table.boolean('isAdmin').nullable();
    table.text('phone_number').unique().notNullable();
    table.text('password').notNullable();
    table.boolean('email_is_verified').defaultTo(0);
    table.boolean('phone_number_is_verified').defaultTo(0);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
