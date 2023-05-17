const router = require("express").Router();
const controller = require("./user.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/login/google", controller.loginWithGoogle);
router
  .route("/login/token")
  .post((req, res, next) => {
    console.log('Cookies: ', req.cookies);
    console.log('Body: ', req.body);
    next();
  }, asyncErrorBoundary(controller.loginWithToken))
  .all(methodNotAllowed);
  
router.route("/login").post(controller.login).all(methodNotAllowed);
router.route("/").post(controller.register).all(methodNotAllowed);

module.exports = router;
