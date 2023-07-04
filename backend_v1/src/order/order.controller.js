const service = require("./order.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasRequiredProperties = require("../utils/hasRequiredProperties");
const isValidPhoneNumber = require("../utils/isValidPhoneNumber");
const MAX_COMMENT_LENGTH = parseInt(process.env.MAX_COMMENT_LENGTH);
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
  if (!order_id) {
    return next({
      satus: 400,
      message: "An order id is required",
    });
  }
  const foundOrder = await service.getOrderById(order_id);
  if (foundOrder) {
    res.locals.order = foundOrder.toObject();
    return next();
  }
  return next({
    status: 404,
    message: "Order cannot be found.",
  });
}

async function getOrder(req, res, next) {
  const { order } = res.locals.order;
  if (order) {
    res.status(200).json(order);
  }
  return next({
    status: 400,
    message: "Error getting order.",
  });
}

async function createOrder(req, res, next) {
  try {
    const { cart } = res.locals;
    const { phoneNumber, name, comment, pickupTime } = req.body;
    const formattedOrder = {
      phoneNumber,
      name,
      comment,
      cart,
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

async function deleteCart(cart_id) {
  await service.destroyCartById(cart_id);
}

module.exports = {
  getOrderByPhoneNumber: [],
  getOrder: [asyncErrorBoundary(getOrderAndReturnError), getOrder],
  createOrder: [
    asyncErrorBoundary(getCartAndReturnError),
    hasValidPhoneNumber,
    hasValidComment,
    asyncErrorBoundary(createOrder),
  ],
};
