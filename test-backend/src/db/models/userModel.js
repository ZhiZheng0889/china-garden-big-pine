const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    isAdmin: { type: Boolean },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    emailIsVerified: { type: Boolean, default: false },
    phoneNumberIsVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
module.exports = User;
