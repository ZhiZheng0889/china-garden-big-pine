const service = require('./order.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

const hasRequiredProperties = require('../utils/hasRequiredProperties');
const hasOnlyValidProperties = require('../utils/hasOnlyValidProperties');
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

function isValidEmail(req, res, next) {
  const { email = null } = req.body.data;
  if (email) {
    const { email: foundEmail } = res.locals.user;
    if (email === foundEmail) {
      return next();
    }
    return next({
      status: 404,
      message: 'Email is not valid.',
    });
  }
  return next();
}

function isValidPhoneNumber(req, res, next) {
  const { phone_number = '' } = req.body.data;
  if (phone_number) {
    const { phone_number: foundPhone_number = null } = res.locals.user;
    if (phone_number && phone_number !== foundPhone_number) {
      return next({
        status: 404,
        message: 'Not valid phone number.',
      });
    }
    return next();
  }
  return next();
}

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

/*
 * Order controller
 * @returns array of middleware functions that the router can handle.
 */
module.exports = {
  list: [],
  read: [],
  create: [
    hasOnlyValidProperties(PROPERTIES),
    hasRequiredProperties(REQUIRED_PROPERTIES),
    asyncErrorBoundary(isValidUser_id),
    isValidCart,
    asyncErrorBoundary(create),
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
              "food_id": 1,
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
              "food_id": 1,
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
