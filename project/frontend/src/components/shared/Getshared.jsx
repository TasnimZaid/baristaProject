import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUtensils, FaUserFriends, FaShare } from "react-icons/fa";

const GetSharedRecipes = ({ userId }) => {
  const [friendsList, setFriendsList] = useState([]);
  const [sharedRecipes, setSharedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRecipes, setShowRecipes] = useState(false);

  useEffect(() => {
    const fetchSharedData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/${userId}/friends`);
        setFriendsList(response.data.friendsList);
        setSharedRecipes(response.data.sharedRecipes);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSharedData();
  }, [userId]);

  const toggleRecipes = () => {
    setShowRecipes(!showRecipes);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="shared-recipes-container p-6 rounded-lg shadow-lg">
      <button 
        className=" ml-10 recipe-icon-button bg-[#cea2b6] hover:bg-[#610931] hover:text-white text-[#2f0819] font-bold py-2 px-4 rounded-md flex items-center justify-center mb-4"
        onClick={toggleRecipes}
        aria-label="Show shared recipes"
      >
        <FaUtensils className="mr-2" />
        <span>{showRecipes ? "Hide Recipes" : "Show Shared Recipes"}</span>
      </button>

      {showRecipes && (
        <div className="recipe-list">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#c4b5bc]">Shared Recipes</h2>
          {sharedRecipes.length === 0 ? (
            <p className="text-center text-gray-600">No recipes shared yet.</p>
          ) : (
            <ul className="space-y-6">
              {sharedRecipes.map((recipe) => (
                <li key={recipe.recipeId._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-semibold mb-2 text-[#720536]">{recipe.recipeId.name}</h3>
                  <div className="flex items-center mb-2 text-gray-600">
                    <FaUserFriends className="mr-2" />
                    <span>Shared with: {recipe.sharedWith.username}</span>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-1">Ingredients:</h4>
                    <p className="text-gray-600">{recipe.recipeId.ingredients.join(", ")}</p>
                  </div>
                  <div className="flex justify-end">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full flex items-center">
                      <FaShare className="mr-2" />
                      <span>Share Again</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default GetSharedRecipes;