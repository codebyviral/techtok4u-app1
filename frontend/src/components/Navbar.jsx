import React from "react";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-lg font-bold">
        <h1 className="text-white cursor-pointer text-lg font-bold">CRUD App</h1>
      </Link>
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-white hover:underline">
          Home
        </Link>
        <Link to="/form" className="text-white hover:underline">
          Add User
        </Link>
        {/* Replace the Heroicon with FiUser */}
        <FiUser className="h-6 w-6 text-white" />
      </div>
    </nav>
  );
};

export default Navbar;
