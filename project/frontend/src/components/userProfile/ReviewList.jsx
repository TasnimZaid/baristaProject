import React, { useState } from 'react';
import { Star, Edit, ThumbsUp, MessageSquare, X, Clock } from 'lucide-react';

const ReviewList = ({ reviews, onUpdateReview }) => {
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editComment, setEditComment] = useState('');
  const [editRating, setEditRating] = useState('');

  const handleEditClick = (review) => {
    setEditingReviewId(review._id);
    setEditComment(review.comment);
    setEditRating(review.rating);
  };

  const handleUpdateClick = () => {
    if (editingReviewId) {
      onUpdateReview(editingReviewId, { comment: editComment, rating: editRating });
      setEditingReviewId(null);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="bg-gradient-to-br bg-[#F6F2EF]/30 backdrop-blur-lg to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="relative">
              <img 
                src={review.recipeId?.photos || '/api/placeholder/400/200'} 
                alt={review.recipeId?.name || 'Recipe'} 
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2 bg-yellow-500 text-black rounded-full p-1">
                <Star size={16} />
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{review.recipeId?.name || 'Recipe Review'}</h3>
              {editingReviewId === review._id ? (
                <div className="mb-3">
                  <textarea
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg mb-2"
                    rows="3"
                  />
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={editRating}
                      onChange={(e) => setEditRating(e.target.value)}
                      className="w-1/4 px-3 py-2 bg-gray-800 text-white rounded-lg"
                      min="1"
                      max="5"
                    />
                    <button
                      onClick={handleUpdateClick}
                      className="w-full bg-[#720536] text-white py-2 rounded-lg flex items-center justify-center hover:bg-[#990f4d] transition-colors duration-300 group"
                    >
                      <X size={18} className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-gray-300 mb-3">{review.comment}</p>
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-500 mr-1" />
                      <span className="font-semibold">{review.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      <span>30 min</span>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="px-4 py-2 bg-[#720536] m-3">
              <button
                onClick={() => handleEditClick(review)}
                className="w-full bg-[#720536] text-white py-2 rounded-lg flex items-center justify-center hover:bg-[#860e44] transition-colors duration-300 group"
              >
                <X size={18} className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Edit Review
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-16">
          <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-400">لا توجد تعليقات. كن أول من يضيف تعليقًا!</p>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
