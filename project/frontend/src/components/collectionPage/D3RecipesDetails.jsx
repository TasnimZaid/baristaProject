import React, { useContext } from "react";
import { RecipesContext } from "../useContext/RecipesContext";
import { Link } from "react-router-dom";
import { EyeIcon } from "@heroicons/react/outline";
const RecipesDetails = () => {
  const { recipes, loading, error } = useContext(RecipesContext);

  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-6 ">
      <h2 className="text-3xl font-light text-center mb-6">
        Our Delicious Recipes
      </h2>

      {recipes && recipes.length > 0 ? (
        <div className="grid grid-cols-1 font-light sm:grid-cols-2 md:grid-cols-3 gap-6 ">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="recipe-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105"
            >
              <img
                src={
                  recipe.bg ? recipe.bg : `http://localhost:3000/${recipe.bg}`
                }
                alt={recipe.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = `http://localhost:3000/${recipe.bg}`;
                }}
              />
              <div className="p-4 ">
                <h3 className="text-xl font-light mb-2 ">{recipe.name}</h3>
                <p className="text-gray-700 mb-2">
                  <span className="font-light">cookingTime:</span>{" "}
                  {recipe.cookingTime}
                </p>
                <p className="text-gray-700 mb-4">
                  <span className="font-light">Dietary Restrictions:</span>{" "}
                  {recipe.dietaryRestrictions.join(", ")}
                </p>
                <Link
                  to={`/recipes/${recipe._id}`}
                  className="absolute bottom-6 right-6 inline-flex items-center bg-black text-white text-sm py-2 px-4 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:bg-gray-800"
                >
                  <EyeIcon className="w-4 h-4 mr-2" /> View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No recipes available</p>
      )}
    </div>
  );
};

export default RecipesDetails;







