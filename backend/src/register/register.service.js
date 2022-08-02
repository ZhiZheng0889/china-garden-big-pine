const knex = require('../db/connection');

function read(email) {
  return knex('users').select('*').where({ email }).first();
}

function create(user) {
  return knex('users').insert(user).returning('*');
}

module.exports = {
  read,
  create,
};
