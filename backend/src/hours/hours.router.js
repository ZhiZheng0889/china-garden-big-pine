const router = require("express").Router();
const controller = require("./hours.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/:date").get(controller.getDailyHours).all(methodNotAllowed);
router.route("/").get(controller.getHours).all(methodNotAllowed);

module.exports = router;
