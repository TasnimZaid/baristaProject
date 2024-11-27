// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   FaEdit,
//   FaTrash,
//   FaCheck,
//   FaTimes,
//   FaToggleOn,
//   FaToggleOff,
// } from "react-icons/fa";
// import AdminDashboard from "./HomeDash";

// const BaristaRequestManagement = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [statusFilter, setStatusFilter] = useState("");
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     fetchRequests();
//   }, [page, statusFilter]);

//   const fetchRequests = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         "http://localhost:3000/api/admin/requests",
//         {
//           params: {
//             status: statusFilter,
//             page: page,
//           },
//         }
//       );
//       console.log(response.data);

//       const data = response.data.profile || [];
//       if (Array.isArray(data)) {
//         setRequests(data);
//         setTotalPages(response.data.totalPages || 1);
//       } else {
//         console.error("Expected an array but received:", data);
//         setRequests([]);
//       }
//     } catch (error) {
//       console.error("Error fetching requests:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusFilterChange = (event) => {
//     setStatusFilter(event.target.value);
//     setPage(1); // إعادة تعيين الصفحة إلى 1 عند تغيير الفلتر
//   };

//   const toggleRequestStatus = async (request) => {
//     try {
//       const newStatus =
//         request.applicationStatus === "Accept" ? "Reject" : "Accept";
//       const response = await axios.patch(
//         `http://localhost:3000/api/admin/requests/${request._id}/toggle-status`,
//         { applicationStatus: newStatus }
//       );

//       if (response.data) {
//         setRequests(
//           requests.map((r) =>
//             r._id === request._id ? { ...r, applicationStatus: newStatus } : r
//           )
//         );
//       }
//     } catch (error) {
//       console.error("Error toggling request status:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this request?")) {
//       try {
//         await axios.patch(`http://localhost:3000/api/admin/requests/${id}`);
//         setRequests(requests.filter((request) => request._id !== id));
//       } catch (error) {
//         console.error("Error deleting request:", error);
//       }
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <AdminDashboard/>
//       <div className="flex flex-col ml-8 w-full mt-6">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">
//         Requests Management
//       </h2>

//       {/* Status Filter */}
//       <div className="mb-4">
//         <label htmlFor="statusFilter" className="block text-gray-700">
//           Filter by Status:
//         </label>
//         <select
//           id="statusFilter"
//           value={statusFilter}
//           onChange={handleStatusFilterChange}
//           className="mt-2 p-2 border rounded"
//         >
//           <option value="">All</option>
//           <option value="Accept">Accept</option>
//           <option value="Reject">Reject</option>
//           <option value="pending">Pending</option>
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
//                   Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Email
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Phone Number
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Certifications
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Application Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {requests.map((request) => (
//                 <tr key={request._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap flex items-center">
//                     <img
//                       src={`http://localhost:3000/${request.profileImage}`}
//                       alt="Profile"
//                       className="w-12 h-12 object-cover rounded-full"
//                     />
//                     <span className="ml-4">{request.baristaId.username}</span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {request.baristaId.email}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {request.phone}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <a
//                       href={`http://localhost:3000/${request.culinarySchool}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-amber-500 hover:text-amber-600 underline"
//                     >
//                       View Certificate
//                     </a>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {request.applicationStatus}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <button
//                       onClick={() => toggleRequestStatus(request)}
//                       className="focus:outline-none transition-colors duration-200 mr-4"
//                     >
//                       {request.applicationStatus === "Accept" ? (
//                         <span className="px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 hover:bg-red-200">
//                           <FaToggleOff className="mr-1" /> Reject
//                         </span>
//                       ) : (
//                         <span className="px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 hover:bg-green-200">
//                           <FaToggleOn className="mr-1" /> Accept
//                         </span>
//                       )}
//                     </button>

//                     <button
//                       onClick={() => handleDelete(request._id)}
//                       className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
//                     >
//                       <FaTrash className="inline mr-1" /> Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Pagination Controls */}
//       <div className="flex justify-between items-center mt-4">
//         <button
//           onClick={() => setPage(page > 1 ? page - 1 : 1)}
//           disabled={page === 1}
//           className="px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-600"
//         >
//           Previous
//         </button>
//         <span className="mx-2">
//           Page {page} of {totalPages}
//         </span>
//         <button
//           onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
//           disabled={page === totalPages}
//           className="px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-600"
//         >
//           Next
//         </button>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default BaristaRequestManagement;











import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import AdminDashboard from "./HomeDash";

const BaristaRequestManagement = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchRequests();
  }, [page, statusFilter]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/admin/requests",
        {
          params: {
            status: statusFilter,
            page: page,
          },
        }
      );

      const data = response.data.profile || [];
      if (Array.isArray(data)) {
        setRequests(data);
        setTotalPages(response.data.totalPages || 1);
      } else {
        console.error("Expected an array but received:", data);
        setRequests([]);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(1); // Reset page to 1 when changing the filter
  };

  const toggleRequestStatus = async (request) => {
    try {
      // Determine new status based on current status
      const newStatus =
        request.applicationStatus === "Accept" ? "Reject" : "Accept";

      const response = await axios.patch(
        `http://localhost:3000/api/admin/requests/${request._id}/toggle-status`,
        { applicationStatus: newStatus }
      );

      if (response.data) {
        // Update the state to reflect the new status
        setRequests(
          requests.map((r) =>
            r._id === request._id ? { ...r, applicationStatus: newStatus } : r
          )
        );
      }
    } catch (error) {
      console.error("Error toggling request status:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      try {
        await axios.patch(`http://localhost:3000/api/admin/requests/${id}`);
        setRequests(requests.filter((request) => request._id !== id));
      } catch (error) {
        console.error("Error deleting request:", error);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminDashboard />
      <div className="flex flex-col ml-8 w-full mt-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Requests Management</h2>

        {/* Status Filter */}
        <div className="mb-4">
          <label htmlFor="statusFilter" className="block text-gray-700">
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="mt-2 p-2 border rounded"
          >
            <option value="">All</option>
            <option value="Accept">Accept</option>
            <option value="Reject">Reject</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certifications</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      <img
                        src={`http://localhost:3000/${request.profileImage}`}
                        alt="Profile"
                        className="w-12 h-12 object-cover rounded-full"
                      />
                      <span className="ml-4">{request.baristaId.username}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {request.baristaId.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {request.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        href={`http://localhost:3000/${request.culinarySchool}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-500 hover:text-amber-600 underline"
                      >
                        View Certificate
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {request.applicationStatus}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => toggleRequestStatus(request)}
                        className="focus:outline-none transition-colors duration-200 mr-4"
                      >
                        {request.applicationStatus === "Accept" ? (
                          <span className="px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 hover:bg-red-200">
                            <FaToggleOff className="mr-1" /> Reject
                          </span>
                        ) : (
                          <span className="px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 hover:bg-green-200">
                            <FaToggleOn className="mr-1" /> Accept
                          </span>
                        )}
                      </button>

                      <button
                        onClick={() => handleDelete(request._id)}
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

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setPage(page > 1 ? page - 1 : 1)}
            disabled={page === 1}
            className="px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Previous
          </button>
          <span className="mx-2">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
            disabled={page === totalPages}
            className="px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaristaRequestManagement;








// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   FaEdit,
//   FaTrash,
//   FaCheck,
//   FaTimes,
//   FaToggleOn,
//   FaToggleOff,
// } from "react-icons/fa";

// const BaristaRequestManagement = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     fetchRequests();
//   }, [page, statusFilter]);

//   const fetchRequests = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:3000/api/admin/requests", {
//         params: {
//           status: statusFilter,
//           page: page
//         }
//       });
//       console.log(response.data);

//       const data = response.data.profile || [];
//       if (Array.isArray(data)) {
//         setRequests(data);
//         setTotalPages(response.data.totalPages || 1);
//       } else {
//         console.error("Expected an array but received:", data);
//         setRequests([]);
//       }
//     } catch (error) {
//       console.error("Error fetching requests:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusFilterChange = (event) => {
//     setStatusFilter(event.target.value);
//     setPage(1); // إعادة تعيين الصفحة إلى 1 عند تغيير الفلتر
//   };

//   const toggleRequestStatus = async (request) => {
//     try {
//       const newStatus = request.applicationStatus === "Accept" ? "Reject" : "Accept";
//       const response = await axios.patch(
//         `http://localhost:3000/api/admin/requests/${request._id}/toggle-status`,
//         { applicationStatus: newStatus }
//       );

//       if (response.data) {
//         setRequests(requests.map((r) =>
//           r._id === request._id ? { ...r, applicationStatus: newStatus } : r
//         ));
//       }
//     } catch (error) {
//       console.error("Error toggling request status:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this request?")) {
//       try {
//         await axios.patch(`http://localhost:3000/api/admin/requests/${id}`);
//         setRequests(requests.filter((request) => request._id !== id));
//       } catch (error) {
//         console.error("Error deleting request:", error);
//       }
//     }
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-6">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Requests Management</h2>

//       {/* Status Filter */}
//       <div className="mb-4">
//         <label htmlFor="statusFilter" className="block text-gray-700">Filter by Status:</label>
//         <select
//           id="statusFilter"
//           value={statusFilter}
//           onChange={handleStatusFilterChange}
//           className="mt-2 p-2 border rounded"
//         >
//           <option value="">All</option>
//           <option value="Accept">Accept</option>
//           <option value="Reject">Reject</option>
//           <option value="Pending">Pending</option>
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
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certifications</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {requests.map((request) => (
//                 <tr key={request._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap flex items-center">
//                     <img
//                       src={`http://localhost:3000/${request.profileImage}`}
//                       alt="Profile"
//                       className="w-12 h-12 object-cover rounded-full"
//                     />
//                     <span className="ml-4">{request.baristaId.username}</span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">{request.baristaId.email}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{request.phone}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <a
//                       href={`http://localhost:3000/${request.culinarySchool}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-amber-500 hover:text-amber-600 underline"
//                     >
//                       View Certificate
//                     </a>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">{request.applicationStatus}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <button
//                       onClick={() => toggleRequestStatus(request)}
//                       className="focus:outline-none transition-colors duration-200 mr-4"
//                     >
//                       {request.applicationStatus === "Accept" ? (
//                         <span className="px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 hover:bg-red-200">
//                           <FaToggleOff className="mr-1" /> Reject
//                         </span>
//                       ) : (
//                         <span className="px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 hover:bg-green-200">
//                           <FaToggleOn className="mr-1" /> Accept
//                         </span>
//                       )}
//                     </button>

//                     <button
//                       onClick={() => handleDelete(request._id)}
//                       className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
//                     >
//                       <FaTrash className="inline mr-1" /> Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Pagination Controls */}
//       <div className="flex justify-between items-center mt-4">
//         <button
//           onClick={() => setPage(page > 1 ? page - 1 : 1)}
//           disabled={page === 1}
//           className="px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-600"
//         >
//           Previous
//         </button>
//         <span className="mx-2">Page {page} of {totalPages}</span>
//         <button
//           onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
//           disabled={page === totalPages}
//           className="px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-600"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BaristaRequestManagement;
