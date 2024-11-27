import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserId = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users/check-cookies', {
          withCredentials: true,
        });
        setUserId(response.data.userId);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();
  }, []);

  return { userId, loading, error };
};

export default useUserId;
