
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
  beverageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Beverage' },
  baristaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Barista' },
  isDeleted: { type: Boolean, default: false } ,
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;


// isDeleted: { type: Boolean, default: false }  عبدالله السراحين  داش بورد