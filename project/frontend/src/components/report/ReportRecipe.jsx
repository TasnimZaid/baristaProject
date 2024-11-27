import React, { useState } from 'react';
import axios from 'axios';

const ReportRecipe = ({ recipeId, userId }) => {
  const [isReporting, setIsReporting] = useState(false);

  const handleReport = async () => {
    setIsReporting(true);
    try {
      await axios.patch(`http://localhost:3000/api/${recipeId}/report`, { userId });
      alert('Recipe reported successfully');
    } catch (error) {
      console.error('Error reporting recipe:', error);
      alert('Failed to report recipe');
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <button
      onClick={handleReport}
      disabled={isReporting}
      className={`
        absolute top-[130%] left-[12%]
         z-50
        flex items-center justify-center 
        px-4 py-2 
        bg-black hover:bg-gray-600 text-white
        transition-all duration-300 ease-in-out
        ${isReporting ? 'animate-pulse' : 'transform hover:scale-105'}
      `}
    >
 
     
      {isReporting ? 'Reporting...' : 'Report Recipe'}
    </button>
  );
};

export default ReportRecipe;