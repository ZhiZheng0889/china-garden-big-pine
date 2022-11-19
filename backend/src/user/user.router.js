const router = require('express').Router();
const controller = require('./user.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/').post(controller.register).get(protect, admin, getUsers);
router.post('/login', authUser);
router
  .route('/profile')
  .get(controller.getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
