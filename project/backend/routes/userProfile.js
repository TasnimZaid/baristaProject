const express = require("express");
const router = express.Router();
const User = require('../model/users') 
const Recipe = require('../model/recipes')
const auth = require('../middleware/auth')




router.get('/User', auth , async (req, res) => {
        const users = await User.find(); 
        res.json(users);
});



router.get('/users/:id', async (req, res) => {
        try {
          // Find user by ID and populate fields if needed
          const user = await User.findById(req.params.id)
          .populate({
            path: 'wishlist.recipeId', 
            model: 'Recipe'
        })
        
          if (user) {
            res.json(user);
          } else {
            res.status(404).json({ message: 'User not found' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Server error', error: error.message });
        }
      });



// patch on user details 
router.patch('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body; 

    // Find the user by ID and apply the updates without using $set
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates, // Pass the updates directly
      { new: true, runValidators: true } 
    );

    if (updatedUser) {
      res.json(updatedUser); // Return the updated user data
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});






// POST route to add recent view
router.post('/recent-view', async (req, res) => {
  try {
    const { userId, recipeId } = req.body;

    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the recipe already exists in recent views, and remove it if it does
    user.recentView = user.recentView.filter(view => view.recipeId.toString() !== recipeId);

    // Add the new recipeId to recent views
    user.recentView.unshift({ recipeId });

    // Optional: Limit the number of recent views stored
    if (user.recentView.length > 10) {
      user.recentView.pop();
    }


    await user.save();

    res.json({ message: 'Recent view added successfully', recentView: user.recentView });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Delete Recent view
router.delete('/recent-view', async (req, res) => {
  try {
    const { userId, recipeId } = req.body;

    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.recentView = user.recentView.filter(view => view.recipeId.toString() !== recipeId);
    await user.save();

    res.json({ message: 'Recent view removed successfully', recentView: user.recentView });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});




router.get('/:userId/recent-view', async (req, res) => {
  try {
    const { userId } = req.params;
    // Fetch user and populate recentView.recipeId with actual recipe details
    const user = await User.findById(userId)
      .populate('recentView.recipeId') 
      .exec();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the recent views
    res.json({ recentView: user.recentView });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});




// Route to get user profile with reviews
router.get('/user/:userId/review', async (req, res) => {
        try {
          const userId = req.params.userId;
          
          const user = await User.findById(userId)
          .populate({
            path: 'review',
            populate: {
              path: 'recipeId',
              select: 'name preparation ingredients cookingTime photos'  // Select fields you want to include from Recipe
            },
            select: 'rating comment createdAt'  // Select fields you want to include from Review
          })
          .exec();
      
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          res.json(user);
        } catch (error) {
          console.error('Error fetching user profile', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      });


      




module.exports = router;


