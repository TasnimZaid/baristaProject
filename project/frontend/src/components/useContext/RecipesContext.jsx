import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const RecipesContext = createContext();


export const RecipesProvider = ({ children, productId }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      axios.get(`http://localhost:3000/api/product/${productId}`)
        .then(response => {
          setRecipes(response.data.recipes || []);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching recipes!", error);
          setError("Failed to load recipes.");
          setLoading(false);
        });
    }, [productId]);
  
    return (
      <RecipesContext.Provider value={{ recipes, loading, error }}>
        {children}
      </RecipesContext.Provider>
    );
  };