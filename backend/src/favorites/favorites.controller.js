const service = require("./favorites.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasRequiredProperties = require("../utils/hasRequiredProperties");
const hasOnlyValidProperties = require("../utils/hasOnlyValidProperties");

async function userExist(req, res, next) {
  const { user_id = null } = req.params;
  console.log("id: ", user_id);
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

module.exports = {
  getUsersFavoriteOrders: [
    asyncErrorBoundary(userExist),
    asyncErrorBoundary(getUsersFavoriteOrders),
  ],
  getUsersFavoriteMeals: [
    asyncErrorBoundary(userExist),
    asyncErrorBoundary(getUsersFavoriteMeals),
  ],
};
