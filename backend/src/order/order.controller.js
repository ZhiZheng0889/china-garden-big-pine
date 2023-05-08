const service = require("./order.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasRequiredProperties = require("../utils/hasRequiredProperties");
const hasOnlyValidProperties = require("../utils/hasOnlyValidProperties");
const DatabaseErrorHandler = require("../errors/DatabaseErrorHandler");
const sendEmailToRestaurant = require("../sender/nodemailer");
const MAX_ORDER_TOTAL = process.env.MAX_ORDER_TOTAL;
// if (!MAX_ORDER_TOTAL) {
//   throw new Error("Max order total is not defined");
// }

const PROPERTIES = ["cart", "user_id", "phoneNumber", "email"];
const REQUIRED_PROPERTIES = ["cart", "phoneNumber"];

const CART_VALID_PROPERTIES = [
  "food_id",
  "specialRequest",
  "quantity",
  "selctedFoodOption",
  "selectedFoodSize",
];

const CART_REQUIRED_PROPERTIES = ["food_id", "quantity"];

async function orderExist(req, res, next) {
  const { order_id = null } = req.params;
  if (order_id) {
    const foundOrder = await service.read(order_id);
    if (foundOrder) {
      res.locals.order = foundOrder;
      return next();
    }
  }
  return next({ satus: 404, message: `Order ${order_id + " "}not found.` });
}

async function isValidUser_id(req, res, next) {
  const { user_id = null } = req.body.data;
  if (user_id) {
    const foundUser = await service.readUser(user_id);
    if (foundUser) {
      res.locals.user = foundUser;
      return next();
    }
    return next({
      status: 404,
      message: "User not found.",
    });
  }
  return next();
}

// function isValidEmail(req, res, next) {
//   const { email = null } = req.body.data;
//   if (email) {
//     const { email: foundEmail } = res.locals.user;
//     if (email === foundEmail) {
//       return next();
//     }
//     return next({
//       status: 404,
//       message: 'Email is not valid.',
//     });
//   }
//   return next();
// }

// function isValidPhoneNumber(req, res, next) {
//   const { phone_number = '' } = req.body.data;
//   if (phone_number) {
//     const { phone_number: foundPhone_number = null } = res.locals.user;
//     if (phone_number && phone_number !== foundPhone_number) {
//       return next({
//         status: 404,
//         message: 'Not valid phone number.',
//       });
//     }
//     return next();
//   }
//   return next();
// }

function cartHasValidProperties(req, res, next) {
  const { cart = [] } = req.body.data;
  if (Array.isArray(cart) && cart.length > 0) {
    const invalidFields = cart.reduce((acc, item) => {
      const invalidCartFields = Object.keys(item).reduce((acc2, key) => {
        return !CART_VALID_PROPERTIES.includes(key)
          ? () => {
              acc2.push(key);
              return acc2;
            }
          : acc2;
      }, []);
      if (invalidCartFields.length > 0) {
        return acc.push(item);
      }
      return acc;
    }, []);

    if (invalidFields.length) {
      return next({
        status: 400,
        message: `Invalid cart items: ${invalidFields.join(", ")}`,
      });
    }
    return next();
  }
  return next({
    status: 400,
    message: "Cart cannot be empty.",
  });
}

function cartHasRequiredProperties(req, res, next) {
  const { cart = [] } = req.body.data;
  try {
    cart.forEach((cartItem) => {
      CART_REQUIRED_PROPERTIES.forEach((property) => {
        if (!cartItem[property]) {
          return next({
            status: 400,
            message: `A '${property}' property is required`,
          });
        }
      });
    });
    next();
  } catch (error) {
    next({ status: 400, message: error.message });
  }
}

async function create(req, res, next) {
  try {
    const response = await service.createOrder(req.body.data);
    res.locals.order = response;
    return next();
  } catch (error) {
    return next({ status: 500, message: "Error creating order." });
  }
}

function sendOrderPayload(req, res, next) {
  const { order } = res.locals;
  res.status(200).json({ data: order });
}

async function getCartInfo(req, res, next) {
  try {
    const { order } = res.locals;
    const foodIds = order.cart.map((cartItem) => cartItem.food_id);
    const foods = await service.listFoodsWithFoodIds(foodIds);
    const cart = order.cart.map((cartItem) => {
      const food = foods.find((food) => {
        return food._id.equals(cartItem.food_id);
      });
      if (!food) {
        return next({
          status: 400,
          message: "Error finding the food based on food id",
        });
      }
      const tempCartItem = cartItem.toObject();
      delete tempCartItem.food_id;
      delete tempCartItem._id;
      const tempFood = food.toObject();
      return { ...tempCartItem, food: tempFood };
    });
    res.locals.cart = cart;
    return next();
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
}

async function read(req, res, next) {
  const { order } = res.locals;
  const { cart } = res.locals;
  const tempOrder = order.toObject();
  tempOrder.cart = cart;
  res.status(200).json({ data: tempOrder });
}

function checkQueryParams(req, res, next) {
  const { order_id } = req.params;
  return next();
}

async function userExist(req, res, next) {
  const { user_id = null } = req.params;
  if (user_id) {
    const foundUser = await service.getUser(user_id);
    if (foundUser) {
      res.locals.user = foundUser;
      return next();
    }
    return next({
      status: 404,
      message: "User not found.",
    });
  }
  return next({ status: 400, message: "No user id was provided." });
}

async function listUserOrders(req, res, next) {
  try {
    const { _id: user_id } = res.locals.user;
    const orders = await service.listOrdersByUserId(user_id);
    res.status(200).json({ data: orders });
  } catch (error) {
    return next({ status: 500, message: "Error getting orders." });
  }
}

async function list(req, res, next) {
  try {
    const { user_id = null } = req.params;
    if (!user_id) {
      return next({
        status: 400,
        message: "A user id is required",
      });
    }
    res.status(200).json({ data: await service.listFromId(user_id) });
  } catch (err) {
    return next(DatabaseErrorHandler.handleError(err));
  }
}

/*
 * Check to make sure all food ids are valid and if there is a selected option or size that it is valid index.
 */
async function isValidFoodIdsAndIndexes(req, res, next) {
  const { cart } = req.body.data;
  const cartFoodIds = cart.map((food) => food.food_id);
  const foundFoods = await service.listFoodsWithFoodIds(cartFoodIds);
  const foodIds = foundFoods.map((food) => food._id.toString());
  if (foundFoods.length === 0) {
    return next({
      status: 400,
      message: "No food ids have been found",
    });
  }
  cart.forEach((cartItem) => {
    if (!foodIds.includes(cartItem.food_id.toString())) {
      return next({
        status: 400,
        message: "Some Food ids not found.",
      });
    }
  });
  res.locals.foundFood = foundFoods;
  return next();
}

/*
 * Validates to make sure that cart total is not over 300 dollars.
 */
async function isNotOverMaxPrice(req, res, next) {
  const { cart } = req.body.data;
  const { foundFood } = res.locals;
  const mappedCart = mapCart(cart, foundFood);
  const cartTotal = mappedCart.reduce((acc, cartItem) => {
    let currOptionPrice = 0;
    let currSizePrice = 0;
    if (cartItem.selectedFoodOption === 0 || cartItem.selectedFoodOption) {
      currOptionPrice =
        cartItem.food.options[cartItem.selectedFoodOption].upcharge || 0;
    }
    if (cartItem.selectedFoodSize === 0 || cartItem.selectedFoodSize) {
      currSizePrice =
        cartItem.food.sizes[cartItem.selectedFoodSize].upcharge || 0;
    }
    const total =
      (cartItem.food.basePrice + currOptionPrice + currSizePrice) *
      cartItem.quantity;
    return acc + total;
  }, 0);
  if (cartTotal > parseInt(MAX_ORDER_TOTAL)) {
    return next({
      status: 400,
      message: `Cart total exceeds the allowed max order total: $${MAX_ORDER_TOTAL}. Please call in the order.`,
    });
  }
  return next();
}

//Setup for reading a single order
async function readOrder(req, res, next) {
  const { order_id } = req.params;

  try {
    const foundOrder = await service.read(order_id);
    if (foundOrder) {
      res.status(200).json({ data: foundOrder });
    } else {
      return next({ status: 404, message: `Order ${order_id} not found.` });
    }
  } catch (error) {
    return next({ status: 500, message: "Error reading order." });
  }
}

//Setup listing the orders
async function listOrders(req, res, next) {
  try {
    const orders = await service.list();
    res.status(200).json({ data: orders });
  } catch (error) {
    return next({ status: 500, message: "Error getting orders." });
  }
}

async function destroy(req, res, next) {
  const { order_id } = req.params;

  try {
    const deletedOrder = await service.deleteOrder(order_id);
    if (deletedOrder) {
      res.status(204).send();
    } else {
      return next({ status: 404, message: `Order ${order_id} not found.` });
    }
  } catch (error) {
    return next({ status: 500, message: "Error deleting order." });
  }
}

async function sendOrder(req, res, next) {
  try {
    const { order, cart } = res.locals;
    const response = await sendEmailToRestaurant(order, cart);
    console.log("RES: ", response);
    return next();
  } catch (error) {
    // if sending the email fails
    console.error(error.message);
    return next({
      status: 500,
      message: "Error sending order to restaurant",
    });
  }
}

function mapCart(cart, foods) {
  const mappedCart = cart.map((cartItem) => {
    const foodToAdd = foods.find((food) => {
      return food._id.toString() === cartItem.food_id;
    });
    if (!foodToAdd) {
      throw new Error("Error mapping cart");
    }
    const tempCart = { ...cartItem };
    delete tempCart.food_id;
    const tempFood = foodToAdd.toObject();
    return { ...tempCart, food: tempFood };
  });
  return mappedCart;
}

/*
 * Order controller
 * @returns array of middleware functions that the router can handle.
 */
module.exports = {
  read: [asyncErrorBoundary(orderExist), asyncErrorBoundary(getCartInfo), read],
  create: [
    hasOnlyValidProperties(PROPERTIES),
    hasRequiredProperties(REQUIRED_PROPERTIES),
    asyncErrorBoundary(isValidUser_id),
    cartHasValidProperties,
    cartHasRequiredProperties,
    asyncErrorBoundary(isValidFoodIdsAndIndexes),
    isNotOverMaxPrice,
    asyncErrorBoundary(create),
    asyncErrorBoundary(getCartInfo),
    asyncErrorBoundary(sendOrder),
    sendOrderPayload,
  ],

  listFromUser: [
    asyncErrorBoundary(userExist),
    asyncErrorBoundary(listUserOrders),
  ],
  destroy: [asyncErrorBoundary(orderExist), asyncErrorBoundary(destroy)],
  readsingleorder: [
    asyncErrorBoundary(orderExist),
    asyncErrorBoundary(readOrder),
  ],
  listOrders: asyncErrorBoundary(listOrders),
};
