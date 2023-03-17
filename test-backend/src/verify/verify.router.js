const router = require('express').Router();
const controller = require('./verify.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/sms/send').post(controller.sendSMS).all(methodNotAllowed);
router.route('/sms/verify').post(controller.verifySMS).all(methodNotAllowed);

router.route('/verify').post(controller.verify).all(methodNotAllowed);
router.route('/send').post(controller.send).all(methodNotAllowed);

module.exports = router;
