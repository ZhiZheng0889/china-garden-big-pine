const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  food_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
  },
  specialRequest: {
    type: String,
    default: "",
  },
  quantity: {
    type: Number,
    required: true,
  },
  selectedFoodOption: {
    type: Number,
    required: false,
  },
  selectedFoodSize: {
    type: Number,
    required: false,
  },
});

const OrderSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, required: true },
    email: { type: String },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    isComplete: { type: Boolean, default: false },
    cart: [CartItemSchema],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
