const Food = require("../models/foodModel");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const Seeder = require("./Seeder");

async function seed(type = "") {
  if (type === "--users" || !type) {
    await Seeder.inject(`${__dirname}/users.json`, User);
  }
  if (type === "--foods" || !type) {
    await Seeder.inject(`${__dirname}/foods.json`, Food);
  }
  if (type === "--orders" || !type) {
    await Seeder.inject(`${__dirname}/orders.json`, Order);
  }
}

async function seedTest(type = "") {
  if (type === "--users" || !type) {
    await Seeder.inject(`${__dirname}/users.json`, User);
  }
  if (type === "--foods" || !type) {
    await Seeder.inject(`${__dirname}/foods.json`, Food);
  }
  if (type === "--orders" || !type) {
    await Seeder.inject(`${__dirname}/orders.json`, Order);
  }
}

async function destroy(type = "") {
  if (type === "--users" || !type) {
    await Seeder.delete(User);
  }
  if (type === "--foods" || !type) {
    await Seeder.delete(Food);
  }
  if (type === "--orders" || !type) {
    await Seeder.delete(Order);
  }
}

if (process.argv[2] === "--import" && process.argv[3] === "--all") {
  seed();
} else if (process.argv[2] === "--import" && process.argv[3] !== undefined) {
  seed(process.argv[3]);
} else if (process.argv[2] === "--delete" && process.argv[3] === "--all") {
  destroy();
} else if (process.argv[2] === "--delete" && process.argv[3] !== undefined) {
  destroy(process.argv[3]);
}

module.exports = {
  seedTest,
};
