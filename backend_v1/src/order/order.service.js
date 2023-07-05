const Cart = require("../db/models/cartModel");
const Order = require("../db/models/orderModel");
const fs = require("fs").promises;
const Holiday = require("../db/models/holidayModel");
const path = require("path");

function getCartById(_id) {
  return Cart.findById(_id);
}

function getOrderById(_id) {
  return Order.findById(_id);
}

function getOrdersByPhoneNumber(phoneNumber) {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  return Order.find({
    phoneNumber,
    createdAt: {
      $gte: startOfToday,
      $lt: endOfToday,
    },
  }).exec();
}

function destroyCartById(_id) {
  return Cart.findById(_id).findOneAndRemove().exec();
}

function createOrder(order) {
  return Order.create(order);
}

async function getOperationHours() {
  const hours = await fs.readFile(
    path.resolve(__dirname, "../db/data/hours.json"),
    "utf-8"
  );
  console.log(hours);
  return JSON.parse(hours);
}

function getClosedHours(date) {
  return Holiday.findOne({ date }).exec();
}

module.exports = {
  getCartById,
  getOrderById,
  destroyCartById,
  createOrder,
  getOrdersByPhoneNumber,
  getOperationHours,
  getClosedHours,
};
