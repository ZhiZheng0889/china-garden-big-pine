const service = require("./cart.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const CartReducer = require("../utils/CartReducer");

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
  const { cart_id } = req.body;
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
  const { cart_id } = req.params;
  if (!cart_id) {
    return next({
      satus: 400,
      message: "A cart id is required",
    });
  }
  const foundCart = await service.getCartById(cart_id);
  if (foundCart) {
    res.locals.cart = foundCart;
    return next();
  }
  return next({
    status: 404,
    message: "Cart cannot be found.",
  });
}

async function getFoodItemAndReturnError(req, res, next) {
  const {
    item: { food_id },
  } = req.body;
  const foundFoodItem = await service.getFoodItemById(food_id);
  if (foundFoodItem) {
    res.locals.food = foundFoodItem.toObject();
    return next();
  }
  return next({
    status: 404,
    message: "Food item cannot be found.",
  });
}

function isValidFoodSize(req, res, next) {
  const { food } = res.locals;
  const { selectedSize } = req.body.item;
  if (
    (Array.isArray(food.sizes) && food.sizes[selectedSize]) ||
    !food.sizes.length
  ) {
    return next();
  }
  return next({
    status: 400,
    message: "Invalid food size index",
  });
}

function isValidFoodOption(req, res, next) {
  const { food } = res.locals;
  const { selectedOption } = req.body.item;
  if (
    (Array.isArray(food.options) && food.options[selectedOption]) ||
    !food.options.length
  ) {
    return next();
  }
  return next({
    status: 400,
    message: "Invalid food option index",
  });
}

function isValidQuantity(req, res, next) {
  const { quantity } = req.body.item;
  if (quantity >= MIN_QUANTITY && quantity <= MAX_QUANTITY && quantity !== 0) {
    return next();
  }
  return next({
    status: 400,
    message: "Invalid quantity",
  });
}

function isValidUpdateQuantity(req, res, next) {
  const { cart } = res.locals;
  const { quantity } = req.body.item;
  const { item_index } = req.params;
  console.log(cart, item_index);
  const cartQuantity = cart.items[item_index].quantity + quantity;
  if (
    cartQuantity >= MIN_QUANTITY &&
    cartQuantity <= MAX_QUANTITY &&
    cartQuantity !== 0
  ) {
    return next();
  }
  return next({
    status: 400,
    message: "Invalid quantity",
  });
}

function sendCartPayload(req, res, next) {
  const { cart } = res.locals;
  res.status(200).json(cart);
}

async function addCartItem(req, res, next) {
  try {
    const {
      item: { selectedOption, selectedSize, quantity, specialRequest },
    } = req.body;
    const { food, cart } = res.locals;
    delete food.__v;
    cart.items.push({
      food,
      selectedOption,
      selectedSize,
      quantity,
      specialRequest,
    });
    cart.total = CartReducer.getCartTotal(cart.items);
    const updatedCart = await service.addCartItem(cart);
    if (updatedCart) {
      res.status(200).json(updatedCart.toObject());
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log("ERROR: ", error);
    return next({
      status: 400,
      message: "Error adding to cart",
    });
  }
}

async function updateQuantity(req, res, next) {
  const { cart } = res.locals;
  const { quantity } = req.body.item;
  const { item_index } = req.params;
  cart.items[item_index].quantity = cart.items[item_index].quantity + quantity;
  const updatedCart = await service.updateCart(cart);
  if (updatedCart) {
    res.status(200).json(updatedCart.toObject());
  } else {
    return next({
      status: 500,
      message: "Error updating cart item quantity.",
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
  updateCartItemQuantity: [
    asyncErrorBoundary(getCartAndReturnError),
    isValidUpdateQuantity,
    asyncErrorBoundary(updateQuantity),
  ],
};
