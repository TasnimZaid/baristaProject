const express = require("express");

const router = express.Router();
const Recipe = require('../model/recipes');

router.patch('/:id/report', async (req, res) => {
    try {
      const userId = req.params.id; 
      const recipeId = req.params.id;
  
      const recipe = await Recipe.findById(recipeId);
  
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
  
      // Check if the user has already reported the recipe
      if (recipe.reportedBy.includes(userId)) {
        return res.status(400).json({ message: 'You have already reported this recipe' });
      }
  
      // Increment report count and add user to reportedBy
      recipe.report += 1;
      recipe.reportedBy.push(userId);
  
      await recipe.save();
  
      res.status(200).json({ message: 'Recipe reported successfully', recipe });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
  
  module.exports = router;
