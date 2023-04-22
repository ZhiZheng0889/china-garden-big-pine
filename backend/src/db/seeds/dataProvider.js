const Food = require("../models/foodModel");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const foodProvider = require("./foods.js");
const userProvider = require("./users.js");
const orderProvider = require("./orders.js");

async function seedAll(env) {
  await foodProvider.seed(env);
  await userProvider.seed(env);
  await orderProvider.seed(env);
}

async function seed(env, provider) {
  if (provider === "users") {
    await userProvider.seed(env);
  }
  if (provider === "foods") {
    await foodProvider.seed(env);
  }
  if (provider === "orders") {
    await orderProvider.seed(env);
  }
}

async function reap(env, provider) {
  if (provider === "users") {
    await userProvider.reap(env);
  }
  if (provider === "foods") {
    await foodProvider.reap(env);
  }
  if (provider === "orders") {
    await orderProvider.reap(env);
  }
}

async function reapAll(env) {
  await foodProvider.reap(env);
  await userProvider.reap(env);
  await orderProvider.reap(env);
}

if (!process.argv[3]) {
  throw new Error("A enviroment is required");
}

if (process.argv[4]) {
  if (process.argv[2] === "--import") {
    seed(process.argv[3], process.argv[4]);
  }
  if (process.argv[2] === "--delete") {
    reap(process.argv[3], process.argv[4]);
  }
} else {
  if (process.argv[2] === "--import") {
    seedAll(process.argv[3]);
  }
  if (process.argv[2] === "--delete") {
    reapAll(process.argv[3]);
  }
}

// if (process.argv[2] === "--import" && process.argv[3] === "--all") {
//   seed();
// } else if (process.argv[2] === "--import" && process.argv[3] !== undefined) {
//   seed(process.argv[3]);
// } else if (process.argv[2] === "--delete" && process.argv[3] === "--all") {
//   destroy();
// } else if (process.argv[2] === "--delete" && process.argv[3] !== undefined) {
//   destroy(process.argv[3]);
// }

// async function seed(type = "") {
//   if (type === "--users" || !type) {

//     await Seeder.inject(`${__dirname}/users.json`, User);
//   }
//   if (type === "--foods" || !type) {
//     await Seeder.inject(`${__dirname}/foods.json`, Food);
//   }
//   if (type === "--orders" || !type) {
//     await Seeder.inject(`${__dirname}/orders.json`, Order);
//   }
// }

// async function seedTest(type = "") {
//   if (type === "--users" || !type) {
//     await Seeder.inject(`${__dirname}/users.json`, User);
//   }
//   if (type === "--foods" || !type) {
//     await Seeder.inject(`${__dirname}/foods.json`, Food);
//   }
//   if (type === "--orders" || !type) {
//     await Seeder.inject(`${__dirname}/orders.json`, Order);
//   }
// }

// async function destroy(type = "") {
//   if (type === "--users" || !type) {
//     await Seeder.delete(User);
//   }
//   if (type === "--foods" || !type) {
//     await Seeder.delete(Food);
//   }
//   if (type === "--orders" || !type) {
//     await Seeder.delete(Order);
//   }
// }

// if (process.argv[2] === "--import" && process.argv[3] === "--all") {
//   seed();
// } else if (process.argv[2] === "--import" && process.argv[3] !== undefined) {
//   seed(process.argv[3]);
// } else if (process.argv[2] === "--delete" && process.argv[3] === "--all") {
//   destroy();
// } else if (process.argv[2] === "--delete" && process.argv[3] !== undefined) {
//   destroy(process.argv[3]);
// }

module.exports = {
  seedAll,
  reapAll,
};
