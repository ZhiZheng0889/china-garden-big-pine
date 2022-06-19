/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('food_reviews', (table) => {
    table.increments('food_review_id').primary();
    table.integer('food_id').unsigned().notNullable();
    table
      .foreign('food_id')
      .references('food_id')
      .inTable('users')
      .onDelete('CASCADE');
    table.integer('user_id').unsigned().notNullable();
    table
      .foreign('user_id')
      .references('user_id')
      .inTable('users')
      .onDelete('CASCADE');
    table.boolean('like').defaultTo(false);
    table.boolean('dislike').defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('food_reviews');
};
