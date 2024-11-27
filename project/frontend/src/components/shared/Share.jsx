import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaShare, FaUserFriends, FaUtensils } from "react-icons/fa";

const ShareRecipeForm = ({ userId, recipeId, sharedWithUserId }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(sharedWithUserId);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/all');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('http://localhost:3000/api/share-recipe', {
        userId,
        recipeId,
        sharedWithUserId: selectedUser,
      });
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (error) {
      console.error('Error sharing recipe:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-gradient-to-br  rounded-2xl shadow-xl ">
      <div className="flex items-center justify-center mb-6">
        <FaUtensils className="text-4xl  mr-3" />
        <h2 className="text-3xl font-bold ">Share Recipe</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-inner">
          <label htmlFor="user" className="block text-sm font-medium text-gray-700 mb-2">
            Share with:
          </label>
          <div className="relative">
            <select
              id="user"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="block w-full pl-3 pr-10 py-3 text-base border-2  focus:outline-none focus:ring-2 focus:ring-black focus:border-black sm:text-sm rounded-lg transition duration-150 ease-in-out"
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username} ({user.email})
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <FaUserFriends className="h-5 w-5 text-black" />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r bg-black hover:from-gray-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out ${
            isLoading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <FaShare className="mr-2 text-xl" />
          )}
          {isLoading ? 'Sharing...' : 'Share Recipe'}
        </button>
      </form>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm mx-auto shadow-2xl transform transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-center text-green-600 mb-4">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <p className="text-xl font-semibold text-center text-gray-800">Recipe shared successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareRecipeForm;