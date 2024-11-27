// userRoutes.js

const express = require('express');
const share= require('../controller/shareUserController');
const User = require('../model/users');


const router = express.Router();

// Route to share a recipe
router.post('/share-recipe', share.shareRecipe);
router.get('/:userId/friends', share.getFriendsAndSharedRecipes);
router.get('/all', async (req, res) => {
    try {
      const users = await User.find({ isDeleted: false }).select('username email'); 
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  
  

module.exports = router;
