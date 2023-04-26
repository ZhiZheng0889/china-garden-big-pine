const router = require("express").Router();
const controller = require("./favorites.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/orders/:user_id")
  .get(controller.getUsersFavoriteOrders)
  .all(methodNotAllowed);

module.exports = router;
