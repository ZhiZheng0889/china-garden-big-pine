const Food = require("../db/models/foodModel");
const Order = require("../db/models/orderModel");
const User = require("../db/models/userModel");
/*
 * List orders in descending order
 * @returns Promise<Orders[]>
 */
function list() {
  // return knex('orders').select('*');
}

/*
 * Check to see if array of food_ids exist in db
 * @returns Promise<Boolean>
 */
function isFood_idsValid(food_ids) {
  // return knex('foods')
  //   .whereIn('food_id', food_ids)
  //   .then((rows) => {
  //     if (rows.length < food_ids.length) {
  //       const missingFood_ids = food_ids.filter(
  //         (food_id) => !rows.find((row) => row.food_id === food_id)
  //       );
  //       throw new Error(
  //         `The following food_ids do not exist in the "items" table: ${missingFood_ids}`
  //       );
  //     }
  //     return true;
  //   });
}

function createOrder(order) {
  return Order.insert(order);
}

/*
 * reads one signle order
 * @returns Promise<Order[]>
 */

function read(order_id) {
  // return knex('orders').select('*').where({ order_id }).first();
}

function readCart(order_id) {
  // return knex('order_items').select('*').where({ order_id });
}

function foodsFromCart(food_ids) {
  // return knex('foods').select('*').whereIn('food_id', food_ids);
}

function optionsFromCart(food_option_ids) {
  // return knex('food_options')
  // .select('*')
  // .whereIn('food_option_id', food_option_ids);
}

function sizesFromCart(food_size_ids) {
  // return knex('food_sizes').select('*').whereIn('food_size_id', food_size_ids);
}

function readUser(_id) {
  return User.findOne({ _id });
}

function listUserOrders(user_id) {
  // return knex('orders')
  // .select('*')
  // .where({ user_id })
  // .orderBy('created_at', 'desc')
  // .limit(10);
}
function listFoodsWithFoodIds(food_ids) {
  return Food.find({ _id: { $in: food_ids } });
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
  listUserOrders,
  listFoodsWithFoodIds,
};
