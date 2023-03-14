const knex = require('../db/connection');
const TABLE = 'users';
const USERS_PROFILES_TABLE = 'users_profiles';

function read(email) {
  return knex(TABLE).select('*').where({ email }).first();
}

function getAllUsers() {
  return knex(TABLE).select('*');
}

function getUserById(user_id) {
  return knex(TABLE).select('*').where({ user_id }).first();
}

function create(user) {
  return knex(TABLE)
    .insert(user)
    .returning('*')
    .then((createdUser) => createdUser[0]);
}

function createUsersProfile(user) {
  return knex(USERS_PROFILES_TABLE)
    .insert(user)
    .returning('*')
    .then((createdUser) => createdUser[0]);
}

function readFromPhoneNumber(phone_number) {
  return knex(TABLE).select('*').where({ phone_number }).first();
}

function readFromUserProfile(user_id) {
  return knex(USERS_PROFILES_TABLE).select('*').where({ user_id }).first();
}

//check if user profile exists and admin
function readFromUserProfileAdmin(user_id) {
  return knex(USERS_PROFILES_TABLE)
    .select('*') //select all columns
    .where({ user_id }) //where user_id = user_id
    .andWhere({ admin: true }) //and admin = true
    .first(); //return first row
}


function destroy(session_id) {
  return knex(TABLE).where({ session_id }).del();
}

module.exports = {
  read,
  create,
  createUsersProfile,
  getAllUsers,
  getUserById,
  readFromPhoneNumber,
  readFromUserProfile,
  readFromUserProfileAdmin,
  destroy,
};
