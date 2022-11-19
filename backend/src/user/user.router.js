const router = require('express').Router();
const controller = require('./user.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/').post(controller.register).get(controller.getUsers);
router.post('/login', authUser);
router
  .route('/profile')
  .get(controller.getUserProfile)
  .put(controller.updateUserProfile);
router
  .route('/:id')
  .delete(controller.deleteUser)
  .get(controller.getUserById)
  .put(controller.updateUser);

export default router;
