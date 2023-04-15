//Your order schema seems to have a small issue with the nested structure of the cart field.
//  The cart should contain objects with properties such as food, specialRequest, quantity, etc. 
//  To fix this issue, you should define the structure of the cart items as a separate schema and then use that schema 
//  in the cart array. Here's the corrected schema:

const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  food: {
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
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isComplete: { type: Boolean, default: false },
    cart: [CartItemSchema],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;


