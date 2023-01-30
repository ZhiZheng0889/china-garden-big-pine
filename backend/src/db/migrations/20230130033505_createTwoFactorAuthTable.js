/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('two_factor_authentication', (table) => {
      table.increments('two_factor_authentication_id').primary();
      table.text('email').unsigned().notNullable();
      table
      .foreign('email')
      .references('email')
      .inTable('users');
      table.text('password').notNullable();
      table.text('secret').notNullable();

      table.timestamps(true, true);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('two_factor_authentication');
  };
  