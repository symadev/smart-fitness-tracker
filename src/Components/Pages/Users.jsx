import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access-token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading users:", err.response?.data || err);
        Swal.fire("Error", "Could not load users", "error");
        setLoading(false);
      });
  }, [token]);

  const handleRoleChange = (id, newRole) => {
    axios
      .patch(
        `http://localhost:5000/user/${id}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        Swal.fire("Success", "Role updated", "success");
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === id ? { ...user, role: newRole } : user
          )
        );
      })
      .catch((err) => {
        console.error("Role update failed:", err.response?.data || err);
        Swal.fire("Error", "Could not update role", "error");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Styled Gradient Container */}
      <div className="bg-gradient-to-r from-blue-400 to-indigo-700 p-6 rounded-xl shadow-lg max-w-5xl mx-auto overflow-x-auto">
        <h2 className="text-xl font-semibold text-white mb-4">👥 Manage Users</h2>

        {loading ? (
          <p className="text-center text-white">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-white">No users found.</p>
        ) : (
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-white text-sm md:text-base">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Change Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white transition"
                >
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 capitalize">{user.role}</td>
                  <td className="px-4 py-2">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      className="px-3 py-1 bg-white bg-opacity-80 text-black rounded"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Users;
