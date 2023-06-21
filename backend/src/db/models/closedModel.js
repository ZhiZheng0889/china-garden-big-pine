const mongoose = require("mongoose");

const ClosedSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        date: { type: Date, required: true, unique: true }
    },
    { timestamps: true }
);

const Closed = mongoose.model("Closed", ClosedSchema);
module.exports = Closed;

