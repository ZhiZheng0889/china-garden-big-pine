const FOOD_OPTIONS = require('./00-foods.json');
exports.seed = function (knex) {
  return knex
    .raw('TRUNCATE TABLE food_options RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('foods').insert(FOOD_OPTIONS);
    });
};
