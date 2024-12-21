import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userTypes, setUserTypes] = useState([]);

  useEffect(() => {
    // Fetch all users
    axios.get("http://localhost:4000/api/get/all-users").then((res) => {
      setUsers(res.data);
    });
    // Fetch all User Types
    axios.get("http://localhost:4000/api/get/all-types").then((res) => {
      setUserTypes(res.data);
    });
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Users Dashboard
            </h1>
            <p className="text-gray-600">Total Users: {users.length}</p>
          </div>
          <button
            onClick={() => navigate("/form")}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add User
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Users Table Section */}
          <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Users</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="bg-gray-50">
                    <th className="text-left p-3">Name</th>
                    <th className="text-left p-3">Email</th>
                    <th className="text-left p-3">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {user.userType.userType}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Types Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">User Types</h2>
            <div className="space-y-2">
              {userTypes.map((type) => (
                <div
                  key={type.id}
                  className="p-3 bg-gray-50 rounded-lg flex items-center justify-between"
                >
                  <span>{type.userType}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
