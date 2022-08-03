/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema.createTable('OrderItems', (table) => {
      table.increments('OrderItems_Id').primary().notNullable();
      table.integer('user_id').index().references('user_id').inTable('users');
      table.string('food_id').notNullable().index().references('user_id').inTable('users');
      table.string('name').notNullable().index().references('food_id').inTable('foods');
      table.money('price').notNullable().index().references('price').inTable('foods');
      table.numeric('quantity').notNullable();
      table.string('status');
      table.timestamp('created_at').defaultTo(knex.raw('now()'));
      table.timestamp('updated_at').nullable();
      table.timestamp('deleted').nullable();
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('OrderItems');
  };
  