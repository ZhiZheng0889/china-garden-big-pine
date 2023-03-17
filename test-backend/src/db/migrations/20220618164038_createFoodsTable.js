const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: { type: String, required: true },
  basePrice: { type: Number },
  category: { type: String, required: true },
  description: { type: String },
  spicy: { type: Boolean, default: false },
  available: { type: Boolean, default: true },
}, { timestamps: true });

const Food = mongoose.model('Food', foodSchema);

exports.up = function() {
  return Food.createCollection();
};

exports.down = function() {
  return Food.collection.drop();
};
