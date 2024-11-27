import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const BaristaProfileContext = createContext();

export const useBaristaProfile = () => useContext(BaristaProfileContext);

export const BaristaProfileProvider = ({ children }) => {
  const [barista, setBarista] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/barista-auth/profile`,
        { withCredentials: true }
      );
      setBarista(response.data.profile);
      setError(null);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async (field, value) => {
    try {
      let endpoint = `http://localhost:3000/api/barista-auth/profile`;
      let data = { [field]: value };

      if (field === 'username') {
        endpoint = `http://localhost:3000/api/barista-auth/update-username`;
        data = { username: value };
      }

      const response = await axios.put(endpoint, data, { withCredentials: true });
      
      setBarista(prevState => ({
        ...prevState,
        [field]: response.data[field]
      }));

      return response.data;
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      throw error;
    }
  };

  const updateProfileImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('profileImage', file);

      const response = await axios.put(
        'http://localhost:3000/api/barista-auth/update-profile-image',
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      setBarista(prevState => ({
        ...prevState,
        profileImage: response.data.profileImage
      }));

      return response.data;
    } catch (error) {
      console.error("Error updating profile image:", error);
      throw error;
    }
  };

  return (
    <BaristaProfileContext.Provider value={{ barista, loading, error, fetchProfile, updateProfile, updateProfileImage }}>
      {children}
    </BaristaProfileContext.Provider>
  );
};
