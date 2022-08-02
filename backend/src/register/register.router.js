const router = require('express').Router();
const controller = require('./register.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');
router.route('/').post(controller.create).all(methodNotAllowed);

module.exports = router;
