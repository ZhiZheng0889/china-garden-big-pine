const router = require("express").Router();
const controller = require("./cart.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/:cart_id/update/:item_index/quantity")
  .put(controller.updateCartItemQuantity)
  .all(methodNotAllowed);

router
  .route("/:cart_id/update/item_index/size")
  .put(controller.updateCartItemSize)
  .all(methodNotAllowed);

router
  .route("/:cart_id/update/item_index/option")
  .put(controller.updateCartItemOption)
  .all(methodNotAllowed);

router
  .route("/:cart_id/update/item_index/special-request")
  .put(controller.updateCartItemSpecialRequest)
  .all(methodNotAllowed);

router.route("/add").put(controller.addCartItem).all(methodNotAllowed);

router
  .route("/:cart_id/remove/:item_index")
  .delete(controller.removeCartItem)
  .all(methodNotAllowed);

router
  .route("/:cart_id/clear-cart")
  .put(controller.clearCart)
  .all(methodNotAllowed);

router.route("/:cart_id").get(controller.getCart).all(methodNotAllowed);

module.exports = router;
