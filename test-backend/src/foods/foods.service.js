const Food = require("../db/models/foodModel");

/*
 * query database and list all items
 */
function list() {
  return Food.find();
}

/*
 * query database and list all items based on category
 */
function listByCategory(category) {
  return Food.find({ category });
}

/*
 * query database and get on item based on food_id
 */
function read(_id) {
  return Food.findById(_id);
}

function search(text) {
  return Food.find({ name: { $regex: text, $options: "i" } });
}

//change price in food table
function updatePrice(_id, price) {
  return [];
}

//change price in foodOptions table
function updateOption(food_id, option_id, price) {
  // return knex(FOOD_OPTIONS_TABLE)
  //   .where({ food_id, option_id })
  //   .update({ price });
}

//change price in foodSizes table

function updateSize(food_id, size_id, price) {
  // return knex(FOOD_SIZES_TABLE).where({ food_id, size_id }).update({ price });
}

//change price in foodAmounts table

function updateAmount(food_id, amount_id, price) {
  // return knex(FOOD_AMOUNTS_TABLE)
  //   .where({ food_id, amount_id })
  //   .update({ price });
}

module.exports = {
  list,
  listByCategory,
  read,
  search,
  updateOption,
  updateSize,
  updateAmount,
};
