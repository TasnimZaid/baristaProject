// models/products.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  photos: { type: [String] },
  bg: { type: [String] },
  picture: { type: [String] },
  recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  beverages: [{ type: Schema.Types.ObjectId, ref: "Beverage" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
