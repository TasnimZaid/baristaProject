// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   FaEdit,
//   FaTrash,
//   FaCheck,
//   FaTimes,
//   FaToggleOn,
//   FaToggleOff,
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


// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingUser, setEditingUser] = useState(null);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:3000/api/admin/users");
//       setUsers(response.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (user) => {
//     setEditingUser(user);
//   };

//   const handleSave = async () => {
//     try {
//       await axios.put(
//         `http://localhost:3000/api/admin/users/${editingUser._id}`,
//         editingUser
//       );
//       setEditingUser(null);
//       fetchUsers();
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       try {
//         await axios.delete(`http://localhost:3000/api/admin/users/${id}`);
//         // Instead of fetching all users again, you can update the local state
//         setUsers(users.filter((user) => user._id !== id));
//       } catch (error) {
//         console.error("Error deleting user:", error);
//       }
//     }
//   };

//   // const toggleUserStatus = async (user) => {
//   //   try {
//   //     const response = await axios.patch(
//   //       `http://localhost:3000/api/admin/users/${user._id}/toggle-status`
//   //     );
//   //     if (response.data) {
//   //       // Update the user in the local state
//   //       setUsers(users.map((u) => (u._id === user._id ? response.data : u)));
//   //     }
//   //   } catch (error) {
//   //     console.error("Error toggling user status:", error);
//   //   }
//   // };
//   const toggleUserStatus = async (user) => {
//     try {
//       const response = await axios.patch(
//         `http://localhost:3000/api/admin/users/${user._id}/toggle-status`
//       );
//       if (response.data) {
//         // تحديث المستخدم في حالة الـ state المحلية
//         setUsers(users.map((u) => (u._id === user._id ? response.data : u)));
//       }
//     } catch (error) {
//       console.error("Error toggling user status:", error);
//     }
//   };
//    const NavItem = ({ to, icon, text }) => (
//      <li>
//        <Link
//          to={to}
//          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
//        >
//          <span className="mr-3 text-lg">{icon}</span>
//          {text}
//        </Link>
//      </li>
//    );

//   return (
//     <div className="flex bg-gray-100 min-h-screen">
//       <nav className="w-64 bg-white shadow-lg fixed h-full">
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

//       <main className="flex-1 ml-64 p-8">
//         <div className="bg-white shadow-md rounded-lg p-6">
//           <h2 className="text-2xl font-bold mb-6 text-gray-800">
//             User Management
//           </h2>
//           {loading ? (
//             <div className="text-center py-4">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Username
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Email
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Is Barista
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Is Active
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {users.map((user) => (
//                     <tr key={user._id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {editingUser && editingUser._id === user._id ? (
//                           <input
//                             type="text"
//                             value={editingUser.username}
//                             onChange={(e) =>
//                               setEditingUser({
//                                 ...editingUser,
//                                 username: e.target.value,
//                               })
//                             }
//                             className="border rounded px-2 py-1"
//                           />
//                         ) : (
//                           user.username
//                         )}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {editingUser && editingUser._id === user._id ? (
//                           <input
//                             type="email"
//                             value={editingUser.email}
//                             onChange={(e) =>
//                               setEditingUser({
//                                 ...editingUser,
//                                 email: e.target.value,
//                               })
//                             }
//                             className="border rounded px-2 py-1"
//                           />
//                         ) : (
//                           user.email
//                         )}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {user.isBarista ? (
//                           <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                             <FaCheck className="mr-1" /> Yes
//                           </span>
//                         ) : (
//                           <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
//                             <FaTimes className="mr-1" /> No
//                           </span>
//                         )}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <button
//                           onClick={() => toggleUserStatus(user)}
//                           className="focus:outline-none transition-colors duration-200"
//                         >
//                           {user.isActive ? (
//                             <span className="px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 hover:bg-green-200">
//                               <FaToggleOn className="mr-1" /> Active
//                             </span>
//                           ) : (
//                             <span className="px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 hover:bg-red-200">
//                               <FaToggleOff className="mr-1" /> Inactive
//                             </span>
//                           )}
//                         </button>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         {editingUser && editingUser._id === user._id ? (
//                           <button
//                             onClick={handleSave}
//                             className="text-green-600 hover:text-green-900 mr-2 transition duration-150 ease-in-out"
//                           >
//                             <FaCheck className="inline mr-1" /> Save
//                           </button>
//                         ) : (
//                           <button
//                             onClick={() => handleEdit(user)}
//                             className="text-indigo-600 hover:text-indigo-900 mr-2 transition duration-150 ease-in-out"
//                           >
//                             <FaEdit className="inline mr-1" /> Edit
//                           </button>
//                         )}
//                         <button
//                           onClick={() => handleDelete(user._id)}
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




// export default UserManagement;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaToggleOn, FaToggleOff, FaTrash } from "react-icons/fa";
// import AdminDashboard from "./HomeDash";

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isActiveFilter, setIsActiveFilter] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     fetchUsers();
//   }, [searchTerm, isActiveFilter, currentPage]);

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         "http://localhost:3000/api/admin/users",
//         {
//           params: {
//             search: searchTerm,
//             isActive: isActiveFilter === "" ? undefined : isActiveFilter,
//             page: currentPage,
//             limit: 7,
//           },
//         }
//       );
//       setUsers(response.data.users);
//       setTotalPages(response.data.totalPages);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       try {
//         await axios.patch(`http://localhost:3000/api/admin/users/${id}`);
//         setUsers(users.filter((user) => user._id !== id));
//       } catch (error) {
//         console.error("Error deleting user:", error);
//       }
//     }
//   };

//   const toggleUserStatus = async (user) => {
//     try {
//       const response = await axios.patch(
//         `http://localhost:3000/api/admin/users/${user._id}/toggle-status`
//       );
//       if (response.data) {
//         setUsers(users.map((u) => (u._id === user._id ? response.data : u)));
//       }
//     } catch (error) {
//       console.error("Error toggling user status:", error);
//     }
//   };

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <AdminDashboard/>
//       <div className="flex flex-col ml-[4rem]">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">User Management</h2>
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search by username or email..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="border rounded-lg p-2 w-full"
//         />
//         <select
//           value={isActiveFilter}
//           onChange={(e) => setIsActiveFilter(e.target.value)}
//           className="border rounded-lg p-2 mt-2 w-full"
//         >
//           <option value="">All Statuses</option>
//           <option value="true">Active</option>
//           <option value="false">Inactive</option>
//         </select>
//       </div>
//       {loading ? (
//         <div className="text-center py-4">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
//         </div>
//       ) : (
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
//                   Is Active
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {users.map((user) => (
//                 <tr key={user._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {user.username}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <button
//                       onClick={() => toggleUserStatus(user)}
//                       className="focus:outline-none transition-colors duration-200"
//                     >
//                       {user.isActive ? (
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
//                       onClick={() => handleDelete(user._id)}
//                       className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
//                     >
//                       <FaTrash className="inline mr-1" /> Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div className="mt-4 flex justify-between">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
//             >
//               Previous
//             </button>
//             <span>
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//       </div>
//     </div>
//   );
// };

// export default UserManagement;





import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaToggleOn, FaToggleOff, FaTrash } from "react-icons/fa";
import AdminDashboard from "./HomeDash";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isActiveFilter, setIsActiveFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, isActiveFilter, currentPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/admin/users",
        {
          params: {
            search: searchTerm,
            isActive: isActiveFilter === "" ? undefined : isActiveFilter,
            page: currentPage,
            limit: 7,
          },
        }
      );
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.patch(`http://localhost:3000/api/admin/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const toggleUserStatus = async (user) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/admin/users/${user._id}/toggle-status`
      );
      if (response.data) {
        setUsers(users.map((u) => (u._id === user._id ? response.data : u)));
      }
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminDashboard />
      <div className="flex flex-col ml-8 w-full mt-[3rem] ">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 ">Users Management</h2>
        <div className="mb-6 flex gap-4 mt-[1rem]">
          <input
            type="text"
            placeholder="Search by username or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-lg p-2 w-full md:w-1/2 lg:w-1/3"
          />
          <select
            value={isActiveFilter}
            onChange={(e) => setIsActiveFilter(e.target.value)}
            className="border rounded-lg p-2 w-full md:w-1/4 lg:w-1/5"
          >
            <option value="">All Statuses</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          </div>
        ) : (
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
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-100 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => toggleUserStatus(user)}
                        className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${
                          user.isActive
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                      >
                        {user.isActive ? <FaToggleOn className="mr-1" /> : <FaToggleOff className="mr-1" />}
                        {user.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
                      >
                        <FaTrash className="inline mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
