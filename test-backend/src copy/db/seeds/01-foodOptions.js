const FOOD_OPTIONS = require('./01-foodOptions.json');
exports.seed = function (knex) {
  return knex
    .raw('TRUNCATE TABLE food_options RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('food_options').insert(FOOD_OPTIONS);
    });
};
