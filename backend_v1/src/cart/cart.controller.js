const service = require("./cart.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const MAX_QUANTITY = 99;
const MIN_QUANTITY = 0;
const cartItemDataTypes = {
  food_id: "String",
  specialRequest: "String",
  selectedOption: "Number",
  selectedSize: "Number",
  quantity: "Number",
};

async function getCart(req, res, next) {
  const { cart_id } = req.query;
  const foundCart = await service.getCartById(cart_id);
  if (foundCart) {
    res.locals.cart = foundCart;
  }
  return next();
}

async function getFoodItem(req, res, next) {
  const {
    item: { food_id },
  } = req.body.data;
  const foundFoodItem = await service.getFoodItemById(food_id);
  if (foundFoodItem) {
    res.locals.foodItem = foundFoodItem;
  }
  return next();
}

async function getCartAndReturnError(req, res, next) {
  const { cart_id } = req.query;
  const foundCart = await service.getCartById(cart_id);
  if (foundCart) {
    res.locals.cart = foundCart;
  }
  return next({
    status: 404,
    message: "Cart cannot be found.",
  });
}

async function getFoodItemAndReturnError(req, res, next) {
  const {
    item: { food_id },
  } = req.body.data;
  const foundFoodItem = await service.getFoodItemById(food_id);
  if (foundFoodItem) {
    res.locals.foodItem = foundFoodItem;
  }
  return next({
    status: 404,
    message: "Food item cannot be found.",
  });
}

function isValidFoodSize(req, res, next) {
  const { food } = res.locals;
  const { selectedSize } = req.body.data;
  if (Array.isArray(food.sizes) && food.sizes[selectedSize]) {
    return next();
  }
  return next({
    status: 400,
    message: "Invalid food size index",
  });
}

function isValidFoodOption(req, res, next) {
  const { food } = res.locals;
  const { selectedOption } = req.body.data;
  if (Array.isArray(food.options) && food.options[selectedOption]) {
    return next();
  }
  return next({
    status: 400,
    message: "Invalid food option index",
  });
}

function isValidQuantity(req, res, next) {
  const { quantity } = req.body.data;
  if (quantity >= MIN_QUANTITY && quantity <= MAX_QUANTITY) {
    return next();
  }
  return next({
    status: 400,
    message: "Invalid quantity",
  });
}

function sendCartPayload(req, res, next) {
  const { cart } = res.locals;
  res.status(200).json({ data: cart });
}

async function addCartItem(req, res, next) {
  const { cart_id, item } = req.body.data;
  const { food, cart } = res.locals;
}

module.exports = {
  getCart: [asyncErrorBoundary(getCartAndReturnError), sendCartPayload],
  removeCartItem: [asyncErrorBoundary(isValidCartId)],
  addCartItem: [
    asyncErrorBoundary(getCart),
    asyncErrorBoundary(getFoodItemAndReturnError),
    isValidFoodSize,
    isValidFoodOption,
    isValidQuantity,
    asyncErrorBoundary(addCartItem),
  ],
  updateCartItemSize: [asyncErrorBoundary(isValidCartId)],
  updateCartItemOption: [asyncErrorBoundary(isValidCartId)],
  updateCartItemSpecialRequest: [asyncErrorBoundary(isValidCartId)],
  updateCartItemQuantity: [asyncErrorBoundary(isValidCartId)],
};
