const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String },
  bio: { type: String },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  socialLinks: {
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String }
  },
  wishlist: [{
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    addedAt: { type: Date, default: Date.now }
  }],
  friendsList: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }],
  orderHistory: [{
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    addedAt: { type: Date, default: Date.now }  
  }],
  review: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  // ضفتها جديد
  recentView : [{
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    addedAt: { type: Date, default: Date.now }
  }],  
  // New field to track shared recipes
  sharedRecipes: [{
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    sharedWith: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sharedAt: { type: Date, default: Date.now }
  }],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
