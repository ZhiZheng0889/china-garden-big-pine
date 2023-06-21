const Cart = require("../db/models/cartModel");

function getCartById(_id) {
  return Cart.findById(_id);
}

module.exports = {
  getCartById,
};
