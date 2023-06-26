const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./user.service");
const bcrypt = require("bcryptjs");
const { SALT } = process.env;
const UserAuth = require("../auth/UserAuth");
const hasOnlyValidProperties = require("../utils/hasOnlyValidProperties");
const hasRequiredProperties = require("../utils/hasRequiredProperties");
const { formatPhoneNumber } = require("../utils/formatPhoneNumber");

const VALID_PROPERTIES = [
  "email",
  "phoneNumber",
  "password",
  "isAdmin",
  "firstName",
];
const REQUIRED_PROPERTIES = ["firstName", "phoneNumber", "password"];
const VALID_LOGIN_PROPERTIES = ["phoneNumber", "password"];
const REQUIRED_LOGIN_PROPERTIES = ["phoneNumber", "password"];

/*
  check if email exist and if so return error
*/
async function isEmailAvailable(req, res, next) {
  const { email } = req.body.data;
  const foundUser = await service.getUserByEmail(email);
  if (foundUser) {
    return next({
      status: 409,
      message: "Email already in use. Please try a different one.",
    });
  }
  return next();
}

/*
  check if phone number exist and if so return error
*/
async function isPhoneNumberAvailable(req, res, next) {
  const { phoneNumber } = req.body.data;
  const foundUser = await service.getUserByPhoneNumber(phoneNumber);
  if (foundUser) {
    return next({
      status: 409,
      message: "Phone number already in use. Please try a different one.",
    });
  }
  return next();
}

/*
  takes password and hashes password and saves to res.local
*/
async function encryptPassword(req, res, next) {
  try {
    const { password } = req.body.data;
    console.log(password);
    const hashedPassword = await bcrypt.hash(password, parseInt(SALT));
    console.log(hashedPassword);
    res.locals.password = hashedPassword;
    return next();
  } catch (error) {
    return next({
      status: 400,
      message: "Error encrypting password.",
    });
  }
}

/*
  takes a createdUser and gathers users_id from user and generates accessToken
  and refreshToken and saves to res.locals
*/
async function createToken(req, res, next) {
  const {
    createdUser: { _id },
  } = res.locals;
  const accessToken = await UserAuth.generateAccessToken(_id);
  const refreshToken = await UserAuth.generateRefreshToken(_id);
  res.locals.accessToken = accessToken;
  res.locals.refreshToken = refreshToken;
  return next();
}

/*
  send createdUser payload to client
*/
function sendUserPayload(req, res, next) {
  const { user, accessToken, refreshToken } = res.locals;
  if (!accessToken || !refreshToken) {
    return next({
      status: 500,
      message: "Error creating tokens",
    });
  }
  return res
    .cookie("access_token", accessToken, {
      httpOnly: true,
      sameSite: "None",
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(Date.now() + 8 * 36000000),
    })
    .status(200)
    .json({ data: { ...user, refreshToken } });
}

async function getUserEmail(req, res, next) {
  const { email = "" } = req.body.data;
  console.log("data: ", req.body.data);
  const foundUser = await service.getUserByEmail(email);
  console.log("found user: ", foundUser);
  if (foundUser) {
    res.locals.user = foundUser;
    res.locals.createdUser = foundUser;
    return next();
  }
  return next({
    status: 404,
    message: "Cannot find email or password is incorrect",
  });
}

async function getUserFromId(req, res, next) {
  const { user_id = "" } = req.body.data;
  const foundUser = await service.getUserById(user_id);
  if (foundUser) {
    res.locals.createdUser = foundUser.toObject();
    const user = foundUser.toObject();
    res.locals.userWithPassword = { ...user };
    delete user.password;
    res.locals.user = user;
    return next();
  }
  return next({
    status: 404,
    message: "Cannot find user id",
  });
}

async function getUserFromPhoneNumber(req, res, next) {
  const { phoneNumber = "" } = req.body.data;
  const foundUser = await service.getUserByPhoneNumber(phoneNumber);
  if (foundUser) {
    res.locals.createdUser = foundUser.toObject();
    const user = foundUser.toObject();
    res.locals.userWithPassword = { ...user };
    delete user.password;
    res.locals.user = user;
    return next();
  }
  return next({
    status: 404,
    message: "Cannot find phone number or password is incorrect",
  });
}

async function validatePassword(req, res, next) {
  try {
    const { password } = req.body.data;
    const { password: foundPassword } = res.locals.userWithPassword;
    const isValidPassword = await bcrypt.compare(password, foundPassword);
    if (isValidPassword) {
      const user = res.locals.user;
      res.locals.user = user;
      return next();
    }
    return next({
      status: 404,
      message: "Cannot find email or password is incorrect",
    });
  } catch (error) {
    return next({
      status: 500,
      message: "Error validating password",
    });
  }
}

async function isAccessTokenValid(req, res, next) {
  try {
    const { access_token } = req.cookies;
    if (access_token) {
      const { user_id } = await UserAuth.authorize(access_token);
      res.locals.user_id = user_id;
      return next();
    }
    return next({
      status: 400,
      message: "Access token has not been provided",
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next();
    }
    return next({
      status: 404,
      message: "Error authenticating.",
    });
  }
}

async function isRefreshTokenValid(req, res, next) {
  try {
    const { refreshToken } = req.body.data;
    console.log("RT: ", refreshToken);
    if (refreshToken) {
      const user_id = await UserAuth.authorize(refreshToken).user_id;
      res.locals.user_id = user_id;
      return next();
    }
    return next({
      status: 400,
      message: "Refresh token has not been provided",
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next();
    }
    return next({
      status: 404,
      message: "Error authenticating.",
    });
  }
}

async function isValidUserId(req, res, next) {
  const { user_id } = res.locals;
  console.log("user_Id: ", user_id);
  const foundUser = await service.getUserById(user_id);
  if (foundUser) {
    res.locals.createdUser = foundUser.toObject();
    const user = foundUser.toObject();
    delete user.password;
    res.locals.user = user;
    return next();
  }
  return next({
    status: 404,
    message: "Error loggin in user.",
  });
}

/*
  takes user from req.body.data and then the hashedpassword from
  res.locals and creates a user and saves createdUser to res.locals
*/
async function createUser(req, res, next) {
  try {
    const { data: user } = req.body;
    user.password = res.locals.password;
    const createdUser = await (await service.createUser(user)).toObject();
    createdUser.password = undefined;
    res.locals.createdUser = createdUser;
    res.locals.user = createdUser;
    return next();
  } catch (error) {
    return next({
      status: 500,
      message: error.message,
    });
  }
}

function hasNoEmptyFields(req, res, next) {
  const { fields } = req.body.data;
  const invalidFields = Object.keys(fields).reduce((acc, field) => {
    if (!fields[field] || typeof fields[field] !== "string") {
      acc.push(field);
    }
    return acc;
  }, []);

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `These fields cannot be empty: ${invalidFields.join(", ")}`,
    });
  }
  return next();
}

async function editFields(req, res, next) {
  try {
    const {
      data: { fields },
    } = req.body;
    const { user } = res.locals;
    const { _id } = user;
    const updatedUser = {
      ...user,
      ...fields,
    };
    const updatedUserResponse = await service.updateUser({ _id }, updatedUser);
    const userObject = updatedUserResponse.toObject();
    delete userObject.password;
    res.status(200).json({ data: userObject });
  } catch (error) {
    return next({
      status: 500,
      message: error.message,
    });
  }
}

async function changePasswords(req, res, next) {
  try {
    const { password } = res.locals;
    const { phoneNumber } = req.body.data;
    console.log("PHONE NUMBER: ", phoneNumber, password);
    const foundUser = await service.getUserByPhoneNumber(phoneNumber);
    console.log(foundUser);
    if (!foundUser) {
      return next({
        status: 404,
        message: "Phone number cannot be found",
      });
    }
    const updatedUser = { ...foundUser.toObject(), password };
    const updatedUserResponse = await service.updateUser(updatedUser);
    console.log(updatedUserResponse);
    res.status(200).json({ data: "User password successfully changed" });
  } catch (error) {
    return next({
      status: 500,
      message: error.message,
    });
  }
}

let failedAttempts = {};

async function limitFailedLoginAttempts(req, res, next) {
  const { phoneNumber } = req.body.data;

  // reset counter each day
  const currentDate = new Date().getDate();
  if (failedAttempts[phoneNumber]?.date !== currentDate) {
    failedAttempts[phoneNumber] = { count: 0, date: currentDate };
  }

  // limit number of attempts
  if (failedAttempts[phoneNumber]?.count >= 5) {
    return next({
      status: 429,
      message: "You've reached your daily limit for login attempts.",
    });
  }

  // if login fails, increment the counter
  const foundUser = await service.getUserByPhoneNumber(phoneNumber);
  if (!foundUser) {
    failedAttempts[phoneNumber].count++;
  }

  next();
}

module.exports = {
  loginWithToken: [
    asyncErrorBoundary(isRefreshTokenValid),
    asyncErrorBoundary(isValidUserId),
    asyncErrorBoundary(createToken),
    sendUserPayload,
  ],
  login: [
    limitFailedLoginAttempts,
    hasOnlyValidProperties(VALID_LOGIN_PROPERTIES),
    hasRequiredProperties(REQUIRED_LOGIN_PROPERTIES),
    asyncErrorBoundary(getUserFromPhoneNumber),
    asyncErrorBoundary(validatePassword),
    asyncErrorBoundary(createToken),
    sendUserPayload,
  ],
  register: [
    hasOnlyValidProperties(VALID_PROPERTIES),
    hasRequiredProperties(REQUIRED_PROPERTIES),
    asyncErrorBoundary(isPhoneNumberAvailable),
    asyncErrorBoundary(encryptPassword),
    asyncErrorBoundary(createUser),
    asyncErrorBoundary(createToken),
    sendUserPayload,
  ],
  editAccount: [
    asyncErrorBoundary(isRefreshTokenValid),
    asyncErrorBoundary(isValidUserId),
    hasNoEmptyFields,
    asyncErrorBoundary(editFields),
  ],
  changePassword: [
    asyncErrorBoundary(encryptPassword),
    asyncErrorBoundary(changePasswords),
  ],
};
