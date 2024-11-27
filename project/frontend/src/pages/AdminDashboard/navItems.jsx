

import {
  FaHome,
  FaUsers,
  FaCoffee,
  FaBook,
  FaGlassWhiskey,
  FaShoppingCart,
  FaComments,
} from "react-icons/fa";



const NavItems = () => {
    return (
      <>
        <nav className="w-64 bg-white shadow-lg">
          <div className="p-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Admin Panel
            </h2>
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
            <NavItem
              to="/admin/orders"
              icon={<FaShoppingCart />}
              text="Orders"
            />
            <NavItem to="/admin/reviews" icon={<FaComments />} text="Reviews" />
          </ul>
        </nav>
      </>
    );
}
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

export default NavItems;