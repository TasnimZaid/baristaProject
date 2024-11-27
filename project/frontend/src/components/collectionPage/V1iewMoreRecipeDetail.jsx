import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import V2iewMoreRecipeDetailReview from "./V2iewMoreRecipeDetailReview";
import EnhancedRecipeReviews from "./EnhancedRecipeReviews";
import useUserId from '../CustomHooks/UserIdH';
import ShareRecipeForm from "../shared/Share";
import { FaShareAlt } from "react-icons/fa"; 
import ReportRecipe from "../report/ReportRecipe";
import StickyNavbar from '../Navbar';


const V1iewMoreRecipeDetail = () => {
  const { id } = useParams(); 
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [baristaId, setBaristaId] = useState(null); 
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { userId } = useUserId(); 
  const [showShareForm, setShowShareForm] = useState(false); // State to toggle form visibility
  const [sharedWithUserId, setSharedWithUserId] = useState('');

  const handleShareClick = () => {
    setShowShareForm(!showShareForm); // Toggle form visibility
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeResponse = await axios.get(`http://localhost:3000/api/recipes/${id}`);
        setRecipe(recipeResponse.data);
        setBaristaId(recipeResponse.data.baristaId._id);
      } catch (error) {
        console.error("Error fetching recipe details!", error);
        setError("Failed to load recipe details.");
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
        const reviewsResponse = await axios.get(`http://localhost:3000/api/recipes/${id}/reviews`);
        if (!reviewsResponse.data || reviewsResponse.data.length === 0) {
          setReviews([]); 
          return; 
        }
        setReviews(reviewsResponse.data);
    };

    fetchRecipe();
    fetchReviews();
  }, [id]);

  useEffect(() => {
    const updateRecentView = async () => {
      try {
        await axios.post(`http://localhost:3000/api/recent-view`, { userId, recipeId: id });
      } catch (error) {
        console.error('Error updating recent views:', error);
      }
    };
    updateRecentView();
  }, [id, userId]);

  const handleWishlistToggle = async () => {
    try {
        if (isInWishlist) {
            await axios.post(`http://localhost:3000/api/users/${userId}/wishlist/remove`, { recipeId: id });
            setIsInWishlist(false);
        } else {
            await axios.post(`http://localhost:3000/api/users/${userId}/wishlist`, { recipeId: id });
            setIsInWishlist(true);
        }
    } catch (error) {
        console.error("Error updating wishlist!", error);
        setError("Failed to update wishlist.");
    }
  };

  if (loading) return <p>Loading recipe details...</p>;
  if (error) return <p>{error}</p>;

  return (

    <>
    <StickyNavbar/>
    
    <div className="h-[500hv] bg-[#f9f9f9]"> 

      <V2iewMoreRecipeDetailReview 
        recipe={recipe} 
        userId={userId}
        baristaId={baristaId}
        Reviews={reviews}
        recipeId={id} 
        handleShareClick={handleShareClick}
        showShareForm={showShareForm}
        sharedWithUserId={sharedWithUserId}
      />

      <ReportRecipe  recipe={recipe} userId={userId}  recipeId={id}/>

      <div>
      <div className="mt-4">
        <FaShareAlt
          className="text-2xl cursor-pointer z-50 absolute top-[131%] left-[24%]
"
          onClick={handleShareClick} // Toggle visibility on click
        />
      </div>

      {showShareForm && (
        <ShareRecipeForm
          userId={userId}
          recipeId={id}
          sharedWithUserId={sharedWithUserId}
        />
      )}
      
      
      </div>

      <div className="container mx-auto p-4">
        <EnhancedRecipeReviews
          recipe={recipe}
          userId={userId}
          baristaId={baristaId}
          Reviews={reviews}
          recipeId={id}
        />
      </div>

      

      <button 
        onClick={handleWishlistToggle}
        className={`
        absolute top-[127.7%] left-[2%] 
          z-50
          p-2 mt-4 ${isInWishlist ? 'bg-gray-700' : 'bg-black'} text-white `}
      >
        {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </button>


     
    </div>
    </>
  );
};

export default V1iewMoreRecipeDetail;
