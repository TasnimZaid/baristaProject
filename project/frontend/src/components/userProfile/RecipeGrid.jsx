import React from 'react';
import { Star, Clock, Heart, X, ChefHat } from 'lucide-react';
import axios from 'axios';
import useUserId from '../CustomHooks/UserIdH';


const RecipeGrid = ({ recipes, icon, setRecentViews, removeFromWishlist }) => {
  const { userId, loading, error } = useUserId(); // Use the custom hook

  const handleRemove = async (recipeId) => {
    try {
      const endpoint = removeFromWishlist
        ? `http://localhost:3000/api/users/${userId}/wishlist/${recipeId}` 
        : 'http://localhost:3000/api/recent-view';

      const response = removeFromWishlist
        ? await axios.delete(endpoint)
        : await axios.delete(endpoint, { data: { userId, recipeId } });
    location.reload();
      console.log('Recipe removed:', response.data);
      setRecentViews((prev) => prev.filter((recipe) => recipe._id !== recipeId));
    } catch (error) {
      console.error('Error removing recipe:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 ">
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-gradient-to-br bg-[#F6F2EF]/30 backdrop-blur-lg  to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="relative">
              <img
                src={recipe.bg?.[0] || '/default-recipe-pic.jpg'}
                alt={recipe.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-0 left-0 m-3 bg-yellow-500 text-gray-900 rounded-full p-2">
                <ChefHat size={20} />
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold flex items-center mb-3 text-white">
                {icon && <span className="mr-2">{icon}</span>}
                {recipe.name}
              </h3>
              <div className="flex justify-between items-center mb-3">
                <span className="text-yellow-400 flex items-center">
                  <Star size={18} className="mr-1 fill-current" />
                  <span className="font-semibold">{recipe.rating || '4.5'}</span>
                </span>
                <span className="text-gray-400 flex items-center">
                  <Clock size={18} className="mr-1" />
                  <span>30 min</span>
                </span>
              </div>
              <button
                className="w-full bg-[#720536] text-white py-2 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors duration-300 group"
                onClick={() => handleRemove(recipe._id)}
              >
                <X size={18} className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-3 flex flex-col items-center justify-center py-12 text-gray-400">
          <Heart size={48} className="mb-4 animate-pulse" />
          <p className="text-xl">No recipes found. Start exploring!</p>
        </div>
      )}
    </div>
  );
};

export default RecipeGrid;