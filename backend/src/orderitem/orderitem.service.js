const knex = require('../db/connection');

const TABLE = 'foods';

function list() {
  return knex(TABLE).select('*');
}

function listByCategory(category) {
  return knex(TABLE).select('*').where({ category });
}

module.exports = {
  list,
  listByCategory,
};