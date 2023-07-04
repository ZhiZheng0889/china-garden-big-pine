const service = require("./order.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasRequiredProperties = require("../utils/hasRequiredProperties");
const isValidPhoneNumber = require("../utils/isValidPhoneNumber");
const MAX_COMMENT_LENGTH = parseInt(process.env.MAX_COMMENT_LENGTH);
const MAX_ORDER_LIMIT = parseInt(process.env.MAX_ORDER_LIMIT);

const REQUIRED_PROPERTIES = ["name", "phoneNumber", "comment"];

async function getCartAndReturnError(req, res, next) {
  const { cart_id } = req.body;
  console.log(req.body);
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

async function getOrderAndReturnError(req, res, next) {
  const { order_id } = req.params;
  console.log("=>", order_id);
  if (!order_id) {
    return next({
      satus: 400,
      message: "An order id is required",
    });
  }
  const foundOrder = await service.getOrderById(order_id);
  console.log("FOUND ORDER: ", foundOrder);
  if (foundOrder) {
    res.locals.order = foundOrder.toObject();
    return next();
  }
  return next({
    status: 404,
    message: "Order cannot be found.",
  });
}

function getOrder(req, res, next) {
  const { order } = res.locals;
  if (!order) {
    return next({
      status: 500,
      message: "Cannot load order.",
    });
  }
  res.status(200).json(order);
}

async function createOrder(req, res, next) {
  try {
    const { cart } = res.locals;
    const { phoneNumber, name, comment, pickupTime } = req.body;
    const formattedOrder = {
      phoneNumber,
      name,
      comment,
      cart: {
        items: cart.items,
        total: cart.total,
      },
      pickupTime,
    };
    const createdOrder = await service.createOrder(formattedOrder);
    await deleteCart(cart._id);
    if (createdOrder) {
      res.status(200).json(createdOrder.toObject());
    }
    return next({
      status: 500,
      message: "Error creating the order.",
    });
  } catch (error) {
    return next({
      status: 400,
      message: error.message ?? "Error creating or deleting cart.",
    });
  }
}

function hasValidPhoneNumber(req, res, next) {
  const { phoneNumber } = req.body;
  if (!phoneNumber) {
    return next({
      status: 400,
      message: "A phone number is required.",
    });
  }
  if (isValidPhoneNumber(phoneNumber)) {
    return next();
  }
  return next({
    status: 400,
    message: `Phone number: ${phoneNumber} is invalid`,
  });
}

function hasValidComment(req, res, next) {
  const { comment } = req.body;
  if (comment.length > MAX_COMMENT_LENGTH) {
    return next({
      status: 400,
      message: "Comment exceeds the max length",
    });
  }
  return next();
}

function hasValidName(req, res, next) {
  const { name } = req.body;
  if (!name) {
    return next({
      status: 400,
      message: "A name is required.",
    });
  }
  return next();
}

function hasValidOrderTotal(req, res, next) {
  const { cart } = res.locals;
  if (cart.total > 0 && cart.total <= MAX_ORDER_LIMIT) {
    return next();
  }
  return next({
    status: 400,
    message: `Order cannot be more than $${MAX_ORDER_LIMIT}`,
  });
}

async function getOrdersByPhoneNumber(req, res, next) {
  const { phoneNumber } = req.body;
  const foundOrders = await service.getOrdersByPhoneNumber(phoneNumber);
  console.log("FOUND ORDERS: ", foundOrders);
  if (!foundOrders) {
    return next({
      status: 404,
      message: "No orders can be found from today by this phone number.",
    });
  }
  res.status(200).json(foundOrders);
}

async function deleteCart(cart_id) {
  await service.destroyCartById(cart_id);
}

module.exports = {
  getOrdersByPhoneNumber: [
    hasValidPhoneNumber,
    asyncErrorBoundary(getOrdersByPhoneNumber),
  ],
  getOrder: [asyncErrorBoundary(getOrderAndReturnError), getOrder],
  createOrder: [
    asyncErrorBoundary(getCartAndReturnError),
    hasValidPhoneNumber,
    hasValidName,
    hasValidComment,
    hasValidOrderTotal,
    asyncErrorBoundary(createOrder),
  ],
};
