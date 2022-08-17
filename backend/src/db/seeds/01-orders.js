const ORDERS_DATA = require('./01-orders.json');
exports.seed = function (knex) {
  console.log(ORDERS_DATA);
  return knex
    .raw('TRUNCATE TABLE orders RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('orders').insert(ORDERS_DATA);
    });
};
