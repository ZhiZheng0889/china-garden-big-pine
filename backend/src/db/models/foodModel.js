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

/* EXAMPLE */
/*
  {
    "name": "Steamed Rice",
    "basePrice": 3,
    "category": "fried_rice",
    "description": "A very good description",
    "spicy": false,
    "available": true,
    "options": {
      "small": {
        "upcharge": 0
      },
      "large": {
        "upcharge": 5.5
      }
    },
    "sizes": {
      "pint": {
        "upcharge": 0
      },
      "quart": {
        "upcharge": 5.5
      }
    }
  }

*/
