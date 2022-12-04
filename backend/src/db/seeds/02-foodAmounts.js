const FOOD_AMOUNTS = require('./00-foods.json');
exports.seed = function (knex) {
  return knex
    .raw('TRUNCATE TABLE food_amounts RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('foods').insert(FOOD_AMOUNTS);
    });
};