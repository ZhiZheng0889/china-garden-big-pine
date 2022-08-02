const knex = require('../db/connection');

class Cart {
  constructor() {
     this.data = {};
     this.data.items = [];
     this.data.totals = 0;
     this.data.formattedTotals = '';
  }
};

module.exports = new Cart();

