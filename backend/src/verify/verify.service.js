const knex = require('../db/connection');
const TABLE = 'verify';

function readFromEmail(email) {
  return knex(TABLE).select('*').where({ email }).first();
}

function destroy(verify_id) {
  return knex(TABLE).where({ verify_id }).del();
}

module.exports = {
  readFromEmail,
  destroy,
};
