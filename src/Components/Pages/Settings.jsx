import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Settings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch current user info when component mounts
 useEffect(() => {
  const token = localStorage.getItem("access-token");
  if (!token) {
    Swal.fire("Not logged in", "Please login to continue.", "error");
    return;
  }

 
     axios.get("http://localhost:5000/api/user/profile",
 {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setName(res.data.name);
      setEmail(res.data.email);
    })
    .catch((err) => {
      console.error("Error loading user:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to load user info.",
      });
    });
}, []);

  const handleSave = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access-token");

    axios
      .patch(
        "http://localhost:5000/user/update",
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Profile updated!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        Swal.fire({
          icon: "error",
          title: "Update failed",
          text: "Could not update profile. Please try again.",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1f60] px-4">
      <div className="w-full max-w-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <span className="text-blue-400">⚙️</span> SETTINGS
        </h2>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Update Profile</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#4f4ffe] text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#4f4ffe] text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500"
              required
            />
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 text-white font-semibold shadow-md"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
