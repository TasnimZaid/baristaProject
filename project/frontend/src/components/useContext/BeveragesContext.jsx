import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const BeveragesContext = createContext();

export const BeveragesProvider = ({ children, productId }) => {
  const [beverages, setBeverages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/product/${productId}`)
      .then(response => {
        setBeverages(response.data.beverages || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching beverages!", error);
        setError("Failed to load beverages.");
        setLoading(false);
      });
  }, [productId]);

  return (
    <BeveragesContext.Provider value={{ beverages, loading, error }}>
      {children}
    </BeveragesContext.Provider>
  );
};
