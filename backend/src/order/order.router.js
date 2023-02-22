const router = require('express').Router();
const controller = require('./order.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router
  .route('/')
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

router
  .route('/user/:user_id')
  .get(controller.listFromUser)
  .all(methodNotAllowed);

router.route('/:order_id').get(controller.read).all(methodNotAllowed);
module.exports = router;
