/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema.createTable('OrderItems', (table) => {
      table.increments('OrderItems_Id').primary().notNullable();
      table.string('FoodID').notNullable();
      table.string('name').notNullable();
      table.money('price').notNullable();
      table.numeric('quantity').notNullable();

      table.timestamps(true, true);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('OrderItems');
  };
  