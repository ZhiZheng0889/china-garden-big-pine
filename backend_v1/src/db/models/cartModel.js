const mongoose = require("mongoose");
const CartReducer = require("../../utils/CartReducer");

const CartSchema = new mongoose.Schema(
  {
    items: {
      type: [],
      default: [],
    },
    total: { type: Number, default: 0 },
  },
  { timestamps: true }
);

CartSchema.pre("save", function (next) {
  const total = CartReducer.getCartTotal(this.items);
  this.total = total;
  next();
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
