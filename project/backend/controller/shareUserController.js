// userController.js

const User = require('../model/users');
const Recipe = require('../model/recipes');

// Share a recipe with another user (for any user, not just friends)
// Share a recipe with another user (for any user, not just friends)
exports.shareRecipe = async (req, res) => {
    try {
      const { userId, recipeId, sharedWithUserId } = req.body;
  
      const user = await User.findById(userId);
      const recipe = await Recipe.findById(recipeId);
      const sharedWithUser = await User.findById(sharedWithUserId);
  
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
      if (!sharedWithUser) {
        return res.status(404).json({ message: 'User to share with not found' });
      }
  
      // Check if the recipe has already been shared with this user
      const alreadyShared = user.sharedRecipes.some(
        shared => shared.recipeId.toString() === recipeId && shared.sharedWith.toString() === sharedWithUserId
      );
      if (alreadyShared) {
        return res.status(400).json({ message: 'Recipe already shared with this user' });
      }
  
      // Add the recipe to the sender's sharedRecipes list
      user.sharedRecipes.push({ recipeId, sharedWith: sharedWithUserId });
  
      // Add the recipe to the recipient's sharedRecipes list as well
      sharedWithUser.sharedRecipes.push({ recipeId, sharedBy: userId });
  
      // Save both the sender and recipient users
      await user.save();
      await sharedWithUser.save();
  
      res.status(200).json({
        message: 'Recipe shared successfully',
        sharedRecipes: user.sharedRecipes,
        recipientSharedRecipes: sharedWithUser.sharedRecipes
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

// Get the user's friends list and shared recipes
exports.getFriendsAndSharedRecipes = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Fetch the user by ID, populate the friendsList and sharedRecipes fields
      const user = await User.findById(userId)
        .populate('friendsList.userId', 'username email') // Only get username and email of friends
        .populate({
          path: 'sharedRecipes.recipeId',
          select: 'name ingredients' // Only get name and ingredients of shared recipes
        })
        .populate({
          path: 'sharedRecipes.sharedWith',
          select: 'username email' // Get the username and email of shared users
        });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({
        friendsList: user.friendsList,
        sharedRecipes: user.sharedRecipes
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };