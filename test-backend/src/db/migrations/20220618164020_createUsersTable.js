//change the code for mongodb
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  isAdmin: { type: Boolean },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  emailIsVerified: { type: Boolean, default: false },
  phoneNumberIsVerified: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

exports.up = function() {
  return User.createCollection();
};

exports.down = function() {
  return User.collection.drop();
};