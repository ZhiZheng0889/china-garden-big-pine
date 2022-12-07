const ORDERS_DATA = require('./05-orders.json');
exports.seed = function (knex) {
  return knex
    .raw('TRUNCATE TABLE orders RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('orders').insert(ORDERS_DATA);
    });
};
