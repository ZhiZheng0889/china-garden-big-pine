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
  } else {
    const createdCart = await service.createCart();
    res.locals.cart = createdCart;
  }
  return next();
}

async function getFoodItem(req, res, next) {
  const {
    item: { food_id },
  } = req.body;
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
  console.log(req.body);
  const {
    item: { food_id },
  } = req.body;
  console.log(food_id);
  const foundFoodItem = await service.getFoodItemById(food_id);
  console.log(foundFoodItem);
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
  const { selectedSize } = req.body;
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
  const { selectedOption } = req.body;
  if (Array.isArray(food.options) && food.options[selectedOption]) {
    return next();
  }
  return next({
    status: 400,
    message: "Invalid food option index",
  });
}

function isValidQuantity(req, res, next) {
  const { quantity } = req.body;
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
  try {
    const {
      item: { selectedOption, selectedSize, quantity, specialRequest },
    } = req.body;
    const { food, cart } = res.locals;
    const cartToBeUpdated = [
      ...cart.items,
      {
        food,
        selectedOption,
        selectedSize,
        quantity,
        specialRequest,
      },
    ];
    const updatedCart = await service.addCartItem(cartToBeUpdated);
    if (updatedCart) {
      res.status(200).json({ data: updatedCart.toObject() });
    }
    throw new Error();
  } catch (error) {
    return next({
      status: 400,
      message: "Error adding to cart",
    });
  }
}

module.exports = {
  getCart: [asyncErrorBoundary(getCartAndReturnError), sendCartPayload],
  removeCartItem: [asyncErrorBoundary(getCartAndReturnError)],
  addCartItem: [
    asyncErrorBoundary(getCart),
    asyncErrorBoundary(getFoodItemAndReturnError),
    isValidFoodSize,
    isValidFoodOption,
    isValidQuantity,
    asyncErrorBoundary(addCartItem),
  ],
  updateCartItemSize: [asyncErrorBoundary(getCartAndReturnError)],
  updateCartItemOption: [asyncErrorBoundary(getCartAndReturnError)],
  updateCartItemSpecialRequest: [asyncErrorBoundary(getCartAndReturnError)],
  updateCartItemQuantity: [asyncErrorBoundary(getCartAndReturnError)],
};
