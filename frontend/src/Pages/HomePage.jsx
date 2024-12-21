import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Welcome to the CRUD App</h1>
      <p className="text-lg mb-6">Total Users: {users.length}</p>
      <button
        onClick={() => navigate("/form")}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Add User
      </button>
    </div>
  );
};

export default HomePage;
