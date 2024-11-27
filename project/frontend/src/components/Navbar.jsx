import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCoffee, FaShoppingCart } from 'react-icons/fa';

const StickyNavbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHomePage = location.pathname === "/";

  return (
    <nav
      className={`fixed w-full z-30 transition-all duration-300 ${
        isScrolled || !isHomePage ? "bg-black/40 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse text-white hover:text-white">
          <span className="self-center text-2xl font-bold">BARISTA HUB</span>
        </Link>

        {/* Cart Link */}
        <div className="flex md:order-2 space-x-3 rtl:space-x-reverse">
       
        </div>

        {/* Navbar Links */}
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
            {/* Home Dropdown */}
            <li className="relative group">
              <Link
                to="/"
                className={`block py-2 px-3 md:p-0 ${
                  isHomePage ? "text-white" : "text-white"
                } hover:text-white`}
              >
                Home
              </Link>
              <span
                className={`absolute top-full mt-1 bottom-0 left-0 h-1 bg-white transition-all duration-500 ${
                  location.pathname === "/" ? "w-full" : "w-0 group-hover:w-full group-hover:left-0"
                }`}
              ></span>

              {/* Dropdown Menu for Home */}
              <ul className="absolute left-0 w-48 mt-2 bg-black/40 backdrop-blur-lg shadow-lg rounded-lg hidden group-hover:block">
                {[
                
                  { path: "/collection", label: "Collection" },
                ].map((subItem, subIdx) => (
                  <li key={subIdx} className="relative group">
                    <Link
                      to={subItem.path}
                      className="block px-4 py-2 text-white hover:bg-white hover:text-black"
                    >
                      {subItem.label}
                    </Link>

                    {/* Second-Level Dropdown for Coffee Beans */}
                    {subItem.label === "Collection" && (
                      <ul className="absolute left-full top-0 w-48 mt-0 bg-black/40 backdrop-blur-lg shadow-lg rounded-lg hidden group-hover:block">
                        {[
                          // { path: "/product", label: "Product" },
                        ].map((nestedItem, nestedIdx) => (
                          <li key={nestedIdx}>
                            <Link
                              to={nestedItem.path}
                              className="block px-4 py-2 text-white hover:bg-white hover:text-black"
                            >
                              {nestedItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </li>

            {/* Other Navbar Links */}
            {[
              { path: "/market", label: "Marketplace" },
              { path: "/about", label: "About" },
              { path: "/contact", label: "Contact" },

              
            ].map((link, index) => (
              <li
                key={index}
                className={`relative group ${location.pathname === link.path ? "active" : ""}`}
              >
                <Link
                  to={link.path}
                  className={`block py-2 px-3 md:p-0 ${
                    isHomePage ? "text-white" : "text-white"
                  } hover:text-white`}
                >
                  {link.label}
                </Link>
                <span
                  className={`absolute top-full mt-1 bottom-0 left-0 h-1 bg-white transition-all duration-500 ${
                    location.pathname === link.path
                      ? "w-full"
                      : "w-0 group-hover:w-full group-hover:left-0"
                  }`}
                ></span>
              </li>
            ))}

            {/* Login Dropdown */}
            <li className="relative group">
              <Link
                to="/login"
                className={`block py-2 px-3 md:p-0 ${
                  isHomePage ? "text-white" : "text-white"
                } hover:text-white`}
              >
                Join us
              </Link>
              <span
                className={`absolute top-full mt-1 bottom-0 left-0 h-1 bg-white transition-all duration-500 ${
                  location.pathname === "/login"
                    ? "w-full"
                    : "w-0 group-hover:w-full group-hover:left-0"
                }`}
              ></span>

              {/* Dropdown Menu for Login */}
              <ul className="absolute left-0 w-48 mt-2 bg-black/40 backdrop-blur-lg shadow-lg rounded-lg hidden group-hover:block">
                {[
                   { path: "/LoginUser", label: " As Customer " },
                   { path: "/login", label: " As Barista " },
                 
                ].map((loginItem, loginIdx) => (
                  <li key={loginIdx}>
                    <Link
                      to={loginItem.path}
                      className="block px-4 py-2 text-white hover:bg-white hover:text-black"
                    >
                      {loginItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="relative group">
              <Link
                to="/BaristaUserProfile"
                className={`block py-2 px-3 md:p-0 ${
                  isHomePage ? "text-white" : "text-white"
                } hover:text-white`}
              >
                Profile
              </Link>
              <span
                className={`absolute top-full mt-1 bottom-0 left-0 h-1 bg-white transition-all duration-500 ${
                  location.pathname === "/BaristaUserProfile" ? "w-full" : "w-0 group-hover:w-full group-hover:left-0"
                }`}
              ></span>

            
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default StickyNavbar;
