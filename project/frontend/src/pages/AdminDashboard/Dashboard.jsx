// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import {
//   FaUsers,
//   FaCoffee,
//   FaBook,
//   FaGlassWhiskey,
//   FaShoppingCart,
//   FaHome,
//   FaComments,
//   FaEnvelope,
// } from "react-icons/fa";

// const Dashboard = () => {
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/api/admin/dashboard-stats"
//         );
//         setStats(response.data);
//       } catch (error) {
//         console.error("Error fetching dashboard stats:", error);
//       }
//     };

//     fetchStats();
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

//   const StatCard = ({ title, value, icon }) => (
//     <div className="bg-white rounded-lg shadow-lg p-6 flex items-center">
//       <div className="text-3xl text-blue-500 mr-4">{icon}</div>
//       <div>
//         <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
//         <p className="text-2xl font-bold text-gray-900">{value}</p>
//       </div>
//     </div>
//   );

//   if (!stats)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );

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
//         <div className="dashboard">
//           <h2 className="text-3xl font-bold text-gray-800 mb-8">
//             Dashboard Overview
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <StatCard
//               title="Total Users"
//               value={stats.userCount}
//               icon={<FaUsers />}
//             />
//             <StatCard
//               title="Total Baristas"
//               value={stats.baristaCount}
//               icon={<FaCoffee />}
//             />
//             <StatCard
//               title="Total Recipes"
//               value={stats.recipeCount}
//               icon={<FaBook />}
//             />
//             <StatCard
//               title="Total Beverages"
//               value={stats.beverageCount}
//               icon={<FaGlassWhiskey />}
//             />
//             <StatCard
//               title="Total Orders"
//               value={stats.orderCount}
//               icon={<FaShoppingCart />}
//             />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import {
//   FaUsers,
//   FaCoffee,
//   FaBook,
//   FaGlassWhiskey,
//   FaShoppingCart,
//   FaHome,
//   FaComments,
//   FaEnvelope,
//   FaBell 
// } from "react-icons/fa";
// import ProfitChart from "./ProfitManagement";
// const Dashboard = () => {
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/api/admin/dashboard-stats"
//         );
//         setStats(response.data);
//       } catch (error) {
//         console.error("Error fetching dashboard stats:", error);
//       }
//     };
//     fetchStats();
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

//   const StatCard = ({ title, value, icon }) => (
//     <div className="bg-white rounded-lg shadow-lg p-6 flex items-center">
//       <div className="text-3xl text-blue-500 mr-4">{icon}</div>
//       <div>
//         <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
//         <p className="text-2xl font-bold text-gray-900">{value || 0}</p>
//       </div>
//     </div>
//   );

//   if (!stats)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );

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
//         <div className="dashboard">
//           <h2 className="text-3xl font-bold text-gray-800 mb-8">
//             Dashboard Overview
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <StatCard
//               title="Total Users"
//               value={stats.userCount}
//               icon={<FaUsers />}
//             />
//             <StatCard
//               title="Total Baristas"
//               value={stats.baristaCount}
//               icon={<FaCoffee />}
//             />
//             <StatCard
//               title="Total Recipes"
//               value={stats.recipeCount}
//               icon={<FaBook />}
//             />
//             <StatCard
//               title="Total Beverages"
//               value={stats.beverageCount}
//               icon={<FaGlassWhiskey />}
//             />
//             <StatCard
//               title="Total Orders"
//               value={stats.orderCount}
//               icon={<FaShoppingCart />}
//             />
//              <StatCard
//               title="Total Pending Requests"
//               value={stats.requestCount}
//               icon={<FaBell />}
//             />
//           </div>
//         </div>
//       </main>
//       <ProfitChart/>
//     </div>
//   );
// };

// export default Dashboard;







import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaCoffee,
  FaBook,
  FaGlassWhiskey,
  FaShoppingCart,
  FaHome,
  FaComments,
  FaEnvelope,
  FaBell 
} from "react-icons/fa";
import ProfitChart from "./ProfitManagement";
import AdminDashboard from "./HomeDash"

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/dashboard-stats"
        );
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };
    fetchStats();
  }, []);

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

  const StatCard = ({ title, value, icon }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 flex items-center">
      <div className="text-3xl text-blue-500 mr-4">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value || 0}</p>
      </div>
    </div>
  );

  if (!stats)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="flex h-screen bg-gray-100">
    <AdminDashboard/>
        <div className="flex flex-col ml-8 w-full mt-[3rem] ">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Dashboard Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Total Users"
              value={stats.userCount}
              icon={<FaUsers />}
            />
            <StatCard
              title="Total Baristas"
              value={stats.baristaCount}
              icon={<FaCoffee />}
            />
            <StatCard
              title="Total Recipes"
              value={stats.recipeCount}
              icon={<FaBook />}
            />
            <StatCard
              title="Total Beverages"
              value={stats.beverageCount}
              icon={<FaGlassWhiskey />}
            />
            <StatCard
              title="Total Orders"
              value={stats.orderCount}
              icon={<FaShoppingCart />}
            />
            <StatCard
              title="Total Pending Requests"
              value={stats.requestCount}
              icon={<FaBell />}
            />
          </div>
          {/* Place ProfitChart here */}
          <div className="mb-8">
            <ProfitChart />
          </div>
        </div>

    </div>
  );
};

export default Dashboard;
