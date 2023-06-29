const router = require("express").Router();
const controller = require("./cart.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/update/:item_index/quantity")
  .put(controller.updateCartItemQuantity)
  .all(methodNotAllowed);

router
  .route("/update/item_index/size")
  .put(controller.updateCartItemSize)
  .all(methodNotAllowed);

router
  .route("/update/item_index/option")
  .put(controller.updateCartItemOption)
  .all(methodNotAllowed);

router
  .route("/update/item_index/special-request")
  .put(controller.updateCartItemSpecialRequest)
  .all(methodNotAllowed);

router.route("/add").put(controller.addCartItem).all(methodNotAllowed);

router
  .route("/remove/item_index")
  .put(controller.removeCartItem)
  .all(methodNotAllowed);

router.route("/:cart_id").get(controller.getCart).all(methodNotAllowed);

module.exports = router;
