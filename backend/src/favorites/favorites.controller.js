const service = require("./favorites.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasRequiredProperties = require("../utils/hasRequiredProperties");
const hasOnlyValidProperties = require("../utils/hasOnlyValidProperties");

async function orderExist(req, res, next) {
  const { order_id = null } = req.params;
  if (order_id) {
    const foundOrder = await service.getOrder(order_id);
    if (foundOrder) {
      res.locals.order = foundOrder.toObject();
      return next();
    }
  }
  return next({ satus: 404, message: `Order ${order_id + " "}not found.` });
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

async function getUsersFavoriteOrders(req, res, next) {
  const { user_id = null } = req.params;
  if (user_id) {
    const orders = await service.getUsersFavoriteOrders(user_id);
    res.status(200).json({ data: orders });
  }
  return next({
    status: 400,
    message: "User id not provided.",
  });
}

async function getUsersFavoriteMeals(req, res, next) {
  const { user_id = null } = req.params;
  if (user_id) {
    const orders = await service.getUsersFavoriteMeals(user_id);
    res.status(200).json({ data: orders });
  }
  return next({
    status: 400,
    message: "User id has not been provided.",
  });
}

async function toggleOrdersLike(req, res, next) {
  try {
    const { order } = res.locals;
    const updatedOrder = await service.updateOrdersLikeStatus(
      order._id,
      !order.isLiked
    );
    res.status(200).json({ data: updatedOrder });
  } catch (error) {
    return next({
      status: 400,
      message: "Error toggling like on order.",
    });
  }
}

module.exports = {
  getUsersFavoriteOrders: [
    asyncErrorBoundary(userExist),
    asyncErrorBoundary(getUsersFavoriteOrders),
  ],
  getUsersFavoriteMeals: [
    asyncErrorBoundary(userExist),
    asyncErrorBoundary(getUsersFavoriteMeals),
  ],
  toggleOrderLike: [
    asyncErrorBoundary(orderExist),
    asyncErrorBoundary(toggleOrdersLike),
  ],
};
