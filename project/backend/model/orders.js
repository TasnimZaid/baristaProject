const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  isDeleted: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  baristaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Barista', required: true },
  beverageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Beverage', required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
  deliveryAddress: { type: String, required: true },
  paymentStatus: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
  orderDate: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;


// isDeleted: { type: Boolean, default: false } عبدالله السراحين