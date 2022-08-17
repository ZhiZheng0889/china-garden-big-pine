const ORDER_ITEMS_DATA = require('./02-orderItems.json');
exports.seed = function (knex) {
  return knex
    .raw('TRUNCATE TABLE order_items RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('order_items').insert(ORDER_ITEMS_DATA);
    });
};
