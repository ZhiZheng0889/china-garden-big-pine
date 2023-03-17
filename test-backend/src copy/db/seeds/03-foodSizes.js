const FOOD_SIZES = require('./03-foodSizes.json');
exports.seed = function (knex) {
  return knex
    .raw('TRUNCATE TABLE food_sizes RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('food_sizes').insert(FOOD_SIZES);
    });
};
