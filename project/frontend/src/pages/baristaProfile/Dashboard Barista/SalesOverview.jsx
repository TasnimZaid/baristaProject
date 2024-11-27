import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { FaCoffee, FaUser, FaUtensils, FaDollarSign } from 'react-icons/fa'; // Importing icons

const SalesOverview = () => {
  const [data, setData] = useState({
    totalBeveragesSold: 0,
    totalCustomers: 0,
    totalSales: 0,
    sharedRecipes: 0,
  });

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios.get('http://localhost:3000/api/orders/barista-stats', {withCredentials: true})
      .then((response) => {
        setData(response.data); // Update the state with the fetched data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <FaCoffee className="text-3xl" /> {/* Using React Icons */}
          <div>
            <p className="text-sm font-medium">Total Beverages Sold</p>
            <p className="text-3xl font-bold">{data.totalBeveragesSold}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <FaUser className="text-3xl" /> {/* Using React Icons */}
          <div>
            <p className="text-sm font-medium">Number of Customers</p>
            <p className="text-3xl font-bold">{data.totalCustomers}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <FaUtensils className="text-3xl" /> {/* Using React Icons */}
          <div>
            <p className="text-sm font-medium">Shared Recipes</p>
            <p className="text-2xl font-bold">{data.sharedRecipes}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <FaDollarSign className="text-3xl" /> {/* Using React Icons */}
          <div>
            <p className="text-sm font-medium">Total Sales</p>
            <p className="text-2xl font-bold">${data.totalSales}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesOverview;
