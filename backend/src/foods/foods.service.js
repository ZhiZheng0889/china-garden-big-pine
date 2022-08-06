const knex = require('../db/connection');

const TABLE = 'foods';

/*
 * query database and list all items
 */
function list() {
  return knex(TABLE).select('*');
}

/*
 * query database and list all items based on category
 */
function listByCategory(category) {
  return knex(TABLE).select('*').where({ category });
}

/*
 * query database and get on item based on food_id
 */
function read(food_id) {
  return knex('products').select('*').where({ food_id }).first();
}

module.exports = {
  list,
  listByCategory,
  read,
};
