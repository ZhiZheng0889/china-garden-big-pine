const router = require("express").Router();
const authRouter = require("express").Router();
const controller = require("./user.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

authRouter.route("/login/google", controller.loginWithGoogle);
authRouter
  .route("/login/token")
  .post(controller.loginWithToken)
  .all(methodNotAllowed);

router.route("/login").post(controller.login).all(methodNotAllowed);
router.route("/edit").put(controller.editAccount).all(methodNotAllowed);
router
  .route("/change-password")
  .put(controller.changePassword)
  .all(methodNotAllowed);
router.route("/").post(controller.register).all(methodNotAllowed);

module.exports = {
  userRouter: router,
  authRouter,
};
