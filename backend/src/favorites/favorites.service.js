const Order = require("../db/models/orderModel");
const User = require("../db/models/userModel");

function getUser(user_id) {
  return User.findById(user_id).exec();
}

function getUsersFavoriteOrders(user_id) {
  return Order.find({ user_id, isLiked: true })
    .sort({ createdAt: -1 })
    .limit(10);
}

function likeOrder(order_id) {}

function updateOrder(order_id, updatedOrder) {}

module.exports = {
  getUser,
  getUsersFavoriteOrders,
  updateOrder,
};
