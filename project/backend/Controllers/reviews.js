const Review = require("../model/reviews");

// In your review controller

exports.getReviews = async (req, res) => {
  try {
    const { search = '', page = 1, limit = 7 } = req.query;

    // Construct search query
    const searchQuery = search
      ? {
          $or: [
            { 'userId.username': { $regex: search, $options: 'i' } },
            { comment: { $regex: search, $options: 'i' } }
          ],
          isDeleted: false
        }
      : { isDeleted: false };

    // Fetch reviews with search, pagination and populate
    const reviews = await Review.find(searchQuery)
      .populate('userId', 'username')
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalReviews = await Review.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalReviews / limit);

    res.json({
      reviews,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalPages,
        totalReviews
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};

exports.softDeleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review soft deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error soft deleting review" });
  }
};
