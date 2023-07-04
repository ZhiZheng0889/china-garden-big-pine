const mongoose = require("mongoose");

const cartItemSchema = {
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
};

const OrderSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, required: true },
    isComplete: { type: Boolean, default: false },
    name: { type: String, required: true },
    comment: { type: String, default: "" },
    pickupTime: { type: String, default: "" },
    cart: {
      items: [cartItemSchema],
      total: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
