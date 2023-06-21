const mongoose = require("mongoose");
// const AutoIncrementFactory = require("mongoose-sequence");

// const connection = mongoose.createConnection("mongodb://localhost/test");
// const AutoIncrement = AutoIncrementFactory(connection);

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
  },
  { timestamps: true }
);

// FoodSchema.plugin(AutoIncrement, { inc_field: "food_id" });

const Food = mongoose.model("Food", FoodSchema);

module.exports = Food;
