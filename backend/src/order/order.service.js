const Food = require("../db/models/foodModel");
const Order = require("../db/models/orderModel");

/*
 * List orders in descending order
 * @returns Promise<Orders[]>
 */
function list() {
  return Order.find().sort({ created_at: -1 }).exec();
}

/*
 * Check to see if array of food_ids exist in db
 * @returns Promise<Boolean>
 */
async function isFood_idsValid(food_ids) {
  const foods = await Food.find({ _id: { $in: food_ids } }, "_id").exec();
  return foods.length === food_ids.length;
}

/*
 * Create a new order
 * @returns Promise<Order>
 */
function createOrder(order) {
  console.log(order);
  return Order.create(order);
}

/*
 * Read a single order by order_id
 * @returns Promise<Order>
 */
function read(order_id) {
  return Order.findById(order_id).exec();
}

/*
 * Read the items in an order's cart by order_id
 * @returns Promise<OrderItem[]>
 */
function readCart(order_id) {
  return Order.findById(order_id, "cart")
    .populate("cart.food_id", "name price")
    .populate("cart.selectedFoodOption", "name price")
    .populate("cart.selectedFoodSize", "name price")
    .exec();
}

/*
 * Retrieve food information for a list of food_ids
 * @returns Promise<Food[]>
 */
function foodsFromCart(food_ids) {
  return Food.find({ _id: { $in: food_ids } }).exec();
}

/*
 * Retrieve option information for a list of food_option_ids
 * @returns Promise<FoodOption[]>
 */
function optionsFromCart(food_option_ids) {
  return FoodOption.find({ _id: { $in: food_option_ids } }).exec();
}

/*
 * Retrieve size information for a list of food_size_ids
 * @returns Promise<FoodSize[]>
 */
function sizesFromCart(food_size_ids) {
  return FoodSize.find({ _id: { $in: food_size_ids } }).exec();
}

/*
 * Read a user by user_id
 * @returns Promise<User>
 */
function readUser(user_id) {
  return User.findById(user_id).exec();
}

/*
 * Retrieve a user by user_id
 * @returns Promise<User>
 */
function getUser(user_id) {
  return User.findById(user_id).exec();
}

/*
 * Retrieve a list of orders for a user, ordered by creation date (descending)
 * @returns Promise<Order[]>
 */
function listUserOrders(user_id) {
  return Order.find({ user_id }).sort({ created_at: -1 }).exec();
}

/*
 * Retrieve a list of foods that match a list of food_ids
 * @returns Promise<Food[]>
 */
function listFoodsWithFoodIds(food_ids) {
  return Food.find({ _id: { $in: food_ids } }).exec();
}

async function deleteOrder(order_id) {
  return await OrderModel.findByIdAndDelete(order_id).exec();
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
  listFoodsWithFoodIds,
  deleteOrder,
};
