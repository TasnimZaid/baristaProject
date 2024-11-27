const express = require("express");
const router = express.Router();
const Product = require('../model/products'); 
const Recipe = require('../model/recipes') ;
const Beverage = require('../model/beverages')
const Barista = require('../model/baristas')
const Users = require("../model/users")
const Review = require("../model/reviews")


router.get('/Allproducts', async (req, res) => {
    const products = await Product.find()
    res.json(products);
});



router.get('/product/:id', async (req, res) => {
      const productId = req.params.id;
  

      const product = await Product.findById(productId)
      .populate({
        path: 'recipes',
        populate: [
          {
              path: 'baristaId',
              select: 'username'
          }
      ]
    })
    .populate({
        path: 'beverages',
        populate: {
            path: 'baristaId',
            select: 'username' 
        }
    });


      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json(product);
   
  });



// All Recipes

  router.get('/AllRecipes', async (req, res) => {
    const recipes = await Recipe.find()

    .populate({
      path: 'products',
      select: 'photos bg picture',  
    })
    .exec();
    res.json(recipes);
});



  
router.get('/recipes/:id', async (req, res) => {
  const recipeId = req.params.id;

      const recipe = await Recipe.findById(recipeId)
        .populate('baristaId', 'username')
        .populate({
          path: 'reviews',
          populate: [
            { path: 'userId', select: 'username' },
            { path: 'baristaId', select: 'username' }
          ]
        })
        .populate({
          path: 'products',
          select: 'photos bg picture',  
        });
        

      if (!recipe) {
          return res.status(404).json({ message: 'Recipe not found' });
      }

      res.status(200).json(recipe);
 
});







router.get('/recipes/:id/reviews', async (req, res) => {
  const recipeId = req.params.id;

  try {
    const reviews = await Review.find({ recipeId, isDeleted: false })
      .populate('userId', 'username')  
      .populate('baristaId', 'username');  

    if (!reviews.length) {
      return res.status(404).json({ message: 'No reviews found for this recipe' });
    }

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
});





// router.post('/recipes/:id/reviews', async (req, res) => {
//   const recipeId = req.params.id;
//   const { userId, baristaId, rating, comment } = req.body;

//   try {
//     const review = new Review({
//       userId ,
//       recipeId,
//       baristaId,
//       rating,
//       comment
//     });

//     await review.save();

    
//     res.status(201).json(review);
//   } catch (error) {
//     res.status(500).json({ message: "Error adding review", error });
//   }
// });

router.post('/recipes/:id/reviews', async (req, res) => {
  const recipeId = req.params.id;
  const { userId, baristaId, rating, comment } = req.body;

  try {
    // Create a new review
    const review = new Review({
      userId,
      recipeId,
      baristaId,
      rating,
      comment
    });

    // Save the review to the Review collection
    await review.save();

    // Find the user by userId and push the review into their review array
    const user = await Users.findById(userId);
    if (user) {
      user.review.push(review._id); // Push the review ID into the user's review array
      await user.save(); // Save the user with the updated reviews array
    } else {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error });
  }
});


router.patch('/reviews/:id', async (req, res) => {
  const reviewId = req.params.id;
  const { rating, comment } = req.body;

  try {
    // Find the review by its ID and update the fields
    const review = await Review.findByIdAndUpdate(
      reviewId,
      { rating, comment },
      { new: true } // Return the updated document
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error updating review", error });
  }
});





module.exports = router;





// router.get('/recipes/:id/reviews', async (req, res) => {
//   const recipeId = req.params.id;

//   const recipe = await Recipe.findById(recipeId)
//       .populate({
//           path: 'reviews',
//           populate: [
//               { path: 'userId', select: 'username' },
//               { path: 'baristaId', select: 'username' }
//           ]
//       });

//   if (!recipe) {
//       return res.status(404).json({ message: 'Recipe not found' });
//   }

//   res.status(200).json(recipe.reviews);
// });
