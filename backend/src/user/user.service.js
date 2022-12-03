const Sequelize = require(('sequelize'));

const knex = require('../db/connection');

const TABLE = 'users';

import bcrypt from 'bcryptjs'


/**
 * Validating the data
 */

const userseq = TABLE.define('users',
  {
    name: {
      type: Sequelize.String,
      validate: {notEmpty: true},
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {notEmpty: true},
    },
    password: {
      type: Sequelize.STRING,
      validate: {notEmpty: true},
    },
    isAdmin: {
      type: Sequelize.Boolean,
      unique: true,
      validate: {notEmpty: true},
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

userseq.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userseq.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})



/*
 * query database and list all items
 */
function list() {
  return knex(TABLE).select('*');
}

/*
 * query database and list all items based on category
 */
function listByCategory(category) {
  return knex(TABLE).select('*').where({ category });
}

/*
 * query database and get on item based on food_id
 */
function read(food_id) {
  return knex('products').select('*').where({ user_id }).first();
}

module.exports = {
  list,
  listByCategory,
  read,
};


/**
 * const knex = require('../db/connection');

function read(email) {
  return knex('users').select('*').where({ email }).first();
}

function create(user) {
  return knex('users').insert(user).returning('*');
}

module.exports = {
  read,
  create,
};

 */
