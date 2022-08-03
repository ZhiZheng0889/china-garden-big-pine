const router = require('express').Router();
const controller = require('./orderitem.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');
router.route('/').post(controller.create).all(methodNotAllowed);

// const validate = require('express-validation');
// const config = require('../config/index');
// const paramValidation = require('../config/param-validation');

router.get('/', controller.get);
router.post('/add', controller.add);
router.post('/subtract', controller.subtract);
module.exports = router;