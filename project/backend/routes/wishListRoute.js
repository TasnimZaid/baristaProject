const express = require("express");
const router = express.Router();
const Product = require('../model/products'); 
const Recipe = require('../model/recipes') ;
const Beverage = require('../model/beverages')
const Barista = require('../model/baristas')
const Review = require("../model/reviews")
const User = require("../model/users")


// Add recipe to wishlist
router.post('/users/:userId/wishlist', async (req, res) => {
    const { userId } = req.params;
    const { recipeId } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Check if recipe is already in the wishlist
      if (user.wishlist.some(item => item.recipeId.toString() === recipeId)) {
        return res.status(400).json({ message: 'Recipe already in wishlist' });
      }
  
      // Add recipe to wishlist
      user.wishlist.push({ recipeId });
      await user.save();
  
      res.status(200).json({ message: 'Recipe added to wishlist' });
    } catch (error) {
      res.status(500).json({ message: 'Error adding to wishlist', error });
    }
  });
  
router.delete('/users/:userId/wishlist/:recipeId', async (req, res) => {
  const { userId, recipeId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Find the index of the recipe in the wishlist
    const recipeIndex = user.wishlist.findIndex(item => item.recipeId.toString() === recipeId);
    if (recipeIndex === -1) return res.status(404).json({ message: 'Recipe not found in wishlist' });

    // Remove the recipe from the wishlist
    user.wishlist.splice(recipeIndex, 1);
    await user.save();

    res.status(200).json({ message: 'Recipe removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from wishlist', error });
  }
});


  
  // Remove recipe from wishlist
  router.post('/users/:userId/wishlist/remove', async (req, res) => {
    const { userId } = req.params;
    const { recipeId } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Check if recipe is in the wishlist
      const index = user.wishlist.findIndex(item => item.recipeId.toString() === recipeId);
      if (index === -1) {
        return res.status(400).json({ message: 'Recipe not found in wishlist' });
      }
  
      // Remove recipe from wishlist
      user.wishlist.splice(index, 1);
      await user.save();
  
      res.status(200).json({ message: 'Recipe removed from wishlist' });
    } catch (error) {
      res.status(500).json({ message: 'Error removing from wishlist', error });
    }
  });



  
  module.exports = router;
  



  