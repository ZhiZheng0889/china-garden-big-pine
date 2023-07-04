const Cart = require("../db/models/cartModel");
const Food = require("../db/models/foodModel");

function getCartById(_id) {
  return Cart.findById(_id);
}

function addCartItem(cart) {
  return Cart.findOneAndUpdate(cart._id, cart, { new: true });
}

function updateCart(cart) {
  return Cart.findOneAndUpdate(cart._id, cart, { new: true });
}

function createCart() {
  return Cart.create({ createdAt: new Date() });
}

function getFoodItemById(food_id) {
  return Food.findById(food_id);
}

module.exports = {
  getCartById,
  addCartItem,
  createCart,
  getFoodItemById,
  updateCart,
};
