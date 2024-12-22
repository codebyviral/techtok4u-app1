import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const FormPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    userType: "",
    aadharCard: null,
    panCard: null,
    profilePicture: null,
  });

  const [userTypes, setUserTypes] = useState([]);
  useEffect(() => {
    axios.get("https://techtok4u-app1-backend.vercel.app/api/get/all-types").then((res) => {
      setUserTypes(res.data);
    });
  }, []);
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

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const fullAddress = `${formData.addressLine1}, ${formData.addressLine2}, ${formData.addressLine3}`;
    const updatedFormData = { ...formData, address: fullAddress };

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", updatedFormData.name);
      formDataToSend.append("email", updatedFormData.email);
      formDataToSend.append("phone", updatedFormData.phone);
      formDataToSend.append("address", updatedFormData.address);
      formDataToSend.append("userType", updatedFormData.userType);

      if (formData.aadharCard)
        formDataToSend.append("aadharCard", formData.aadharCard);
      if (formData.panCard) formDataToSend.append("panCard", formData.panCard);
      if (formData.profilePicture)
        formDataToSend.append("profilePic", formData.profilePicture);

      console.log("Form Data to Send:", Array.from(formDataToSend.entries()));
      const response = await axios.post(
        "https://techtok4u-app1-backend.vercel.app/api/add/user",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(`User Created Successfully. ${response.status}`);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error uploading data");
      console.error("Error uploading data:", error);
    }
  };

  const handleAddUserType = () => {
    if (newUserType.trim()) {
      setUserTypes([...userTypes, newUserType.trim()]);
      setNewUserType(""); // Clear the input field
      setIsPopupOpen(false); // Close the popup
    } else {
      alert("Please enter a valid user type.");
    }
  };

  const addUserType = async () => {
    try {
      const response = await axios.post(
        `https://techtok4u-app1-backend.vercel.app/api/add/user-type`,
        {
          userType: newUserType,
        }
      );
      alert("User Type Added Successfully");
    } catch (error) {
      console.error("Error adding user type:", error);
    } finally {
      location.reload();
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
              required
            >
              {userTypes.map((type, index) => (
                <option key={index} value={type.userType}>
                  {type.userType}
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
            id="aadharCard"
            name="aadharCard"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Pan Card</label>
          <input
            type="file"
            id="panCard"
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
            id="profilePic"
            name="profilePicture"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          {loading ? `Uploading...` : "Submit"}
        </button>
      </form>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Add New User Type</h3>
            <input
              type="text"
              id="newUserType-value"
              onChange={(e) => {
                setNewUserType(e.target.value);
              }}
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
                onClick={addUserType}
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
