import React, { useContext } from "react";
import { BeveragesContext } from "../useContext/BeveragesContext";
import { Link } from "react-router-dom";
import { EyeIcon } from '@heroicons/react/outline';


const BeverageDetails = () => {
  const { beverages, loading, error } = useContext(BeveragesContext);

  if (loading) return <p className="text-center text-gray-500">Loading beverages...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-8 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-light text-center mb-8 text-gray-800">Our Refreshing Beverages</h2>

      {beverages && beverages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  font-light lg:grid-cols-4 gap-8">
          {beverages.map((beverage) => (
            <div
              key={beverage._id}
              className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl relative"
            >
              <div className="relative w-full h-64 bg-gray-200">
                <img
                  src={beverage.photos
                    ? beverage.photos
                    : `http://localhost:3000/${beverage.photos}`
                  }
                  alt={beverage.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `http://localhost:3000/${beverage.photos}`;
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-light text-gray-900 mb-2">{beverage.name}</h3>
                <p className="text-gray-600 mb-4">{beverage.description}</p>
                <p className="text-lg font-light ">Price: {beverage.price} JOD</p>

                {/* Discover for More Drinks button positioned at the bottom-right */}
                <Link
                  to="/market"
                  className="absolute bottom-6 right-6 inline-flex items-center bg-black text-white text-sm py-2 px-4 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:bg-indigo-700"                >
                  <EyeIcon className="w-4 h-4 mr-2" />
                  Discover more 
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No beverages available</p>
      )}
    </div>
  );
};

export default BeverageDetails;
