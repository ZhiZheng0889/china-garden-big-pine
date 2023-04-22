const router = require("express").Router();
const controller = require("./order.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

router
  .route("/:order_id")
  .get(controller.read)
  .delete(controller.destroy)
  .all(methodNotAllowed);

router
  .route("/users/:user_id")
  .get(controller.listFromUser)
  .all(methodNotAllowed);

module.exports = router;
