/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('reviews', (table) => {
    table.increments('review_id').primary();
    table.integer('user_id').unsigned().notNullable();
    table
      .foreign('user_id')
      .references('user_id')
      .inTable('users')
      .onDelete('CASCADE');
    table.string('first_name').unsigned().notNullable();
    table
      .foreign('first_name')
      .references('first_name')
      .inTable('users')
      .onDelete('CASCADE');
    table.string('last_name').unsigned().notNullable();
    table
      .foreign('last_name')
      .references('last_name')
      .inTable('users')
      .onDelete('CASCADE');
    table.text('body').nullable();
    table.integer('rating');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('reviews');
};
