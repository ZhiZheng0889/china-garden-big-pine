const mongoose = require("mongoose");

const foodSchema = {
  name: { type: String, required: [true, "A food requires a name"] },
  basePrice: {
    type: Number,
    required: [true, "A food requires a base price"],
  },
  category: { type: String, required: [true, "A food requires a category"] },
  description: { type: String, required: false },
  spicy: { type: Boolean, default: false },
  available: { type: Boolean, default: true },
  imageUrl: {
    type: String,
    default: "",
  },
  options: {
    type: [
      {
        option: { type: String, required: true },
        upcharge: { type: Number, required: true },
      },
    ],
    default: [],
  },
  sizes: {
    type: [
      {
        size: { type: String, required: true },
        upcharge: { type: Number, required: true },
      },
    ],
    default: [],
  },
};

const cartItemSchema = {
  food: foodSchema,
  specialRequest: {
    type: String,
    default: "",
  },
  quantity: {
    type: Number,
    required: true,
  },
  selectedOption: {
    type: Number,
    default: null,
  },
  selectedSize: {
    type: Number,
    default: null,
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
