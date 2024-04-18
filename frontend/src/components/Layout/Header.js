import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logoutImage from "../../assests/logout.png";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header className="bg-blue-500 py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="text-white text-3xl font-bold">NASA Dashboard</h1>
        </div>
        <nav className="md:ml-4">
          <ul className="flex flex-col md:flex-row">
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`mr-0 md:mr-6 mb-2 md:mb-0 ${
                location.pathname === "/mars" ? "text-yellow-400" : "text-white"
              }`}
            >
              <Link to="/mars" className="hover:text-gray-300 font-medium">
                Mars Rover Photos
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`mr-0 md:mr-6 mb-2 md:mb-0 ${
                location.pathname === "/apod" ? "text-yellow-400" : "text-white"
              }`}
            >
              <Link to="/apod" className="hover:text-gray-300 font-medium">
                APOD
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`mr-0 md:mr-6 mb-2 md:mb-0 ${
                location.pathname === "/image-search"
                  ? "text-yellow-400"
                  : "text-white"
              }`}
            >
              <Link
                to="/image-search"
                className="hover:text-gray-300 font-medium"
              >
                Image Search
              </Link>
            </motion.li>
          </ul>
        </nav>
        {/* Logout button */}
        <div className="self-end">
          {" "}
          {/* Removed md:hidden class */}
          <div className="cursor-pointer" onClick={handleLogout}>
            <img
              src={logoutImage}
              alt="Logout"
              className="h-6 w-6 text-white hover:text-gray-300"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
