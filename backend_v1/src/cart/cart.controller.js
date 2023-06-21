const service = require("./cart.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function isValidCartId(req, res, next) {
  return next();
}

async function getCart(req, res, next) {
  const { cart_id } = req.query;
  const foundCart = await service.getCartById(cart_id);
  if (foundCart) {
    res.status(200).json(foundCart);
  }
  return next({
    status: 404,
    message: "Cart cannot be found.",
  });
}

async function addCartItem(req, res, next) {
  const { cart_id, food_id, quantity, selectedSize, selectedOption } =
    req.body.data;
}

module.exports = {
  getCart: [asyncErrorBoundary(getCart)],
  removeCartItem: [asyncErrorBoundary(isValidCartId)],
  addCartItem: [asyncErrorBoundary(isValidCartId)],
  updateCartItemSize: [asyncErrorBoundary(isValidCartId)],
  updateCartItemOption: [asyncErrorBoundary(isValidCartId)],
  updateCartItemSpecialRequest: [asyncErrorBoundary(isValidCartId)],
  updateCartItemQuantity: [asyncErrorBoundary(isValidCartId)],
};
