const fs = require("fs");
const ORDER_DATA = JSON.parse(
  fs.readFileSync(`${__dirname}/orders.json`, "utf-8")
);
const DatabaseConfig = require("../config");
const mongoose = require("mongoose");
const Seeder = require("./Seeder.js");
const Food = require("../models/foodModel");
const Order = require("../models/orderModel");
const User = require("../models/userModel");
async function seed(env) {
  try {
    await mongoose.connect(DatabaseConfig.getDatabaseUri(env));
    const foodData = await Food.find();
    const userData = await User.find();

    const formattedOrders = ORDER_DATA.map((order) => {
      const { userIndex = null } = order;
      if (userIndex) {
        order.user_id = userData[userIndex]._id;
      }
      delete order.userIndex;
      const formattedCart = order.cart.map((cartItem) => {
        const { foodIndex = null } = cartItem;
        if (!foodIndex) {
          throw new Error("A food index is required on a cart item");
        }
        cartItem.food_id = foodData[foodIndex]._id;
        delete cartItem.foodIndex;
        return cartItem;
      });
      order.cart = formattedCart;
      return order;
    });
    await Seeder.inject(formattedOrders, Order, env);
  } catch (err) {
    console.error(err);
  }
}

async function reap(env) {
  await Seeder.delete(Order, env);
}

module.exports = {
  seed,
  reap,
};
