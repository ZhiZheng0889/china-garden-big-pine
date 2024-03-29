const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { SALT } = process.env;

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    isAdmin: { type: Boolean },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    emailIsVerified: { type: Boolean, default: false },
    isPhoneNumberVerified: { type: Boolean, default: false },
    hashedEmail: { type: String },
    hashedPhoneNumber: { type: String },
  },
  { timestamps: true }
);

// UserSchema.pre("save", async function (next) {
//   // Only hash the email and phone number if they have been modified or are new
//   if (this.isModified("email") || this.isNew) {
//     this.email = await bcrypt.hash(this.email, parseInt(SALT));
//   }
//   if (this.isModified("phoneNumber") || this.isNew) {
//     this.PhoneNumber = await bcrypt.hash(this.phoneNumber, parseInt(SALT));
//   }
//   next();
// });

const User = mongoose.model("User", UserSchema);
module.exports = User;
