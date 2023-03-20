const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    phoneNumber: { type: String },
    email: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    isComplete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
