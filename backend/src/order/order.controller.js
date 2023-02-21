const service = require('./order.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

const hasRequiredProperties = require('../utils/hasRequiredProperties');
const hasOnlyValidProperties = require('../utils/hasOnlyValidProperties');
const mapCart = require('../utils/mapCart');
const mapFoodInfo = require('../utils/mapFoodInfo');
const PROPERTIES = ['cart', 'user_id', 'phone_number', 'email'];
const REQUIRED_PROPERTIES = ['cart'];

const CART_VALID_PROPERTIES = [
  'food_id',
  'specialRequest',
  'quantity',
  'food_size_id',
  'food_option_id',
];

const CART_REQUIRED_PROPERTIES = ['food_id', 'quantity'];

async function orderExist(req, res, next) {
  const { order_id = null } = req.params;
  if (order_id) {
    const foundOrder = await service.read(order_id);
    if (foundOrder) {
      res.locals.order = foundOrder;
      return next();
    }
  }
  return next({ satus: 404, message: `Order ${order_id + ' '}not found.` });
}

async function isValidUser_id(req, res, next) {
  const { user_id = null } = req.body.data;
  if (user_id) {
    const foundUser = await service.readUser(user_id);
    if (foundUser) {
      res.locals.user = foundUser;
      return next();
    }
    return next({
      status: 404,
      message: 'User not found.',
    });
  }
  return next();
}

// function isValidEmail(req, res, next) {
//   const { email = null } = req.body.data;
//   if (email) {
//     const { email: foundEmail } = res.locals.user;
//     if (email === foundEmail) {
//       return next();
//     }
//     return next({
//       status: 404,
//       message: 'Email is not valid.',
//     });
//   }
//   return next();
// }

// function isValidPhoneNumber(req, res, next) {
//   const { phone_number = '' } = req.body.data;
//   if (phone_number) {
//     const { phone_number: foundPhone_number = null } = res.locals.user;
//     if (phone_number && phone_number !== foundPhone_number) {
//       return next({
//         status: 404,
//         message: 'Not valid phone number.',
//       });
//     }
//     return next();
//   }
//   return next();
// }

function isValidCart(req, res, next) {
  const { cart = [] } = req.body.data;
  if (Array.isArray(cart) && cart.length > 0) {
    const invalidFields = cart.reduce((acc, item) => {
      const invalidCartFields = Object.keys(item).reduce((acc, key) => {
        return !CART_VALID_PROPERTIES.includes(key) ? acc.push(key) : acc;
      }, []);
      if (invalidCartFields.length > 0) {
        return acc.push(item);
      }
      return acc;
    }, []);

    if (invalidFields.length) {
      return next({
        status: 400,
        message: `Invalid cart items: ${invalidFields.join(', ')}`,
      });
    }
    return next();
  }
  return next({
    status: 400,
    message: 'Cart cannot be empty.',
  });
}

async function create(req, res, next) {
  try {
    const response = await service.createOrder(req.body.data);

    res.status(200).json({ data: response });
  } catch (error) {
    return next({ status: 500, message: 'Error creating order.' });
  }
}

async function getCartInfo(req, res, next) {
  try {
    const { order_id } = res.locals.order;
    const orderItems = await service.readCart(order_id);
    const food_ids = orderItems.map((item) => item.food_id);
    const foodInfo = await service.foodsFromCart(food_ids);
    const foodOptionIds = orderItems.map((item) => item.food_option_id);
    const foodOptions = await service.optionsFromCart(foodOptionIds);
    const foodSizeIds = orderItems.map((item) => item.food_size_id);
    const foodSizes = await service.sizesFromCart(foodSizeIds);
    const cart = mapFoodInfo(
      mapCart(orderItems, foodInfo),
      foodOptions,
      foodSizes
    );
    res.locals.cart = cart;
    return next();
  } catch (error) {
    console.log(error);
    return next({ status: 500, message: error.message });
  }
}

async function read(req, res, next) {
  const { order } = res.locals;
  const { cart } = res.locals;
  console.log('ORDER: ', order);
  res.status(200).json({ data: { ...order, cart } });
}

/*
 * Order controller
 * @returns array of middleware functions that the router can handle.
 */
module.exports = {
  list: [],
  read: [asyncErrorBoundary(orderExist), asyncErrorBoundary(getCartInfo), read],
  create: [
    hasOnlyValidProperties(PROPERTIES),
    hasRequiredProperties(REQUIRED_PROPERTIES),
    asyncErrorBoundary(isValidUser_id),
    isValidCart,
    asyncErrorBoundary(create),
  ],
  destroy: [],
};
