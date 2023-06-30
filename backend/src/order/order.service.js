const Food = require("../db/models/foodModel");
const Order = require("../db/models/orderModel");
const User = require("../db/models/userModel");
const fs = require("fs").promises;
const Closed = require("../db/models/closedModel");
const path = require("path");
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

let startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

let endOfToday = new Date();
endOfToday.setHours(23, 59, 59, 999);

function getOrdersByPhoneNumber(phoneNumber) {
  return Order.find({
    phoneNumber,
    createdAt: {
      $gte: startOfToday,
      $lt: endOfToday,
    },
  }).exec();
}

/*
 * Retrieve a list of orders for a user, ordered by creation date (descending)
 * @returns Promise<Order[]>
 */
function listOrdersByUserId(user_id) {
  return Order.find({ user_id }).sort({ createdAt: -1 }).exec();
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

function getClosedHours(date) {
  return Closed.findOne({ date }).exec();
}

async function getOperationHours() {
  const hours = await fs.readFile(
    path.resolve(__dirname, "../db/data/hours.json"),
    "utf-8"
  );
  console.log("hours: ", hours);
  return JSON.parse(hours);
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
  listOrdersByUserId,
  listFoodsWithFoodIds,
  deleteOrder,
  getClosedHours,
  getOperationHours,
  getOrdersByPhoneNumber,
};
