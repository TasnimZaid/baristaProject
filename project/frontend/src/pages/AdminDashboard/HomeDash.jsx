// import Dashboard from "./Dashboard";
// import UserManagement from "./UserManagement";
// import BaristaManagement from "./BaristaManagement";
// import RecipeManagement from "./RecipeManagement";
// import BeverageManagement from "./BeverageManagement";
// import OrderManagement from "./OrderManagement";
// import ManageContactMessages from "./ManageContactMessages";

import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaCoffee,
  FaBook,
  FaGlassWhiskey,
  FaShoppingCart,
  FaComments,
  FaEnvelope,
  FaBell 
} from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800">Admin Panel</h2>
        </div>
        <ul className="mt-4">
          <NavItem to="/admin" icon={<FaHome />} text="Dashboard" />
          <NavItem to="/admin/users" icon={<FaUsers />} text="Users" />
          <NavItem to="/admin/baristas" icon={<FaCoffee />} text="Baristas" />
          <NavItem to="/admin/recipes" icon={<FaBook />} text="Recipes" />
          <NavItem
            to="/admin/beverages"
            icon={<FaGlassWhiskey />}
            text="Beverages"
          />
          <NavItem to="/admin/orders" icon={<FaShoppingCart />} text="Orders" />
          <NavItem to="/admin/reviews" icon={<FaComments />} text="Reviews" />
          <NavItem to="/admin/requests" icon={<FaBell />} text="Requests" />
          <NavItem to="/admin/contact-messages"icon={<FaEnvelope />}text="Contact Messages"/>
        </ul>
      </nav>
    </div>
  );
};

const NavItem = ({ to ,icon, text }) => (
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
export default AdminDashboard;






// <main className="flex-1 p-8 overflow-y-auto">
// <Routes>
//   <Route path="/admin/*" element={<Dashboard />} />
//   <Route path="/admin/users" element={<UserManagement />} />
//   <Route path="/admin/baristas" element={<BaristaManagement />} />
//   <Route path="/admin/recipes" element={<RecipeManagement />} />
//   <Route path="/admin/beverages" element={<BeverageManagement />} />
//   <Route path="/admin/orders" element={<OrderManagement />} />
//   <Route path="/admin/contact-messages" element={<ManageContactMessages />}/>
// </Routes>
// </main>