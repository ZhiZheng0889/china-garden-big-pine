const service = require('./register.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const hasOnlyValidProperties = require('../utils/hasOnlyValidProperties');
const hasRequiredProperties = require('../utils/hasRequiredProperties');
const PROPERTIES = ['email', 'first_name', 'last_name', 'phone_number'];
const { SALT } = process.env;
async function emailExist(req, res, next) {
  const { email } = req.body.data;
  const user = await service.read(email);
  if (user) {
    return next({
      status: 400,
      message: 'Email already exist. Please try another one.',
    });
  }
  next();
}

async function encryptPassword(req, res, next) {
  const { password } = req.body.data;
  let saltError;
  if (!SALT) {
    return next({
      status: 500,
      message: 'Error creating user. please try again',
    });
  }
  const hashedPassword = await bcrypt
    .hash(password, parseInt(SALT))
    .catch(saltError);
  if (saltError) {
    return next({
      status: 500,
      message: 'Error encrypting password. Please try again.',
    });
  }
  res.locals.password = hashedPassword;
}

async function createUser(req, res, next) {
  const { email, first_name, last_name, phone_number } = req.body.data;
  const { password } = res.locals;
  const createdUser = await service.create({
    email,
    first_name,
    last_name,
    phone_number,
    password,
  });
  if (createdUser) {
    res.locals.user = createdUser;
    return next();
  }
  next({ status: 500, message: 'Unable to create user. Please try again' });
}

module.exports = {
  create: [
    hasOnlyValidProperties(PROPERTIES),
    hasRequiredProperties(PROPERTIES),
    asyncErrorBoundary(emailExist),
    asyncErrorBoundary(encryptPassword),
    asyncErrorBoundary(createUser),
  ],
};
