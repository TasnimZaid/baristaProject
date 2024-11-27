import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecipeDetailPage = ({ recipeId }) => {
  const [recipe, setRecipe] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`/api/recipes/${recipeId}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    fetchRecipe();
  }, [recipeId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/review/add', {
        recipeId,
        rating,
        content: review
      });
      console.log('Review submitted:', response.data);
      // Reset form after successful submission
      setRating(0);
      setReview('');
      alert('Review submitted successfully!');
      // Optionally, you could refresh the recipe data here to show the new review
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review. Please try again.');
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
      
      {/* Recipe Details */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Recipe Details</h2>
        <p><strong>Cooking Time:</strong> {recipe.cookingTime}</p>
        <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
        <p><strong>Categories:</strong> {recipe.categories.join(', ')}</p>
        <p><strong>Dietary Restrictions:</strong> {recipe.dietaryRestrictions.join(', ')}</p>
      </div>

      {/* Ingredients */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      {/* Preparation Steps */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Preparation</h2>
        <ol>
          {recipe.preparation.map((step, index) => (
            <li key={index}>
              <strong>Step {step.stepNumber}:</strong> {step.description}
            </li>
          ))}
        </ol>
      </div>

      {/* Review Form */}
      <form onSubmit={handleReviewSubmit} className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Write a Review</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Rating</label>
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl mr-1 ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Review</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full p-2 border rounded"
            rows="4"
            placeholder="Write your review here..."
          />
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Review
        </button>
      </form>

      {/* Existing Reviews */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        {recipe.reviews && recipe.reviews.length > 0 ? (
          recipe.reviews.map((review, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <p><strong>Rating:</strong> {'★'.repeat(review.rating)}</p>
              <p>{review.content}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeDetailPage;