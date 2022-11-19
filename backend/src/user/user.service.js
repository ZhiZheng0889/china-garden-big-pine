const knex = require('../db/connection');

const TABLE = 'users';

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
 import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
 */