import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaUsers, FaUser, FaSearch, FaFilter, FaCrown, FaSpinner } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [updatingUsers, setUpdatingUsers] = useState(new Set());
  const token = localStorage.getItem("access-token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading users:", err.response?.data || err);
        Swal.fire({
          title: "Error!",
          text: "Could not load users",
          icon: "error",
          background: "#1e293b",
          color: "#f1f5f9",
          confirmButtonColor: "#3b82f6"
        });
        setLoading(false);
      });
  }, [token]);

  // Filter users based on search term and role filter
  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter]);

  const handleRoleChange = async (id, newRole) => {
    setUpdatingUsers(prev => new Set([...prev, id]));

    try {
      await axios.patch(
        `http://localhost:5000/user/${id}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire({
        title: "Success!",
        text: "Role updated successfully",
        icon: "success",
        background: "#1e293b",
        color: "#f1f5f9",
        confirmButtonColor: "#10b981",
        timer: 2000,
        showConfirmButton: false
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      console.error("Role update failed:", err.response?.data || err);
      Swal.fire({
        title: "Error!",
        text: "Could not update role",
        icon: "error",
        background: "#1e293b",
        color: "#f1f5f9",
        confirmButtonColor: "#ef4444"
      });
    } finally {
      setUpdatingUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const getRoleIcon = (role) => {
    return role === "admin" ? <FaCrown className="text-yellow-400" /> : <FaUser className="text-blue-400" />;
  };

  const getRoleBadgeClass = (role) => {
    return role === "admin"
      ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
      : "bg-gradient-to-r from-blue-400 to-indigo-500 text-white";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <FaUsers className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                User Management
              </h1>
              <p className="text-slate-600 mt-1">Manage user roles and permissions</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Users</p>
                  <p className="text-2xl font-bold">{users.length}</p>
                </div>
                <FaUsers className="text-3xl text-blue-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">Administrators</p>
                  <p className="text-2xl font-bold">{users.filter(u => u.role === 'admin').length}</p>
                </div>
                <FaCrown className="text-3xl text-yellow-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Regular Users</p>
                  <p className="text-2xl font-bold">{users.filter(u => u.role === 'user').length}</p>
                </div>
                <FaUser className="text-3xl text-green-200" />
              </div>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="relative">
              <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="pl-12 pr-8 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="all">All Roles</option>
                <option value="user">Users Only</option>
                <option value="admin">Admins Only</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
                <p className="text-slate-600 text-lg">Loading users...</p>
              </div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-20">
              <FaUsers className="text-6xl text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 text-lg">
                {searchTerm || roleFilter !== "all" ? "No users match your search criteria" : "No users found"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                    <th className="text-left px-6 py-4 text-slate-700 font-semibold">User</th>
                    <th className="text-left px-6 py-4 text-slate-700 font-semibold">Email</th>
                    <th className="text-left px-6 py-4 text-slate-700 font-semibold">Role</th>
                    <th className="text-left px-6 py-4 text-slate-700 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr
                      key={user._id}
                      className="border-b border-slate-100 hover:bg-slate-50/50 transition-all duration-200 group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                              {user.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-slate-600">{user.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getRoleIcon(user.role)}
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeClass(user.role)}`}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative">
                          <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                            disabled={updatingUsers.has(user._id)}
                            className={`px-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer ${updatingUsers.has(user._id) ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-400'
                              }`}
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                          {updatingUsers.has(user._id) && (
                            <FaSpinner className="animate-spin absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;