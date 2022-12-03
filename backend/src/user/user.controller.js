import generateToken from '../auth/generatetoken.js';
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
import User from '../user.service.js';
import { protect, admin } from '../auth/authMiddleware.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
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
const registerUser = asyncHandler(async (req, res) => {
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
const getUserProfile = asyncHandler(async (req, res) => {
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
const updateUserProfile = asyncHandler(async (req, res) => {
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

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.user_id);

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
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.user_id).select('-password');

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
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.user_id);

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

module.exports = {
  login: [authUser],
  register: [],
  getUsers: [protect, admin, getUsers],
  getUserProfile: [protect, getUserProfile],
  updateUserProfile: [protect, updateUserProfile],
  getUserById: [protect, admin, getUserById],
  updateUser: [protect, admin, updateUser],
  deleteUser: [protect, admin, deleteUser],

};

