const router = require('express').Router();
const controller = require('./user.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/verify').post(controller.verify).all(methodNotAllowed);
router.route('/send').post(controller.send).all(methodNotAllowed);

module.exports = router;
