const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
   name: { type: String, required: true },
   baristaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Barista', required: true },
   preparation: [{ type: String }],  
   ingredients: [{ type: String } ], 
  isDeleted: { type: Boolean, default: false } ,
  report: { type: Number, default: 0 },
  cookingTime: { type: String },
  categories: { type: [String] },
  cuisine: { type: String },
  dietaryRestrictions: { type: [String] },
  
  photos: { type: [String] },
  bg: { type: [String] },

  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], 
  reportedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] ,

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;