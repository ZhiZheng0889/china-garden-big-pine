const User = require("../db/models/userModel");

function readFromEmail(email) {
  // return knex(TABLE).select("*").where({ email }).first();
}

function destroy(verify_id) {
  // return knex(TABLE).where({ verify_id }).del();
}

function emailIsVerified(user_id) {
  // return knex(USER_TABLE)
  //   .select("*")
  //   .where({ user_id })
  //   .update({ email_is_verified: true }, "*");
}

function getUserById(user_id) {
  console.log("id: ", user_id);
  return User.findById(user_id);
}

function verifyPhoneNumber(user_id, updatedUser) {
  return User.findOneAndUpdate({ _id: user_id }, updatedUser, { new: true });
}

module.exports = {
  getUserById,
  readFromEmail,
  destroy,
  verifyPhoneNumber,
  emailIsVerified,
};
