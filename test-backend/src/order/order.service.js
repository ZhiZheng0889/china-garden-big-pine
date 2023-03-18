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

function createOrder(order) {
  const { phone_number = null, email = null, user_id, cart } = order;
  return knex.transaction(async (trx) => {
    try {
      const order = await trx('orders')
        .insert({
          phone_number,
          email,
          user_id,
        })
        .returning('*')
        .then((_) => _[0]);
      cart.forEach((item) => (item.order_id = order.order_id));
      const order_items = await trx('order_items').insert(cart).returning('*');
      return { order_id: order.order_id };
    } catch (error) {
      console.log('error: ', error);
      throw new error(error);
    }
  });
}

/*
 * reads one signle order
 * @returns Promise<Order[]>
 */

function read(order_id) {
  return knex('orders').select('*').where({ order_id }).first();
}

function readCart(order_id) {
  return knex('order_items').select('*').where({ order_id });
}

function foodsFromCart(food_ids) {
  return knex('foods').select('*').whereIn('food_id', food_ids);
}

function optionsFromCart(food_option_ids) {
  return knex('food_options')
    .select('*')
    .whereIn('food_option_id', food_option_ids);
}

function sizesFromCart(food_size_ids) {
  return knex('food_sizes').select('*').whereIn('food_size_id', food_size_ids);
}

function readUser(user_id) {
  return knex('users').select('*').where({ user_id }).first();
}

function getUser(user_id) {
  return knex('users').select('*').where({ user_id }).first();
}

function listUserOrders(user_id) {
  return knex('orders')
    .select('*')
    .where({ user_id })
    .orderBy('created_at', 'desc')
    .limit(10);
}

module.exports = {
  list,
  read,
  isFood_idsValid,
  createOrder,
  readCart,
  foodsFromCart,
  readUser,
  optionsFromCart,
  sizesFromCart,
  getUser,
  listUserOrders,
};