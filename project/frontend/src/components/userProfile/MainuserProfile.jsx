import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faClock, faShoppingBag, faStar, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import RecipeGrid from './RecipeGrid';
import ReviewList from './ReviewList';
import useUserId from '../CustomHooks/UserIdH';
import GetSharedRecipes from '../shared/Getshared';
import StickyNavbar from '../Navbar';

const BaristaUserProfile = () => {
  const [activeTab, setActiveTab] = useState('saved');
  const [user, setUser] = useState(null);
  const [recentViews, setRecentViews] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Track if the user is editing their profile
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
  });
  const { userId, loading, error } = useUserId(); // Use the custom hook



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data
        const userResponse = await axios.get(`http://localhost:3000/api/users/${userId}`);
        setUser(userResponse.data);
        setFormData({
          username: userResponse.data.username,
          email: userResponse.data.email,
          bio: userResponse.data.bio || '',
        });

        // Fetch recent views
        const recentViewsResponse = await axios.get(`http://localhost:3000/api/${userId}/recent-view`);
        const validRecentViews = recentViewsResponse.data.recentView.filter(item => item.recipeId !== null);
        setRecentViews(validRecentViews);

        // Fetch reviews
        const reviewsResponse = await axios.get(`http://localhost:3000/api/user/${userId}/review`);
        setReviews(reviewsResponse.data.review);
        console.log(reviewsResponse.data.review)

      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, [userId]); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:3000/api/users/${userId}`, formData);
      setUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleRemoveFromWishlist = async (recipeId) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${userId}/wishlist/${recipeId}`);
      setUser(prevUser => ({
        ...prevUser,
        wishlist: prevUser.wishlist.filter(item => item.recipeId !== recipeId),
      }));
    } catch (error) {
      console.error('Error removing recipe from wishlist:', error);
    }
  };

  const handleRemoveRecentView = async (recipeId) => {
    try {
      await axios.delete('http://localhost:3000/api/recent-view', {
        data: { userId, recipeId },
      });
      setRecentViews(prev => prev.filter(recipe => recipe._id !== recipeId));
    } catch (error) {
      console.error('Error removing recent view:', error);
    }
  };

  if (!user) {
    return <p className="text-white text-center mt-8">Loading user data...</p>;
  }

  return (
    <>
    <StickyNavbar/>
    <div className="bg-black text-white min-h-screen mt-10">






      {/* Header */}
      <header className="bg-black bg-opacity-50 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center filter blur-sm" style={{backgroundImage: "url('https://www.1883.com/app/uploads/2023/04/Sirop_Chocolat_Ruby-1.webp')"}}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center space-x-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src="https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt={user.username}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{user.username}</h1>
              <p className="text-xl text-gray-300">{user.email}</p>
              <div className="mt-4 flex space-x-6">
                <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  {user.wishlist.length} Saved Recipes
                </span>
                <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  {user.purchasedDishes?.length || 0} Purchased
                </span>
              </div>
            </div>
            <button
              className="ml-auto bg-transparent border border-white text-white px-4 py-2 rounded flex items-center"
              onClick={() => setIsEditing(!isEditing)}
            >
              <FontAwesomeIcon icon={isEditing ? faTimes : faEdit} className="mr-2" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </header>
      <GetSharedRecipes    userId={userId}/>


      {/* User Info */}
      <div className="container mx-auto mt-8 px-4">
        {isEditing && (
          <div className="mb-8 bg-white bg-opacity-10 backdrop-blur-lg p-4 rounded-lg">
            <form onSubmit={handleFormSubmit} className="space-y-4 py-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full bg-white bg-opacity-20 border-none text-white placeholder-gray-400 px-3 py-2 rounded"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-white bg-opacity-20 border-none text-white placeholder-gray-400 px-3 py-2 rounded"
                />
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full bg-white bg-opacity-20 border-none text-white placeholder-gray-400 px-3 py-2 rounded"
                />
              </div>
              <button type="submit" className="w-full bg-[#5b0a2e] text-white py-2 rounded">
                Save Changes
              </button>
            </form>
          </div>
        )}

        {/* Tabs */}
        <div className="w-full">
          <div className="grid w-full grid-cols-4 mb-4 rounded-lg overflow-hidden">
            {[
              { name: 'saved', icon: <FontAwesomeIcon icon={faCoffee} size="lg" /> },
              { name: 'recent', icon: <FontAwesomeIcon icon={faClock} size="lg" /> },
              { name: 'purchased', icon: <FontAwesomeIcon icon={faShoppingBag} size="lg" /> },
              { name: 'reviews', icon: <FontAwesomeIcon icon={faStar} size="lg" /> },
            ].map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`py-2 text-center flex items-center justify-center ${
                  activeTab === tab.name ? 'bg-[#39001A] text-white' : 'bg-bla-800'
                } hover:bg-[#590127] hover:text-white transition`}
              >
                {tab.icon}
                <span className="ml-2">{tab.name.charAt(0).toUpperCase() + tab.name.slice(1)}</span>
              </button>
            ))}
          </div>
          <div>
            {activeTab === 'saved' && (
              <RecipeGrid
                recipes={user.wishlist.map(item => item.recipeId)}
                removeFromWishlist={true}
                handleRemoveFromWishlist={handleRemoveFromWishlist}
              />
            )}
            {activeTab === 'recent' && (
              <RecipeGrid
                recipes={recentViews.map(view => view.recipeId)}
                handleRemoveRecentView={handleRemoveRecentView}
              />
            )}
            {activeTab === 'purchased' && (
              <RecipeGrid
                recipes={user.purchasedDishes || []}
              />
            )}
            {activeTab === 'reviews' && <ReviewList reviews={reviews || []} />}
          </div>
        </div>
      </div>
    </div></>
  );
};

export default BaristaUserProfile;

