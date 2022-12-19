const router = require('express').Router();
const controller = require('./user.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/').post(controller.create).all(methodNotAllowed);
router.route('/').post(controller.register).get(controller.getUsers);
router.post('/login', authUser);
router
  .route('/')
  .get(controller.getUserProfile)
  .put(controller.updateUserProfile)
  .delete(controller.deleteUser)
  .get(controller.getUserById)
  .put(controller.updateUser)
  .post(controller.create)
  .delete(controller.destroy)
  .all(methodNotAllowed);

module.export = router;
