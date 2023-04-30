const mongoose = require("mongoose");

const imgurUrlValidator = (value) => {
  const imgurUrlPattern = /^(https?:\/\/)?(www\.)?imgur\.com\/[a-zA-Z0-9]+(\.[a-zA-Z]{2,4})?$/;
  return imgurUrlPattern.test(value);
};

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
      validate: {
        validator: imgurUrlValidator,
        message: (props) => `${props.value} is not a valid Imgur URL`,
      },
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

const Food = mongoose.model("Food", FoodSchema);

module.exports = Food;
