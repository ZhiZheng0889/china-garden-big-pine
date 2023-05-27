const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./user.service");
const bcrypt = require("bcryptjs");
const { SALT } = process.env;
const UserAuth = require("../auth/UserAuth");
const hasOnlyValidProperties = require("../utils/hasOnlyValidProperties");
const hasRequiredProperties = require("../utils/hasRequiredProperties");
const rateLimit = require("express-rate-limit");


const VALID_PROPERTIES = [
  "email",
  "phoneNumber",
  "password",
  "isAdmin",
  "firstName",
];
const REQUIRED_PROPERTIES = ["email", "firstName", "phoneNumber", "password"];
const VALID_LOGIN_PROPERTIES = ["email", "password"];
const REQUIRED_LOGIN_PROPERTIES = ["email", "password"];

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
    const hashedPassword = await bcrypt.hash(password, parseInt(SALT));
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

async function validatePassword(req, res, next) {
  try {
    const { password } = req.body.data;
    const { password: foundPassword } = res.locals.user;
    console.log("passwords: ", password, foundPassword);
    const isValidPassword = await bcrypt.compare(password, foundPassword);
    if (isValidPassword) {
      const user = res.locals.user;
      user.password = undefined;
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

async function isValidUserId(req, res, next) {
  const { user_id } = res.locals;
  console.log("user_Id: ", user_id);
  const foundUser = await service.getUserById(user_id);
  if (foundUser) {
    res.locals.createdUser = foundUser.toObject();
    res.locals.user = foundUser.toObject();
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

const loginLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours or 1 day in milliseconds
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    status: 429,
    message: "Too many login attempts from this IP, please try again after 24 hours."
  }
});


module.exports = {
  loginWithToken: [
    (req, res, next) => {
      console.log("Cookies: ", req.cookies);
      console.log("Body: ", req.body);
      return next();
    },
    // asyncErrorBoundary(isAccessTokenValid),
    asyncErrorBoundary(isRefreshTokenValid),
    asyncErrorBoundary(isValidUserId),
    asyncErrorBoundary(createToken),
    sendUserPayload,
  ],
  login: [
  loginLimiter,
  hasOnlyValidProperties(VALID_LOGIN_PROPERTIES),
  hasRequiredProperties(REQUIRED_LOGIN_PROPERTIES),
  asyncErrorBoundary(getUserEmail),
  asyncErrorBoundary(validatePassword),
  asyncErrorBoundary(createToken),
  sendUserPayload,
  ],
  register: [
    (req, res, next) => {
      console.log("DATA: ", req.body.data);
      return next();
    },
    hasOnlyValidProperties(VALID_PROPERTIES),
    hasRequiredProperties(REQUIRED_PROPERTIES),
    asyncErrorBoundary(isEmailAvailable),
    asyncErrorBoundary(isPhoneNumberAvailable),
    asyncErrorBoundary(encryptPassword),
    asyncErrorBoundary(createUser),
    asyncErrorBoundary(createToken),
    sendUserPayload,
  ],
};
