const knex = require('../db/connection');

/*
 * List orders in descending order
 * @returns Promise<Orders[]>
 */
function list() {
  return knex('orders').select('*');
}

/*
 * Check to see if array of food_ids exist in db
 * @returns Promise<Boolean>
 */
function isFood_idsValid(food_ids) {
  return knex('foods')
    .whereIn('food_id', food_ids)
    .then((rows) => {
      if (rows.length < food_ids.length) {
        const missingFood_ids = food_ids.filter(
          (food_id) => !rows.find((row) => row.food_id === food_id)
        );
        throw new Error(
          `The following food_ids do not exist in the "items" table: ${missingFood_ids}`
        );
      }
      return true;
    });
}

/*
 * reads one signle order
 * @returns Promise<Order[]>
 */

function read(order_id) {
  return knex('orders').select('*').where({ order_id }).first();
}

module.exports = {
  list,
  read,
  isFood_idsValid,
};
