const knex = require('../db/connection');

const TABLE = 'foods';

function list() {
  return knex(TABLE).select('*');
}

function listByCategory(category) {
  return knex(TABLE).select('*').where({ category });
}

async function get(id) {
  const results = await knex('products').where({ id });
  return results[0]
}

module.exports = {
  list,
  listByCategory,
  
};
