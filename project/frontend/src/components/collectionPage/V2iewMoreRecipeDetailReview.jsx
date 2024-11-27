import React from "react";

const V2iewMoreRecipeDetailReview = ({ recipe }) => {
  if (!recipe) return null;

  const containerStyle = {
    display: 'flex',
    width: '100%',
    height: '140vh', // Ensures the container takes full viewport height
    backgroundColor: '#f9f9f9',
    position: 'relative', // Allows absolute positioning of child elements
    fontFamily: "'Trebuchet MS', sans-serif", // نوع خط احترافي
  };

  const contentStyle = {
    fontFamily: "'Trebuchet MS', sans-serif", // نوع خط احترافي
    width: '67%',
    padding: '40px', // زيادة المسافة بين العناصر لتحريكها لأسفل
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    marginTop: '10%',
  };

  const recipeImgStyle = {
    width: '75%',
    maxWidth: '400px',
    height: '80%',
    position: 'absolute',
    top: '15%', // Adjusted positioning for more modern look
    left: '100%',
    transform: 'translate(-50%, 0)',
    zIndex: 2,
  };

  const bgContainerStyle = {
    width: '50%',
    marginRight: "100px",
    position: 'relative',
  };

  const bgImgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: 0,
    // Remove borderRadius to ensure the image is not rounded
  };

  const nameStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '20px 0',
    color: '#333',
    textTransform: 'uppercase', // لتحويل النص إلى أحرف كبيرة
    letterSpacing: '2px', // إضافة مسافة بين الأحرف لمظهر عصري
    fontFamily: "'Trebuchet MS', sans-serif", // نوع خط احترافي
    margin: "10%",
    marginLeft: "-30%",
  };

  const textStyle = {
    fontSize: '18px', // تكبير النص ليكون أكثر وضوحًا
    margin: '20px 0',
    color: '#666',
    textAlign: 'center',
    lineHeight: '1.6', // تحسين تباعد الأسطر
  };

  const ingredientsInstructionsStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', 
    gap: '40px', 
    width: '90%',
    margin: '200px 100px 80px 110px',
    

  };

  const ingredientsStyle = {
    listStyle: 'none',
    padding: '0',
    textAlign: 'left',
  };

  const ingredientItemStyle = {
    fontSize: '16px',
    color: '#333',
    fontFamily: "'Trebuchet MS', sans-serif", // الخط المحترف
    lineHeight: '1.8',
  };

  const instructionsStyle = {
    textAlign: 'left',
    fontSize: '16px',
    color: '#333',
    fontFamily: "'Trebuchet MS', sans-serif", 
    lineHeight: '1.8',
  };
  const Categorycookingcusin ={

     display: 'flex', 
     flexDirection: 'row',
    flexWrap: 'wrap' ,
    marginLeft: "-20%" , 
    marginBottom : " 10px" ,
    borderBottom: '1px solid gray ' , 
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div className="w-[300px] ml-[6%] mr-auto mb-[-7%]">
          <div>
            <div className="flex items-center justify-between text-gray-600 text-xs font-bold font-Trebuchet tracking-wide">
              <span className="border-r border-gray-900 pr-10">Cold</span>
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              <span className="border-r border-gray-900 pr-10">COLD</span>
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              <span>SHORT DRINK</span>
            </div>
          </div>
        </div>
        <h3 style={nameStyle}>{recipe.name || "Recipe Name Not Available"}</h3>

        <div className="w-[400px] ml-[6%] mt-[-6%] mr-auto text-gray-700">
          {recipe.description || "Perfect for a revitalizing start to your day"}
        </div>
        <div style={ingredientsInstructionsStyle}>
          <div>
            <strong style={{ fontSize: '20px', color: '#222', fontWeight: 'bold' }}>Ingredients:</strong>
            <ul style={ingredientsStyle}>
              {(recipe.ingredients && recipe.ingredients.length > 0)
                ? recipe.ingredients.map((ingredient, index) => (
                    <li key={index} style={ingredientItemStyle}>{ingredient}</li>
                  ))
                : <li>No ingredients listed</li>
              }
            </ul>
          </div>
          <div>
            <strong style={{ fontSize: '20px', color: '#222', fontWeight: 'bold' }}>preparation:</strong>
            <p style={instructionsStyle}>
              {recipe.preparation || "No instructions provided"}
            </p>
          </div>
        </div>
        <div  style={Categorycookingcusin}> 
          <p >
            <strong>Categories:</strong> {recipe.categories ? recipe.categories.join(", ") : "Not specified"}
          </p>
          <p style={{ margin: '0 20px' }}>
            <strong>|</strong>
          </p>
          <p style={{ marginRight: '20px', marginBottom: '0' }}>
            <strong>Cooking Time:</strong> {recipe.cookingTime || "Not specified"}
          </p>
          <p style={{ margin: '0 20px' }}>
            <strong>|</strong>
          </p>
          <p style={{ marginBottom: '0' }}>
            <strong>Cuisine:</strong> {recipe.cuisine || "Not specified"}
          </p>
        </div>
      </div>
      <div style={bgContainerStyle}>
        <img 
          src={recipe.bg ? recipe.bg : `http://localhost:3000/default-bg.jpg`} 
          alt={recipe.bg ? recipe.bg : "Default Background"}
          onError={(e) => {
            e.target.src = `http://localhost:3000/default-bg.jpg`;
          }} 
          style={bgImgStyle} 
        />
      </div>
    </div>
  );
};

export default V2iewMoreRecipeDetailReview;
