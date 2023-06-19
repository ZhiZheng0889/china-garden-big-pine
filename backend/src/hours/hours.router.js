const router = require("express").Router();
const controller = require("./hours.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.getHours).all(methodNotAllowed);
router.route("/:dayOfWeek").get(controller.getDailyHours).all(methodNotAllowed);


module.exports = router;
