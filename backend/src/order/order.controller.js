const service = require("./order.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const hasRequiredProperties = require("../utils/hasRequiredProperties");
const hasOnlyValidProperties = require("../utils/hasOnlyValidProperties");
const mapCart = require("../utils/mapCart");
const mapFoodInfo = require("../utils/mapFoodInfo");

const PROPERTIES = ["cart", "user_id", "phone_number", "email"];
const REQUIRED_PROPERTIES = ["cart", "phone_number"];

const CART_VALID_PROPERTIES = [
  "_id",
  "specialRequest",
  "quantity",
  "selctedOption",
  "selectedSize",
];

const CART_REQUIRED_PROPERTIES = ["_id", "quantity"];

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

function cartHasValidProperties(req, res, next) {
  const { cart = [] } = req.body.data;
  if (Array.isArray(cart) && cart.length > 0) {
    const invalidFields = cart.reduce((acc, item) => {
      const invalidCartFields = Object.keys(item).reduce((acc2, key) => {
        return !CART_VALID_PROPERTIES.includes(key) ? acc2.push(key) : acc2;
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
    res.status(200).json({ data: response });
  } catch (error) {
    return next({ status: 500, message: "Error creating order." });
  }
}

async function isValidPhoneNumber(req, res, next) {
  const { phoneNumber } = req.body.data;
  const phoneRegex = /^\+?\d{1,3}[- ]?\d{3}[- ]?\d{4}$/;
  if (!phoneNumber || !phoneRegex.test(isValidPhoneNumber)) {
    return next({
      status: 400,
      message: "Phone number is not valid",
    });
  }
  return next();
}

async function read(req, res, next) {
  const { order } = res.locals;
  const { cart } = res.locals;
  res.status(200).json({ data: { ...order, cart } });
}

function checkQueryParams(req, res, next) {
  const { order_id } = req.params;
  return next();
}

async function userExist(req, res, next) {
  const { user_id = null } = req.params;
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
  return next({ status: 400, message: "No user id was provided." });
}

async function listUserOrders(req, res, next) {
  try {
    const { user_id } = res.locals.user;
    const orders = await service.listUserOrders(user_id);
    res.status(200).json({ data: orders });
  } catch (error) {
    return next({ status: 500, message: "Error getting orders." });
  }
}

async function list(req, res, next) {
  return res.status(200).json({ data: [] });
}

/*
 * Check to make sure all food ids are valid and if there is a selected option or size that it is valid index.
 */
async function isValidFoodIdsAndIndexes(req, res, next) {
  const { cart } = req.body.data;
  const foodIds = cart.map((food) => food._id);
  const foods = await listFoodsWithFoodIds(foodIds);
  if (foods.length !== cart.length) {
    return next({
      status: 400,
      message: "Some Food ids not found.",
    });
  }
  return next();
}

/*
 * Order controller
 * @returns array of middleware functions that the router can handle.
 */
module.exports = {
  list: [checkQueryParams, asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(orderExist), read],
  create: [
    hasOnlyValidProperties(PROPERTIES),
    hasRequiredProperties(REQUIRED_PROPERTIES),
    cartHasValidProperties,
    cartHasRequiredProperties,
    asyncErrorBoundary(isValidUser_id),
    isValidPhoneNumber,
    asyncErrorBoundary(create),
  ],
  listFromUser: [
    asyncErrorBoundary(userExist),
    asyncErrorBoundary(listUserOrders),
  ],
  destroy: [],
};
