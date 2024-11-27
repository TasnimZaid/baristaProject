import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecipesProvider } from "../useContext/RecipesContext";
import { BeveragesProvider } from "../useContext/BeveragesContext";
import axios from "axios";
import RecipesDetails from "./D3RecipesDetails";
import BeverageDetails from "./D2BaverageDetails";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function DetailsCollection() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/product/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the product details!", error);
        setError("Failed to load product details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
    <Navbar/>
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Background image with product name */}
        <div className="relative h-85 bg-orange-400">
          <img
            src={product.bg}
            alt={`${product.name} background`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-end justify-center">
            <h1 className="text-white text-6xl font-light mb-8">
              {product.name}
            </h1>
          </div>
        </div>
        
        {/* Product details and Flavor profile */}
        <div className="container mx-auto px-4 py-8 flex">
          {/* Product image */}
          <div className="w-1/3 relative">
            <img
              src={product.photos[0]}
              alt={product.name}
              className="absolute w-80 h-auto"
              style={{
                top: "-180px",
                left: "0",
              }}
            />
          </div>
          
          {/* Center section with product description and Flavor profile */}
          <div className="w-2/3 pl-8 flex">
            {/* Product description */}
            <div className="w-1/2 pr-4">
              <p className="mb-6">{product.description}</p>
              <p className="mb-6">
                This recipe, stands apart
                thanks to its superbly authentic taste.
              </p>
              <p>
                It is an ideal ingredient for enriching your hot and cold drinks, your
                cocktails and your desserts; and to add a tender touch to all your
                recipes.
              </p>
            </div>
            
            {/* Flavor profile chart */}
            <div className="w-1/2">
              <div className="w-64 h-64 mx-auto ">
                {/* Replace this with actual chart component */}
               <img src= {product.picture} />
                <p className="text-center pt-28"></p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recipes and Beverages sections */}
        <div className="container mx-auto py-8">
          <RecipesProvider productId={id}>
            <RecipesDetails />
          </RecipesProvider>
          <BeveragesProvider productId={id}>
            <BeverageDetails />
          </BeveragesProvider>
        </div>
      </main>
    </div>
    
    <Footer/>
    </>
  );
}

export default DetailsCollection;
