
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
// } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const BaristaManagement = () => {
//   const [baristas, setBaristas] = useState([]);

//   useEffect(() => {
//     const fetchBaristas = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/api/admin/baristas"
//         );
//         setBaristas(response.data);
//       } catch (error) {
//         console.error("Error fetching baristas:", error);
//       }
//     };

//     fetchBaristas();
//   }, []);

//   const handleApprove = async (id) => {
//     try {
//       await axios.put(`http://localhost:3000/api/admin/baristas/${id}/approve`);
//       setBaristas(
//         baristas.map((barista) =>
//           barista._id === id ? { ...barista, isApproved: true } : barista
//         )
//       );
//     } catch (error) {
//       console.error("Error approving barista:", error);
//     }
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
//       <div className="flex-1 ml-6">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">
//           Barista Management
//         </h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Username
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Email
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Is Approved
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Balance
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {baristas.map((barista) => (
//                 <tr key={barista._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {barista.username}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {barista.email}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         barista.isApproved
//                           ? "bg-green-100 text-green-800"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {barista.isApproved ? "Yes" : "No"}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     ${barista.balance ? barista.balance.toFixed(2) : "0.00"}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     {!barista.isApproved && (
//                       <button
//                         onClick={() => handleApprove(barista._id)}
//                         className="text-indigo-600 hover:text-indigo-900 mr-2"
//                       >
//                         Approve
//                       </button>
//                     )}
//                     <button className="text-gray-600 hover:text-gray-900">
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BaristaManagement;

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
//   FaToggleOn,
//   FaToggleOff,
//   FaTrash,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import AdminDashboard from "./HomeDash";

// const BaristaManagement = () => {
//   const [baristas, setBaristas] = useState([]);
//   const [baristasStats, setBaristasStats] = useState([]);

//   useEffect(() => {
//     const fetchBaristas = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/api/admin/baristas"
//         );
//         setBaristas(response.data);
//       } catch (error) {
//         console.error("Error fetching baristas:", error);
//       }
//     };

//     fetchBaristas();
//   }, []);

//   useEffect(() => {
//     const fetchBaristasStats = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/api/admin/baristas/stats"
//         );
//         setBaristasStats(response.data);
//       } catch (error) {
//         console.error("Error fetching baristas stats:", error);
//       }
//     };

//     fetchBaristasStats();
//   }, []);
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

//   // Merge baristas and stats
//   const baristaStatsMap = baristasStats.reduce((acc, stats) => {
//     acc[stats._id] = stats;
//     return acc;
//   }, {});

//   const toggleBaristaStatus = async (barista) => {
//     try {
//       const response = await axios.patch(
//         `http://localhost:3000/api/admin/baristas/${barista._id}/toggle-status`
//       );
//       if (response.data) {
//         setBaristas(
//           baristas.map((b) =>
//             b._id === barista._id
//               ? { ...b, isActive: response.data.isActive }
//               : b
//           )
//         );
//       }
//     } catch (error) {
//       console.error("Error toggling barista status:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this barista?")) {
//       try {
//         await axios.patch(`http://localhost:3000/api/admin/baristas/${id}`);
//         // Instead of fetching all users again, you can update the local state
//         setBaristas(baristas.filter((barista) => barista._id !== id));
//       } catch (error) {
//         console.error("Error deleting barista:", error);
//       }
//     }
//   };

//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//      <div className="flex h-screen bg-gray-100">
//       <AdminDashboard />
//       <div className="flex flex-col ml-8 w-full mt-[3rem] ">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">
//         Barista Management
//       </h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Username
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Email
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Num. Of Recipes
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Num. Of Beverages
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Num. Of Orders
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Activation
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {baristas.map((barista) => {
//               const stats = baristaStatsMap[barista._id] || {
//                 recipeCount: 0,
//                 beverageCount: 0,
//                 orderCount: 0,
//               };

//               return (
//                 <tr key={barista._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {barista.profilePic} {barista.username}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {barista.email}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {stats.recipeCount}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {stats.beverageCount}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {stats.orderCount}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <button
//                       onClick={() => toggleBaristaStatus(barista)}
//                       className="focus:outline-none transition-colors duration-200"
//                     >
//                       {barista.isActive ? (
//                         <span className="px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 hover:bg-green-200">
//                           <FaToggleOn className="mr-1" /> Active
//                         </span>
//                       ) : (
//                         <span className="px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 hover:bg-red-200">
//                           <FaToggleOff className="mr-1" /> Inactive
//                         </span>
//                       )}
//                     </button>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <button
//                       onClick={() => handleDelete(barista._id)}
//                       className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
//                     >
//                       <FaTrash className="inline mr-1" /> Delete
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//     </div>
//     </div>
//   );
// };

// export default BaristaManagement;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaToggleOn, FaToggleOff, FaTrash } from "react-icons/fa";
// import AdminDashboard from "./HomeDash";

// const BaristaManagement = () => {
//   const [baristas, setBaristas] = useState([]);
//   const [baristasStats, setBaristasStats] = useState([]);

//   useEffect(() => {
//     const fetchBaristas = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/admin/baristas");
//         setBaristas(response.data);
//       } catch (error) {
//         console.error("Error fetching baristas:", error);
//       }
//     };

//     fetchBaristas();
//   }, []);

//   useEffect(() => {
//     const fetchBaristasStats = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/admin/baristas/stats");
//         setBaristasStats(response.data);
//       } catch (error) {
//         console.error("Error fetching baristas stats:", error);
//       }
//     };

//     fetchBaristasStats();
//   }, []);

//   const baristaStatsMap = baristasStats.reduce((acc, stats) => {
//     acc[stats._id] = stats;
//     return acc;
//   }, {});

//   const toggleBaristaStatus = async (barista) => {
//     try {
//       const response = await axios.patch(`http://localhost:3000/api/admin/baristas/${barista._id}/toggle-status`);
//       if (response.data) {
//         setBaristas(baristas.map((b) =>
//           b._id === barista._id ? { ...b, isActive: response.data.isActive } : b
//         ));
//       }
//     } catch (error) {
//       console.error("Error toggling barista status:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this barista?")) {
//       try {
//         await axios.patch(`http://localhost:3000/api/admin/baristas/${id}`);
//         setBaristas(baristas.filter((barista) => barista._id !== id));
//       } catch (error) {
//         console.error("Error deleting barista:", error);
//       }
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <AdminDashboard />
//       <div className="flex flex-col ml-8 w-full mt-6">
//         <h2 className="text-3xl font-bold mb-6 text-gray-800">Barista Management</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md divide-y divide-gray-200">
//             <thead className="bg-gray-50 border-b border-gray-300">
//               <tr>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                   Username
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                   Email
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                   Num. Of Recipes
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                 Num. Of Beverages
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                 Num. Of Orders
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {baristas.map((barista) => {
//                 const stats = baristaStatsMap[barista._id] || {
//                   recipeCount: 0,
//                   beverageCount: 0,
//                   orderCount: 0,
//                 };

//                 return (
//                   <tr key={barista._id} className="hover:bg-gray-100 transition-colors">
//                     <td className="px-6 py-4 whitespace-nowrap flex items-center">
//                       <img
//                         src={barista.profilePic}
//                         alt={`${barista.username}'s profile`}
//                         className="w-10 h-10 rounded-full mr-4"
//                       />
//                       {barista.username}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-gray-600">
//                       {barista.email}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-gray-600">
//                       {stats.recipeCount}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-gray-600">
//                       {stats.beverageCount}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-gray-600">
//                       {stats.orderCount}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <button
//                         onClick={() => toggleBaristaStatus(barista)}
//                         className="focus:outline-none transition-colors duration-200"
//                       >
//                         {barista.isActive ? (
//                           <span className="px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 hover:bg-green-200">
//                             <FaToggleOn className="mr-1" /> Active
//                           </span>
//                         ) : (
//                           <span className="px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 hover:bg-red-200">
//                             <FaToggleOff className="mr-1" /> Inactive
//                           </span>
//                         )}
//                       </button>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <button
//                         onClick={() => handleDelete(barista._id)}
//                         className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
//                       >
//                         <FaTrash className="inline mr-1" /> Delete
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BaristaManagement;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaToggleOn, FaToggleOff, FaTrash } from "react-icons/fa";
// import AdminDashboard from "./HomeDash";

// const BaristaManagement = () => {
//   const [baristas, setBaristas] = useState([]);
//   const [baristasStats, setBaristasStats] = useState([]);
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("");

//   useEffect(() => {
//     const fetchBaristas = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/admin/baristas", {
//           params: {
//             search: search,
//             status: status
//           }
//         });
//         setBaristas(response.data);
//       } catch (error) {
//         console.error("Error fetching baristas:", error);
//       }
//     };

//     fetchBaristas();
//   }, [search, status]);

//   useEffect(() => {
//     const fetchBaristasStats = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/admin/baristas/stats");
//         setBaristasStats(response.data);
//       } catch (error) {
//         console.error("Error fetching baristas stats:", error);
//       }
//     };

//     fetchBaristasStats();
//   }, []);

//   const baristaStatsMap = baristasStats.reduce((acc, stats) => {
//     acc[stats._id] = stats;
//     return acc;
//   }, {});

//   const toggleBaristaStatus = async (barista) => {
//     try {
//       const response = await axios.patch(`http://localhost:3000/api/admin/baristas/${barista._id}/toggle-status`);
//       if (response.data) {
//         setBaristas(baristas.map((b) =>
//           b._id === barista._id ? { ...b, isActive: response.data.isActive } : b
//         ));
//       }
//     } catch (error) {
//       console.error("Error toggling barista status:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this barista?")) {
//       try {
//         await axios.patch(`http://localhost:3000/api/admin/baristas/${id}`);
//         setBaristas(baristas.filter((barista) => barista._id !== id));
//       } catch (error) {
//         console.error("Error deleting barista:", error);
//       }
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <AdminDashboard />
//       <div className="flex flex-col ml-8 w-full mt-6">
//         <h2 className="text-3xl font-bold mb-6 text-gray-800">Barista Management</h2>
//         <div className="mb-4 flex space-x-4">
//           <input
//             type="text"
//             placeholder="Search by username or email"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="border px-4 py-2 rounded"
//           />
//           <select
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             className="border px-4 py-2 rounded"
//           >
//             <option value="">All Statuses</option>
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md divide-y divide-gray-200">
//             <thead className="bg-gray-50 border-b border-gray-300">
//               <tr>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                   Username
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                   Email
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                   Num. Of Recipes
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                   Num. Of Beverages
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                   Num. Of Orders
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {baristas.map((barista) => {
//                 const stats = baristaStatsMap[barista._id] || {
//                   recipeCount: 0,
//                   beverageCount: 0,
//                   orderCount: 0,
//                 };

//                 return (
//                   <tr key={barista._id} className="hover:bg-gray-100 transition-colors">
//                     <td className="px-6 py-4 whitespace-nowrap flex items-center">
//                       <img
//                         src={barista.profilePic}
//                         alt={`${barista.username}'s profile`}
//                         className="w-10 h-10 rounded-full mr-4"
//                       />
//                       {barista.username}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-gray-600">
//                       {barista.email}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-gray-600">
//                       {stats.recipeCount}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-gray-600">
//                       {stats.beverageCount}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-gray-600">
//                       {stats.orderCount}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <button
//                         onClick={() => toggleBaristaStatus(barista)}
//                         className="focus:outline-none transition-colors duration-200"
//                       >
//                         {barista.isActive ? (
//                           <span className="px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 hover:bg-green-200">
//                             <FaToggleOn className="mr-1" /> Active
//                           </span>
//                         ) : (
//                           <span className="px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 hover:bg-red-200">
//                             <FaToggleOff className="mr-1" /> Inactive
//                           </span>
//                         )}
//                       </button>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <button
//                         onClick={() => handleDelete(barista._id)}
//                         className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
//                       >
//                         <FaTrash className="inline mr-1" /> Delete
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BaristaManagement;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaToggleOn, FaToggleOff, FaTrash } from "react-icons/fa";
import AdminDashboard from "./HomeDash";

const BaristaManagement = () => {
  const [baristas, setBaristas] = useState([]);
  const [baristasStats, setBaristasStats] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBaristas = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/baristas", {
          params: {
            search: search,
            status: status,
            page: currentPage,
            limit: 5
          }
        });
        setBaristas(response.data.baristas);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching baristas:", error);
      }
    };

    fetchBaristas();
  }, [search, status, currentPage]);

  useEffect(() => {
    const fetchBaristasStats = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/baristas/stats");
        setBaristasStats(response.data);
      } catch (error) {
        console.error("Error fetching baristas stats:", error);
      }
    };

    fetchBaristasStats();
  }, []);

  const baristaStatsMap = baristasStats.reduce((acc, stats) => {
    acc[stats._id] = stats;
    return acc;
  }, {});

  const toggleBaristaStatus = async (barista) => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/admin/baristas/${barista._id}/toggle-status`);
      if (response.data) {
        setBaristas(baristas.map((b) =>
          b._id === barista._id ? { ...b, isActive: response.data.isActive } : b
        ));
      }
    } catch (error) {
      console.error("Error toggling barista status:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this barista?")) {
      try {
        await axios.patch(`http://localhost:3000/api/admin/baristas/${id}`);
        setBaristas(baristas.filter((barista) => barista._id !== id));
      } catch (error) {
        console.error("Error deleting barista:", error);
      }
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminDashboard />
      <div className="flex flex-col ml-8 w-full mt-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Barista Management</h2>
        <div className="mb-4 flex space-x-4">
          <input
            type="text"
            placeholder="Search by username or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border px-4 py-2 rounded"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md divide-y divide-gray-200">
            <thead className="bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Num. Of Recipes
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Num. Of Beverages
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Num. Of Orders
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {baristas.map((barista) => {
                const stats = baristaStatsMap[barista._id] || {
                  recipeCount: 0,
                  beverageCount: 0,
                  orderCount: 0,
                };

                return (
                  <tr key={barista._id} className="hover:bg-gray-100 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      <img
                        src={barista.profilePic}
                        alt={`${barista.username}'s profile`}
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      {barista.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {barista.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {stats.recipeCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {stats.beverageCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {stats.orderCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleBaristaStatus(barista)}
                        className="focus:outline-none transition-colors duration-200"
                      >
                        {barista.isActive ? (
                          <span className="px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 hover:bg-green-200">
                            <FaToggleOn className="mr-1" /> Active
                          </span>
                        ) : (
                          <span className="px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 hover:bg-red-200">
                            <FaToggleOff className="mr-1" /> Inactive
                          </span>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleDelete(barista._id)}
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
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaristaManagement;
