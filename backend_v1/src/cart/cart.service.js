const mongoose = require("mongoose");
const Cart = require("../db/models/cartModel");
const Food = require("../db/models/cartModel");
function getCartById(_id) {
  return Cart.findById(_id);
}

function addCartItem(cart) {
  return Cart.findOneAndUpdate(cart._id, cart);
}

function createCart() {
  return Cart.create();
}

function getFoodItemById(food_id) {
  return Food.findById(new mongoose.Types.ObjectId(food_id));
}

module.exports = {
  getCartById,
  addCartItem,
  createCart,
  getFoodItemById,
};
