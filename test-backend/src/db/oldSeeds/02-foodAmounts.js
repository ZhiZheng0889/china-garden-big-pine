const FOOD_AMOUNTS = require('./02-foodAmounts.json');
exports.seed = function (knex) {
  return knex
    .raw('TRUNCATE TABLE food_amounts RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('food_amounts').insert(FOOD_AMOUNTS);
    });
};
