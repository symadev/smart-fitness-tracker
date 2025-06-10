import { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from the backend
  useEffect(() => {
    axios.get("/api/user")
      .then((res) => {
        console.log("Fetched users:", res.data);
        setUsers(res.data); // Assuming backend returns an array
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Handle role update
  const handleRoleChange = (userId, newRole) => {
    axios.patch(`/api/user/${userId}/role`, { role: newRole })
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
      })
      .catch((err) => console.error("Error updating role:", err));
  };

  return (
    <div className="min-h-screen bg-[#0f1f60] text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-lg p-4 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Change Role</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="border-t border-white/20">
                  <td className="p-2">{user.name || "N/A"}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2 capitalize">{user.role || "user"}</td>
                  <td className="p-2">
                    <select
                      value={user.role || "user"}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="rounded-md bg-white text-black px-2 py-1"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
