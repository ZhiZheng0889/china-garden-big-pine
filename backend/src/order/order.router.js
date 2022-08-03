const router = require('express').Router();
const controller = require('./order.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');
router.route('/').post(controller.create).all(methodNotAllowed);

router.get('/', OrderController.list);
router.post('/create', OrderController.placeOrder);
router.get('/:orderId', OrderController.get);
router.param('orderId', OrderController.load);
module.exports = router;
