

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   FaHome,
//   FaUsers,
//   FaCoffee,
//   FaBook,
//   FaGlassWhiskey,
//   FaShoppingCart,
//   FaComments,
//   FaEnvelope,
//   FaEdit,
//   FaTrash,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";


// const BeverageManagement = () => {
//   const [beverages, setBeverages] = useState([]);
//   const [rates, setRates] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [editingBeverage, setEditingBeverage] = useState(null);

//   useEffect(() => {
//     fetchBeverages();
//   }, []);

//   const fetchBeverages = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         "http://localhost:3000/api/admin/beverages"
//       );
//       setBeverages(response.data);
//     } catch (error) {
//       console.error("Error fetching beverages:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   useEffect(() => {
//     const fetchRates = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/admin/beverages/rate");
//         setRates(response.data);
//       } catch (error) {
//         console.error("Error fetching rates:", error);
//         setError("Error fetching rates");
//       }
//     };

//     fetchRates();
//   }, []);

//   const handleEdit = (beverage) => {
//     setEditingBeverage(beverage);
//   };

//   const handleSave = async () => {
//     try {
//       await axios.put(
//         `http://localhost:3000/api/admin/beverages/${editingBeverage._id}`,
//         editingBeverage
//       );
//       setEditingBeverage(null);
//       fetchBeverages();
//     } catch (error) {
//       console.error("Error updating beverage:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.patch(`http://localhost:3000/api/admin/beverages/${id}`);
//       fetchBeverages();
//     } catch (error) {
//       console.error("Error deleting beverage:", error);
//     }
//   };
  

//   const handleInputChange = (e) => {
//     setEditingBeverage({
//       ...editingBeverage,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const NavItem = ({ to, icon, text }) => (
//     <li>
//       <Link
//         to={to}
//         className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
//       >
//         <span className="mr-3 text-lg">{icon}</span>
//         {text}
//       </Link>
//     </li>
//   );



//   return (
//     <div className="flex h-screen bg-gray-100">
//       <nav className="w-64 bg-white shadow-lg h-screen fixed">
//         <div className="p-4">
//           <h2 className="text-2xl font-semibold text-gray-800">Admin Panel</h2>
//         </div>
//         <ul className="mt-4">
//           <NavItem to="/admin" icon={<FaHome />} text="Dashboard" />
//           <NavItem to="/admin/users" icon={<FaUsers />} text="Users" />
//           <NavItem to="/admin/baristas" icon={<FaCoffee />} text="Baristas" />
//           <NavItem to="/admin/recipes" icon={<FaBook />} text="Recipes" />
//           <NavItem
//             to="/admin/beverages"
//             icon={<FaGlassWhiskey />}
//             text="Beverages"
//           />
//           <NavItem to="/admin/orders" icon={<FaShoppingCart />} text="Orders" />
//           <NavItem to="/admin/reviews" icon={<FaComments />} text="Reviews" />
//           <NavItem
//             to="/admin/contact-messages"
//             icon={<FaEnvelope />}
//             text="Contact Messages"
//           />
//         </ul>
//       </nav>

//       <div className="ml-64 p-8 flex-1">
//         <h2 className="text-3xl font-bold mb-8 text-gray-800">
//           Beverage Management
//         </h2>

//         {loading ? (
//           <div className="flex justify-center items-center py-8">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gray-900"></div>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-300">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
//                     Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
//                     Barista
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
//                     Price
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
//                     Quantity
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
//                     Rating
//                   </th>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {beverages.map((beverage) => (
//                   const rating = rates[recipe._id] || "Not yet";
//                   <tr key={beverage._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {editingBeverage &&
//                       editingBeverage._id === beverage._id ? (
//                         <input
//                           type="text"
//                           name="name"
//                           value={editingBeverage.name}
//                           onChange={handleInputChange}
//                           className="border rounded px-2 py-1 w-full"
//                         />
//                       ) : (
//                         beverage.name
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {beverage.baristaId.username}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {editingBeverage &&
//                       editingBeverage._id === beverage._id ? (
//                         <input
//                           type="number"
//                           name="price"
//                           value={editingBeverage.price}
//                           onChange={handleInputChange}
//                           className="border rounded px-2 py-1 w-full"
//                         />
//                       ) : (
//                         `$${beverage.price.toFixed(2)}`
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {editingBeverage &&
//                       editingBeverage._id === beverage._id ? (
//                         <input
//                           type="number"
//                           name="quantityAvailable"
//                           value={editingBeverage.quantityAvailable}
//                           onChange={handleInputChange}
//                           className="border rounded px-2 py-1 w-full"
//                         />
//                       ) : (
//                         beverage.quantityAvailable
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">{rating}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       {editingBeverage &&
//                       editingBeverage._id === beverage._id ? (
//                         <button
//                           onClick={handleSave}
//                           className="text-green-600 hover:text-green-900 transition duration-150 ease-in-out"
//                         >
//                           Save
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => handleEdit(beverage)}
//                           className="text-blue-600 hover:text-blue-900 transition duration-150 ease-in-out"
//                         >
//                           <FaEdit className="inline mr-1" /> Edit
//                         </button>
//                       )}
//                       <button
//                         onClick={() => handleDelete(beverage._id)}
//                         className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
//                       >
//                         <FaTrash className="inline mr-1" /> Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BeverageManagement;



import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaHome,
  FaUsers,
  FaCoffee,
  FaBook,
  FaGlassWhiskey,
  FaShoppingCart,
  FaComments,
  FaEnvelope,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import AdminDashboard from "./HomeDash";

const BeverageManagement = () => {
  const [beverages, setBeverages] = useState([]);
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [editingBeverage, setEditingBeverage] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    fetchBeverages();
    fetchRates();
  }, [search, page]);

  const fetchBeverages = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/admin/beverages", {
        params: { search, page, limit: 7 },
      });
      setBeverages(response.data.beverages);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching beverages:", error);
      setError("Error fetching beverages");
    } finally {
      setLoading(false);
    }
  };

  const fetchRates = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/admin/beverages/rate");
      setRates(response.data);
    } catch (error) {
      console.error("Error fetching rates:", error);
      setError("Error fetching rates");
    }
  };

  const handleEdit = (beverage) => {
    setEditingBeverage(beverage);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/admin/beverages/${editingBeverage._id}`,
        editingBeverage
      );
      setEditingBeverage(null);
      fetchBeverages();
    } catch (error) {
      console.error("Error updating beverage:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/api/admin/beverages/${id}`);
      fetchBeverages();
    } catch (error) {
      console.error("Error deleting beverage:", error);
    }
  };

  const handleInputChange = (e) => {
    setEditingBeverage({
      ...editingBeverage,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const NavItem = ({ to, icon, text }) => (
    <li>
      <Link
        to={to}
        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
      >
        <span className="mr-3 text-lg">{icon}</span>
        {text}
      </Link>
    </li>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminDashboard/>
      <div className="flex flex-col ml-8 w-full mt-6">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Beverage Management</h2>

        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search beverages..."
          className="border rounded px-4 py-2 mb-4 w-full"
        />

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Barista</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {beverages.map((beverage) => {
                  const rating = rates[beverage._id] || "Not yet";

                  return (
                    <tr key={beverage._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingBeverage && editingBeverage._id === beverage._id ? (
                          <input
                            type="text"
                            name="name"
                            value={editingBeverage.name}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          beverage.name
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {beverage.baristaId.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingBeverage && editingBeverage._id === beverage._id ? (
                          <input
                            type="number"
                            name="price"
                            value={editingBeverage.price}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          `$${beverage.price.toFixed(2)}`
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingBeverage && editingBeverage._id === beverage._id ? (
                          <input
                            type="number"
                            name="quantityAvailable"
                            value={editingBeverage.quantityAvailable}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          beverage.quantityAvailable
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {editingBeverage && editingBeverage._id === beverage._id ? (
                          <button
                            onClick={handleSave}
                            className="text-green-600 hover:text-green-900 transition duration-150 ease-in-out"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEdit(beverage)}
                            className="text-blue-600 hover:text-blue-900 transition duration-150 ease-in-out"
                          >
                            <FaEdit className="inline mr-1" /> Edit
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(beverage._id)}
                          className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
                        >
                          <FaTrash className="inline mr-1" /> Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination controls */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
          >
            Previous
          </button>
          <span className="flex items-center">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeverageManagement;
