// models/ordersM.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [
      {
        itemType: {
          type: String,
          enum: ["beverage", "product"],
          required: true,
        },
        itemId: {
          type: Schema.Types.ObjectId,
          refPath: "orderItems.itemType",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
      },
    ],
    baristaOrders: [
      {
        baristaId: {
          type: Schema.Types.ObjectId,
          ref: "Barista",
          required: true,
        },
        beverages: [
          {
            beverageId: {
              type: Schema.Types.ObjectId,
              ref: "Beverage",
              required: true,
            },
            quantity: { type: Number, required: true, min: 1 },
            price: { type: Number, required: true, min: 0 },
          },
        ],
        totalBaristaAmount: { type: Number, required: true, min: 0 },
      },
    ],
    websiteProducts: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
      },
    ],
    totalAmount: { type: Number, required: true, min: 0 },
    paymentMethod: {
      type: String,
      enum: ["credit card", "paypal", "stripe", "apple pay"],
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Order = mongoose.model("OrderM", orderSchema); // Ensure consistent naming
module.exports = Order;
