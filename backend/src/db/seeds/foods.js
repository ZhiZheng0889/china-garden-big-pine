const fs = require("fs");
const FOOD_DATA = JSON.parse(fs.readFileSync(`${__dirname}/foods.json`, "utf-8"));
const Seeder = require('./Seeder.js');
const Food = require("../models/foodModel");

async function seed(env) {
    await Seeder.inject(FOOD_DATA, Food, env);
}

async function reap(env) {
    await Seeder.delete(Food, env);
}

module.exports = {
    seed, reap
}