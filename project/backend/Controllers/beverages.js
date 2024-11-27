const Beverage = require("../model/beverages");
const Review = require("../model/reviews");


exports.getBeverages = async (req, res) => {
  try {
    const { search = '', page = 1, limit = 7 } = req.query;
    
    const searchQuery = search ? { name: { $regex: search, $options: 'i' }, isDeleted: false } : { isDeleted: false };
    const beverages = await Beverage.find(searchQuery)
      .populate('baristaId', 'username')
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalBeverages = await Beverage.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalBeverages / limit);

    res.json({
      beverages,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalPages,
        totalBeverages,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching beverages" });
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


exports.editBeverage = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updateBeverage = await Beverage.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updateBeverage) {
      return res.status(404).json({ message: "Beverage not found" });
    }
    res.json(updateBeverage);
  } catch (error) {
    res.status(500).json({ message: "Error updating beverage" });
  }
};

exports.softDeleteBeverage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBeverage = await Beverage.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    if (!deletedBeverage) {
      return res.status(404).json({ message: "Beverage not found" });
    }

    res.json({ message: "Beverage soft deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error soft deleting beverage" });
  }
};
