const router = require('express').Router();
const controller = require('./order.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router
  .route('/')
  .get(controller.list)
  .post(controller.create)
  .delete(controller.destory)
  .all(methodNotAllowed);

router.route('/:userId').get(controller.read).all(methodNotAllowed);
module.exports = router;
