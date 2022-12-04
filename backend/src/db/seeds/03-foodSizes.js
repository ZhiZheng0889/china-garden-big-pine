const FOOD_SIZES = require('./00-foods.json');
exports.seed = function (knex) {
  return knex
    .raw('TRUNCATE TABLE food_sizes RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('foods').insert(FOOD_SIZES);
    });
};
