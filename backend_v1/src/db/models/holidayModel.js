const mongoose = require("mongoose");

const HolidaySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true, unique: true },
  },
  { timestamps: true }
);

const Holiday = mongoose.model("Holiday", HolidaySchema);
module.exports = Holiday;
