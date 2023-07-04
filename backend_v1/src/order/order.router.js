const router = require("express").Router();
const controller = require("./order.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").post(controller.createOrder).all(methodNotAllowed);

router
  .route("/find")
  .get(controller.getOrderByPhoneNumber)
  .all(methodNotAllowed);

router.route("/:order_id").get(controller.getOrder).all(methodNotAllowed);

module.exports = router;
