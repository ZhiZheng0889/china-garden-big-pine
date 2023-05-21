const User = require("../db/models/userModel");

function getUserById(_id) {
  return User.findOne({ _id }).then((user) => {
    return user;
  });
}

function getUserByEmail(email) {
  return User.findOne({ email }).then((user) => {
    return user;
  });
}

function getUserByPhoneNumber(phoneNumber) {
  return User.findOne({ phoneNumber }).then((user) => {
    return user;
  });
}

function createUser(user) {
  return User.create(user).then((createdUser) => {
    return createdUser;
  });
}

function getUserByPhoneNumber(phoneNumber) {
  return User.findOne({ phoneNumber });
}

// function readFromPhoneNumber(phone_number) {
//   return knex(TABLE).select("*").where({ phone_number }).first();
// }

// function readFromUserProfile(user_id) {
//   return knex(USERS_PROFILES_TABLE).select("*").where({ user_id }).first();
// }

// //check if user profile exists and admin
// function readFromUserProfileAdmin(user_id) {
//   return knex(USERS_PROFILES_TABLE)
//     .select("*") //select all columns
//     .where({ user_id }) //where user_id = user_id
//     .andWhere({ admin: true }) //and admin = true
//     .first(); //return first row
// }

function destroy(_id) {
  return User.findByIdAndDelete(_id);
}

module.exports = {
  getUserById,
  createUser,
  // getAllUsers,
  destroy,
  getUserByEmail,
  getUserByPhoneNumber,
};
