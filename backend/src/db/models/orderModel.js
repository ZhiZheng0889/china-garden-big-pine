const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, required: true },
    email: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isComplete: { type: Boolean, default: false },
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food",
        specialRequest: { type: String, default: "" },
        quantity: { type: Number, required: true },
        selectedFoodOption: { type: Number, required: false },
        selectedFoodSize: { type: Number, required: false },
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
