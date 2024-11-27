import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaTrash,
  FaStar,
  FaHome,
  FaUsers,
  FaCoffee,
  FaBook,
  FaGlassWhiskey,
  FaShoppingCart,
  FaComments,
  FaEnvelope,
} from "react-icons/fa";
import AdminDashboard from "./HomeDash";

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchReviews();
  }, [search, page]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/admin/reviews", {
        params: { search, page, limit: 7 }
      });
      setReviews(response.data.reviews);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSoftDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/reviews/${id}`);
      fetchReviews();
    } catch (error) {
      console.error("Error soft deleting review:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={index < rating ? "text-yellow-400" : "text-gray-300"}
      />
    ));
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
      <AdminDashboard />

      <div className="flex flex-col ml-8 w-full mt-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Review Management</h2>

        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search reviews..."
          className="border rounded px-4 py-2 mb-4 w-full"
        />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reviews.map((review) => (
                  <tr key={review._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {review.userId?.username || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex">{renderStars(review.rating)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {review.comment || "No comment"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(review.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleSoftDelete(review._id)}
                        className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
                      >
                        <FaTrash className="inline mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
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

export default ReviewManagement;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import {
//   FaTrash,
//   FaStar,
//   FaHome,
//   FaUsers,
//   FaCoffee,
//   FaBook,
//   FaGlassWhiskey,
//   FaShoppingCart,
//   FaComments,
//   FaEnvelope,
// } from "react-icons/fa";

// const ReviewManagement = () => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   const fetchReviews = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         "http://localhost:3000/api/admin/reviews"
//       );
//       setReviews(response.data);
//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSoftDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/admin/reviews/${id}`);
//       fetchReviews();
//     } catch (error) {
//       console.error("Error soft deleting review:", error);
//     }
//   };

//   const renderStars = (rating) => {
//     return [...Array(5)].map((_, index) => (
//       <FaStar
//         key={index}
//         className={index < rating ? "text-yellow-400" : "text-gray-300"}
//       />
//     ));
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
//       <nav className="w-64 bg-white shadow-lg">
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

//       <main className="flex-1 p-8 overflow-y-auto">
//         <div className="bg-white shadow-md rounded-lg p-6">
//           <h2 className="text-2xl font-bold mb-6 text-gray-800">
//             Review Management
//           </h2>
//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
//             </div>
//           ) : reviews.length === 0 ? (
//             <p className="text-center text-gray-500">No reviews found.</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       User
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Rating
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Comment
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Created At
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {reviews.map((review) => (
//                     <tr key={review._id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {review.userId?.username || "N/A"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex">{renderStars(review.rating)}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {review.comment}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {new Date(review.createdAt).toLocaleString()}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <button
//                           onClick={() => handleSoftDelete(review._id)}
//                           className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
//                         >
//                           <FaTrash className="inline mr-1" /> Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ReviewManagement;
