const router = require("express").Router();
const controller = require("./foods.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/search").post(controller.getBySearch).all(methodNotAllowed);

module.exports = router;
