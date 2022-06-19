const FOOD_REVIEWS_DATA = require('./03-foodReviews.json');
exports.seed = function (knex) {
  return knex
    .raw('TRUNCATE TABLE food_reviews RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('food_reviews').insert(FOOD_REVIEWS_DATA);
    });
};
