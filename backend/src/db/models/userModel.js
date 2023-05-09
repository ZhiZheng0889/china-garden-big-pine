const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    hashedEmail: { type: String },
    hashedPhoneNumber: { type: String },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  // Only hash the email and phone number if they have been modified or are new
  if (this.isModified("email") || this.isNew) {
    this.hashedEmail = await bcrypt.hash(this.email, 10);
  }
  if (this.isModified("phoneNumber") || this.isNew) {
    this.hashedPhoneNumber = await bcrypt.hash(this.phoneNumber, 10);
  }
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

