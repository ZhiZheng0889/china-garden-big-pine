const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "A food requires a name"] },
    basePrice: {
      type: Number,
      required: [true, "A food requires a base price"],
    },
    category: { type: String, required: [true, "A food requires a category"] },
    description: { type: String, required: false },
    spicy: { type: Boolean, default: false },
    available: { type: Boolean, default: true },
    options: {
      option: { upcharge: { type: Number, required: true } },
    },
    sizes: {
      size: { upcharge: { type: Number, required: true } },
    },
  },
  { timestamps: true }
);

const Food = mongoose.model("Food", FoodSchema);

module.exports = Food;
