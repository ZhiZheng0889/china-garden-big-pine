const Cart = require("../db/models/cartModel");
const Order = require("../db/models/orderModel");

function getCartById(_id) {
  return Cart.findById(_id);
}

function getOrderById(_id) {
  return Order.findById(_id);
}

function destroyCartById(_id) {
  return Cart.findById(_id).findOneAndRemove().exec();
}

function createOrder(order) {
  return Cart.create(order);
}

module.exports = {
  getCartById,
  getOrderById,
  destroyCartById,
  createOrder,
};
