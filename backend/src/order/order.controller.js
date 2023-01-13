const service = require('./order.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

const hasRequiredProperties = require('../utils/hasRequiredProperties');
const hasOnlyValidProperties = require('../utils/hasOnlyValidProperties');
const REQUIRED_PROPERTIES = ['cart', 'user_id', 'email'];
const PROPERTIES = [
  'cart',
  'user_id',
  'phone_number',
  'email',
  'order_id',
  'created_at',
  'updated_at',
];
const CART_VALID_PROPERTIES = [
  'food_id',
  'specialRequest',
  'quantity',
  'size',
  'option',
  'base_price',
  'total',
  'description',
];

const CART_REQUIRED_PROPERTIES = ['food_id', 'quantity', 'total', 'base_price'];

async function isValidUser_id(req, res, next) {
  const { user_id } = req.body.data;
  const foundUser = await service.readUser(user_id);
  if (foundUser) {
    res.locals.user = foundUser;
    return next();
  }
  next({
    status: 404,
    message: 'User not found.',
  });
}

function isValidEmail(req, res, next) {
  const { email } = req.body.data;
  const { email: foundEmail } = res.locals.user;
  if (email === foundEmail) {
    return next();
  }
  return next({
    status: 404,
    message: 'Email is not valid.',
  });
}

function isValidPhoneNumber(req, res, next) {
  const { phone_number = '' } = req.body.data;
  const { phone_number: foundPhone_number } = res.locals.user;
  if (phone_number && phone_number !== foundPhone_number) {
    return next({
      status: 404,
      message: 'Not valid phone number.',
    });
  }
  return next();
}

function isValidCart(req, res, next) {
  const { cart = null } = req.body.data;
  if (cart) {
    const invalidFields = cart.reduce((acc, item) => {
      return !CART_VALID_PROPERTIES.includes(item) ||
        !CART_REQUIRED_PROPERTIES.includes(item)
        ? acc.push(item)
        : acc;
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
    message: 'Cart not found',
  });
}

/*
 * Order controller
 * @returns array of middleware functions that the router can handle.
 */
module.exports = {
  list: [],
  read: [],
  create: [
    hasRequiredProperties(REQUIRED_PROPERTIES),
    hasOnlyValidProperties(PROPERTIES),
    asyncErrorBoundary(isValidUser_id),
    isValidEmail,
    isValidPhoneNumber,
    isValidCart,
  ],
  destroy: [],
};

/*
  structure:
  {
    data: {
      "user_id": 1,
      "phone_number": 911,
      "email": "mail@mail.com",
      "cart": [
          {
              "name": "BBQ Spare Ribs",
              "description": null,
              "total": 37.9,
              "base_price": 10.95,
              "option": null,
              "size": {
                  "small": {
                      "upCharge": 0
                  },
                  "large": {
                      "upCharge": 8
                  }
              },
              "quantity": 1,
              "specialRequest": "NO BBQ",
              "currentSize": "large"
          },
          {
              "name": "Spring Rolls(2)",
              "description": null,
              "total": 4.75,
              "base_price": 4.75,
              "option": null,
              "size": null,
              "quantity": 1,
              "specialRequest": ""
          },
          {
              "name": "Vegetable Spring Rolls(2)",
              "description": null,
              "total": 4.75,
              "base_price": 4.75,
              "option": null,
              "size": null,
              "quantity": 1,
              "specialRequest": ""
          }
      ],
    }
  }

*/
