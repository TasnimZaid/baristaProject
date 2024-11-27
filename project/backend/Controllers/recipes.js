const Recipe = require("../model/recipes");
const Review = require("../model/reviews");


exports.getRecipes = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 5 } = req.query;

    const skip = (page - 1) * limit;
    const query = { isDeleted: false };

    if (search) {
      query.name = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    const recipes = await Recipe.find(query)
      .populate("baristaId", "username")
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    
    const totalRecipes = await Recipe.countDocuments(query);
    const totalPages = Math.ceil(totalRecipes / limit);

    res.json({ recipes, totalPages });
  } catch (error) {
    console.error("Error in getRecipes:", error);
    res.status(500).json({ message: "Error fetching recipes" });
  }
};


exports.getReviewRate = async (req, res) => {
  try {
    const reviews = await Review.find().populate("recipeId", "rating");
    const reviewRateMap = reviews.reduce((acc, review) => {
      if (review.recipeId) {
        acc[review.recipeId._id] = review.rating;
      }
      return acc;
    }, {});
    res.json(reviewRateMap);
  } catch (error) {
    console.error("Error in getReviewRate:", error);
    res.status(500).json({ message: "Error fetching reviews" });
  }
};



exports.deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRecipe = await Recipe.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!deleteRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json({ message: "Recipe soft deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error soft deleting recipe" });
  }
};