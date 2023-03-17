const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
  order_id: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  food_id: { type: Schema.Types.ObjectId, ref: 'Food', required: true },
  food_option_id: { type: Schema.Types.ObjectId, ref: 'FoodOption' },
  food_size_id: { type: Schema.Types.ObjectId, ref: 'FoodSize' },
  food_amount_id: { type: Schema.Types.ObjectId, ref: 'FoodAmount' },
  specialRequest: { type: String, maxlength: 500 },
  quantity: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('OrderItem', OrderItemSchema);
