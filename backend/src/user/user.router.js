const router = require('express').Router();
const controller = require('./user.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router
  .route('/login/token')
  .post(controller.loginWithToken)
  .all(methodNotAllowed);
router.route('/login').post(controller.login).all(methodNotAllowed);
router.route('/:user_id').get(controller.getUserById).all(methodNotAllowed);
router
  .route('/')
  .get(controller.getUsers)
  .put(controller.updateUser)
  .post(controller.register)
  .delete(controller.deleteUser)
  .all(methodNotAllowed);

module.exports = router;
