const fs = require("fs");
const FOOD_DATA = JSON.parse(
  fs.readFileSync(`${__dirname}/foods.json`, "utf-8")
);
const Food = require("../models/foodModel");
const DatabaseManager = require("../DatabaseManager.js");
const DatabaseConfig = require("../DatabaseConfig");

async function seed(env) {
  await DatabaseManager.connect(DatabaseConfig.getDatabaseUri(env));
  await DatabaseManager.seed(Food, FOOD_DATA);
  await DatabaseManager.disconnect();
}

async function reap(env) {
  await DatabaseManager.connect(DatabaseConfig.getDatabaseUri(env));
  await DatabaseManager.reap(Food);
  await DatabaseManager.disconnect();
}

module.exports = {
  seed,
  reap,
};
