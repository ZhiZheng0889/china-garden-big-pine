const fs = require("fs");
const FOOD_DATA = JSON.parse(
  fs.readFileSync(`${__dirname}/foods.json`, "utf-8")
);
const Food = require("../models/foodModel");
const DatabaseManager = require("../DatabaseManager.js");

async function seed(env) {
  await DatabaseManager.seed(env, Food, FOOD_DATA);
}

async function reap(env) {
  await DatabaseManager.reap(env, Food);
}

module.exports = {
  seed,
  reap,
};
