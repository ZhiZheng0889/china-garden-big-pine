const router = require("express").Router();
const controller = require("./order.controller");

router
  .route("/")
  .get(controller.list[0])
  .post(controller.create[0], controller.create[1], controller.create[2]);

router
  .route("/:order_id")
  .get(controller.read[0], controller.read[1])
  .delete(controller.destroy[0], controller.destroy[1]);

router
  .route("/users/:user_id")
  .get(controller.listFromUser[0], controller.listFromUser[1]);

module.exports = router;
