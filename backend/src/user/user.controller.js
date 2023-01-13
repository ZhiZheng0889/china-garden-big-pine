const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const service = require('./user.service');
const bcrypt = require('bcryptjs');
const { SALT } = process.env;
const UserAuth = require('../auth/UserAuth');
const hasOnlyValidProperties = require('../utils/hasOnlyValidProperties');
const hasRequiredProperties = require('../utils/hasRequiredProperties');

const VALID_PROPERTIES = [
  'email',
  'phone_number',
  'password',
  'username',
  'isAdmin',
  'first_name',
  'last_name',
];
const REQUIRED_PROPERTIES = [
  'email',
  'first_name',
  'username',
  'phone_number',
  'password',
];

const VALID_LOGIN_PROPERTIES = ['email', 'password'];
const REQUIRED_LOGIN_PROPERTIES = ['email', 'password'];

//__REGISTER

// @ desc   Get and check if the email exist
// @ route  Get /api/users
// @ access Public
async function emailExist(req, res, next) {
  const { email } = req.body.data;
  const user = await service.read(email);
  if (user) {
    return next({
      status: 409,
      message: 'Email already is in use. Please try a different one.',
    });
  }
  next();
}

// @ desc   Get and check if the username exist
// @ route  Get /api/users
// @ access Public

async function usernameExist(req, res, next) {
  const { username } = req.body.data;

  const user = await service.readFromUsername(username);
  if (user) {
    return next({
      status: 409,
      message: 'Username already in use. Please try a different one.',
    });
  }
  next();
}

// @ desc   Get and check if the password exist
// @ route  Get /api/users

async function phoneNumberExist(req, res, next) {
  const { phone_number } = req.body.data;

  const user = await service.readFromPhoneNumber(phone_number);
  if (user) {
    return next({
      status: 409,
      message: 'Phone number is already in use. Please try a different one.',
    });
  }
  next();
}

// @ desc  Get and validating the password
// @ route Get /api/users
// @ access Public

function isvalidPassword(req, res, next) {
  const { password } = req.body.data;
  if (typeof password === 'string') {
    return next();
  }
  next({ status: 400, message: 'Password must be a string.' });
}

// @ desc   Encrypting the password
// @ route  Get /api/users
// @ access Public

async function encryptPassword(req, res, next) {
  const { data } = req.body;
  const { password = '' } = data;
  let saltError;
  const hashedPassword = await bcrypt
    .hash(password, parseInt(SALT))
    .catch(saltError);
  if (saltError) {
    return next({
      status: 400,
      message: 'Error hasing password. Please try again',
    });
  }
  res.locals.user = {
    ...data,
    email: data.email.toLowerCase(),
    password: hashedPassword,
  };
  next();
}

// @ desc   Creating the user
// @ route  Post /api/users
// @ access Public

async function create(req, res, next) {
  const { user } = res.locals;
  const createdUser = await service.create(user);
  res.locals.createdUser = createdUser;
  next();
}

// @ desc Creating token for user

async function createToken(req, res, next) {
  const { createdUser: user } = res.locals;
  const { user_id, email } = user;
  const accessToken = await UserAuth.generateAccessToken({ user_id, email });
  const refreshToken = await UserAuth.generateRefreshToken({ user_id, email });
  res.locals.accessToken = accessToken;
  res.locals.refreshToken = refreshToken;
  return next();
}

function logout(req, res, next) {
  const refreshToken = '';
  return res
    .cookie('access_token', '', {
      httpOnly: true,
      secure: false,
    })
    .status(203)
    .json({ data: { refreshToken } });
}

function sendPayload(req, res, next) {
  const { username, email, first_name, phone_number, user_id } =
    res.locals.user;
  const { accessToken, refreshToken } = res.locals;
  if (!accessToken || !refreshToken) {
    return next({
      status: 500,
      message: 'Error creating tokens',
    });
  }
  return res
    .cookie('access_token', accessToken, {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 8 * 3600000), // 8 hours
    })
    .status(200)
    .json({
      data: {
        user_id,
        username,
        email,
        first_name,
        phone_number,
        refreshToken,
      },
    });
}

//__LOGIN

// @ desc  Validating the user for login
// @ route Post /api/users
// @ access Public

async function userExist(req, res, next) {
  const { email } = req.body.data;
  const userExist = (await service.read(email)) || null;
  if (userExist) {
    res.locals.user = userExist;
    return next();
  }
  next({ status: 401, message: 'Email and or password is incorrect.' });
}

// @ desc  creating the user
// @ route Post /api/users
// @ access Public

async function readUsersProfile(req, res, next) {
  const { user_id } = res.locals.user;
  const profile = (await service.readFromUserProfile(user_id)) || {};
  res.locals.profile = profile;

  next();
}

// @ desc  creating the user
// @ route Post /api/users
// @ access Public

// async function validatePassword(req, res, next) {
//   const { password } = req.body.data;
//   const { user } = res.locals;
//   const validPassword = await bcrypt.compare(password, user.password);
//   if (validPassword) {
//     return next();
//   }
//   next({ status: 401, message: 'username and or password is incorrect.' });
// }

// async function createToken(req, res, next) {
//   const { user } = res.locals;
//   const { user_id, email, username } = user;
//   const { profile } = res.locals;
//   const token = jwt.sign({ user_id, email }, process.env.TOKEN_KEY, {
//     expiresIn: '2h',
//   });
//   user.token = token;
//   res.status(200).json({ data: { email, username, ...profile } });
// }
// @ desc  creating the user
// @ route Post /api/users
// @ access Public

// async function createToken(req, res, next) {
//   const { user } = res.locals;
//   const { user_id, email, username } = user;
//   const { profile } = res.locals;
//   const token = jwt.sign({ user_id, email }, process.env.TOKEN_KEY, {
//     expiresIn: '2h',
//   });
//   user.token = token;
//   res.status(200).json({ data: { email, username, ...profile } });
// }

// @ desc  creating the user
// @ route Post /api/users
// @ access Public

async function destroy(req, res, next) {
  const { session_id } = res.locals.session;
  await service.destroy(session_id);
  res.sendStatus(204);
}

//__ADMIN
// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncErrorBoundary(async (req, res) => {
  const users = await service.find();
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncErrorBoundary(async (req, res) => {
  const user = await service.findById(req.params.user_id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncErrorBoundary(async (req, res) => {
  const user = await service.findById(req.params.user_id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncErrorBoundary(async (req, res) => {
  const user = await service.findById(req.params.user_id);

  if (user) {
    user.first_name = req.body.first_name || user.first_name;
    user.last_name = req.body.last_name || user.last_name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      user_id: updatedUser.user_id,
      first_name: updatedUser.first_name,
      last_name: updateUser.last_name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/**
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
 */

/**
 * // @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncErrorBoundary(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      user_id: user.user_id,
      fname: user.first_name,
      lname: user.last_name,
      email: user.email,
      phone: user.phone_number,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncErrorBoundary(async (req, res) => {
  const { fname, lname, email, phone, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    first_name,
    last_name,
    email,
    phone,
    password,
  });

  if (user) {
    res.status(201).json({
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone_number,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncErrorBoundary(async (req, res) => {
  const user = await User.findById(req.user.user_id);

  if (user) {
    res.json({
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone_number,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncErrorBoundary(async (req, res) => {
  const user = await User.findById(req.user.user_id);

  if (user) {
    user.first_name = req.body.name || user.first_name;
    user.last_name = req.body.name || user.last_name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      user_id: updatedUser.user_id,
      fname: updatedUser.first_name,
      lname: updateUser.last_name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser.user_id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
 */
async function isAccessTokenValid(req, res, next) {
  const { access_token = '' } = req.cookies;
  try {
    if (access_token) {
      const data = UserAuth.authorize(access_token);
      res.locals.data = data;
      return next();
    }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next();
    }
    return next({
      status: 404,
      message: 'Error authenticating in please try again',
    });
  }
}

async function isRefreshTokenValid(req, res, next) {
  const { refreshToken = '' } = req.body.data;
  if (refreshToken) {
    const data = UserAuth.authorize(refreshToken);
    res.locals.data = data;
    return next();
  }
  return next({
    status: 404,
    message: 'Error authenticating in please try again',
  });
}

async function isValidEmailAndUserId(req, res, next) {
  const { user_id, email } = res.locals.data;
  const foundUser = await service.read(email);
  if (foundUser && foundUser.user_id === user_id) {
    res.locals.createdUser = foundUser;
    res.locals.user = foundUser;
    return next();
  }
  return next({
    status: 404,
    message: 'Error logging in user',
  });
}

async function findEmail(req, res, next) {
  const { email } = req.body.data;
  const foundUser = await service.read(email);
  if (foundUser) {
    res.locals.user = foundUser;
    res.locals.createdUser = foundUser;
    return next();
  }
  return next({
    status: 404,
    message: 'Cannot find email or password is incorrect',
  });
}

async function validatePassword(req, res, next) {
  const { password } = req.body.data;
  const { password: foundPassword } = res.locals.user;
  const isValidPassword = await bcrypt.compare(password, foundPassword);
  if (isValidPassword) {
    return next();
  }
  next({ status: 404, message: 'Cannot find email or password is incorrect' });
}

module.exports = {
  login: [
    hasOnlyValidProperties(VALID_LOGIN_PROPERTIES),
    hasRequiredProperties(REQUIRED_LOGIN_PROPERTIES),
    asyncErrorBoundary(findEmail),
    asyncErrorBoundary(validatePassword),
    asyncErrorBoundary(createToken),
    sendPayload,
  ],
  loginWithToken: [
    asyncErrorBoundary(isAccessTokenValid),
    asyncErrorBoundary(isRefreshTokenValid),
    asyncErrorBoundary(isValidEmailAndUserId),
    asyncErrorBoundary(createToken),
    sendPayload,
  ],
  logout,
  register: [
    hasOnlyValidProperties(VALID_PROPERTIES),
    hasRequiredProperties(REQUIRED_PROPERTIES),
    asyncErrorBoundary(emailExist),
    asyncErrorBoundary(usernameExist),
    asyncErrorBoundary(phoneNumberExist),
    asyncErrorBoundary(encryptPassword),
    asyncErrorBoundary(create),
    asyncErrorBoundary(createToken),
    sendPayload,
  ],
  getUsers: [],
  getUserById: [],
  updateUser: [],
  deleteUser: [],
};
