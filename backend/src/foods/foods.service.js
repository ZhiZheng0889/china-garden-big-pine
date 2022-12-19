const knex = require('../db/connection');

const TABLE = 'foods';
const FOOD_AMOUNTS_TABLE = 'food_amounts';
const FOOD_OPTIONS_TABLE = 'food_options';
const FOOD_SIZES_TABLE = 'food_sizes';
function listSizes() {
  return knex(FOOD_SIZES_TABLE).select('*');
}
function listOptions() {
  return knex(FOOD_OPTIONS_TABLE).select('*');
}
function listAmounts() {
  return knex(FOOD_AMOUNTS_TABLE).select('*');
}
/*
 * query database and list all items
 */
function list() {
  return knex('foods').select('*');
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
  return knex(TABLE).select('*').where({ food_id }).first();
}

function search(text) {
  return knex(TABLE).select('*').whereILike('name', `%${text}%`);
}

module.exports = {
  list,
  listAmounts,
  listSizes,
  listOptions,
  listByCategory,
  read,
  search,
};
