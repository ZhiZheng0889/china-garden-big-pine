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
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
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
