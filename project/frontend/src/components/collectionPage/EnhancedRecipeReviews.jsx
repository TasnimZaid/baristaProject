import React, { useState } from 'react';
import axios from 'axios';
import { Star, Send, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';

const StarRating = ({ rating, onRatingChange = null }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 transition-colors duration-200 ${
            i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
          } ${onRatingChange ? 'cursor-pointer hover:text-yellow-300' : ''}`}
          onClick={() => onRatingChange && onRatingChange(i + 1)}
        />
      ))}
    </div>
  );
};

const EnhancedRecipeReviews = ({ recipeId, userId, baristaId, Reviews = [] }) => {
  const [reviews, setReviews] = useState(Reviews);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.post(`http://localhost:3000/api/recipes/${recipeId}/reviews`, {
        userId,
        baristaId,
        rating: newReview.rating,
        comment: newReview.comment,
      });
      setSuccess("Review added successfully!");
      setReviews([...reviews, response.data]);
      setNewReview({ rating: 0, comment: '' });
      setShowForm(false);
    } catch (error) {
      setError("Failed to add review. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 font-sans text-sm">
      <button
        className="w-50 bg- text-black py-2 px-3  hover:bg-gray-300 transition duration-300 flex items-center justify-center space-x-2 text-sm absolute top-[143%] left-[1%] z-50"
        onClick={() => setShowReviews(!showReviews)}
      >
        <MessageSquare className="w-4 h-4 " />
        <span>{showReviews ? 'Hide Reviews' : 'Show Reviews'}</span>
        {showReviews ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {showReviews && (
        <div className="bg-white shadow-md rounded-md overflow-hidden transition-all duration-300 ease-in-out">
          {reviews.length === 0 ? (
            <p className="text-center text-gray-600 py-4 text-sm">No reviews available for this recipe.</p>
          ) : (
            <div className="divide-y divide-gray-200">
              {reviews.map((review, index) => (
                <div key={index} className="p-4 hover:bg-gray-50 transition duration-200">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <img
                        src={review.userId?.avatar || "/default-avatar.png"}
                        alt={review.userId?.username || "Anonymous"}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 text-sm">{review.userId?.username || "Anonymous"}</span>
                        <span className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                      </div>
                      <StarRating rating={review.rating} />
                      <p className="mt-1 text-gray-600 text-sm">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {!showForm && (
        <button
          className="w-50  text-black  py-2 px-3 hover:bg-gray-300 transition duration-300 flex items-center justify-center space-x-2 text-sm absolute top-[137%] left-[1%] z-50"
          onClick={() => setShowForm(true)}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Write a Review</span>
        </button>
      )}

      {showForm && (
        <div className="bg-white shadow-md rounded-md overflow-hidden transition-all duration-300 ease-in-out">
          <div className="p-4">
            <h2 className="text-lg font-bold mb-3 text-gray-800">Add Your Review</h2>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-3 text-xs">{error}</div>}
            {success && <div className="bg-green-100 border border-green-400 text-green-700 px-3 py-2 rounded mb-3 text-xs">{success}</div>}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex items-center space-x-2">
                <StarRating 
                  rating={newReview.rating} 
                  onRatingChange={(rating) => setNewReview({ ...newReview, rating })}
                />
              </div>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                placeholder="Share your thoughts about this recipe..."
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                rows={3}
                required
              />
              <div className="flex space-x-3">
                <button type="submit" className="flex-1 bg-black text-white py-2 px-3 rounded-md hover:bg-gray-800 transition duration-300 flex items-center justify-center text-sm">
                  <Send className="w-4 h-4 mr-2" />
                  Submit
                </button>
                <button
                  type="button"
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-3 rounded-md hover:bg-gray-300 transition duration-300 text-sm"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedRecipeReviews;