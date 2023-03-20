const Food = require("../models/foodModel");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const Seeder = require("./Seeder");

async function seed() {
  // seed foods
  await Seeder.inject(`${__dirname}/foods.json`, Food);
  // seed users
  await Seeder.inject(`${__dirname}/users.json`, User);
  // seed orders
  await Seeder.inject(`${__dirname}/orders.json`, Order);
}

async function destroy() {
  // seed foods
  await Seeder.delete(Food);
  // seed users
  await Seeder.delete(User);
  // seed orders
  await Seeder.delete(Order);
}

if (process.argv[2] === "--import") {
  seed();
} else if (process.argv[2] === "--delete") {
  destroy();
}
