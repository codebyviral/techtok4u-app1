import React, { useState } from "react";

const FormPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    userType: "Student",
    aadharCard: null,
    panCard: null,
    profilePicture: null,
  });

  const [userTypes, setUserTypes] = useState(["Student", "Teacher", "Other"]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newUserType, setNewUserType] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Concatenate the address lines
    const fullAddress = `${formData.addressLine1}, ${formData.addressLine2}, ${formData.addressLine3}`;

    // Update formData with the concatenated address
    const updatedFormData = { ...formData, address: fullAddress };

    console.log("Submitted Data: ", updatedFormData);
    alert("User added successfully!");
  };

  const handleAddUserType = () => {
    if (newUserType.trim()) {
      setUserTypes((prevTypes) => [...prevTypes, newUserType.trim()]);
      setNewUserType("");
      setIsPopupOpen(false);
    } else {
      alert("Please enter a valid user type.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Add New User</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Address Line 1
          </label>
          <input
            type="text"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Address Line 1"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Address Line 2
          </label>
          <input
            type="text"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Address Line 2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Address Line 3
          </label>
          <input
            type="text"
            name="addressLine3"
            value={formData.addressLine3}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Address Line 3"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">User Type</label>
          <div className="flex items-center space-x-4">
            <select
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              {userTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setIsPopupOpen(true)}
              className="bg-blue-500 text-white px-3 py-2 rounded-lg"
            >
              Add
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Aadhar Card</label>
          <input
            type="file"
            name="aadharCard"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Pan Card</label>
          <input
            type="file"
            name="panCard"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Profile Picture
          </label>
          <input
            type="file"
            name="profilePicture"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Add New User Type</h3>
            <input
              type="text"
              value={newUserType}
              onChange={(e) => setNewUserType(e.target.value)}
              placeholder="Enter new user type"
              className="w-full px-3 py-2 border rounded-lg mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUserType}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormPage;
