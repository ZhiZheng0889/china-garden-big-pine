const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  food_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
    required: true,
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
    default: null,
  },
  selectedFoodSize: {
    type: Number,
    default: null,
  },
  isLiked: {
    type: Boolean,
    default: false,
  },
  isDisliked: {
    type: Boolean,
    default: false,
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
    isLiked: { type: Boolean, default: false },
    cart: [CartItemSchema],
    name: { type: String, default: "" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
