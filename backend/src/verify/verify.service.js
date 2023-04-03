// const knex = require("../db/connection");
// const TABLE = "verify";
// const USER_TABLE = "users";

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

function verifyPhoneNumber(user_id) {
  // return knex(USER_TABLE)
  //   .select("*")
  //   .where({ user_id })
  //   .update({ phone_number_is_verified: true }, "*");
}

module.exports = {
  readFromEmail,
  destroy,
  verifyPhoneNumber,
  emailIsVerified,
};
