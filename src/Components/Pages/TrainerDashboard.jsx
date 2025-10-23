import { useState, useEffect } from "react";
import UseAuth from "../Provider.jsx/UseAuth";
import axios from "axios";

const TrainerDashboard = () => {
  const { user } = UseAuth(); 
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("access-token");
        if (!token) throw new Error("No access token found");

        const res = await axios.get("http://localhost:5000/trainer/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBookings(res.data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Confirm a booking
  const handleConfirm = async (id) => {
    try {
      const token = localStorage.getItem("access-token");
      if (!token) throw new Error("No access token found");

      const res = await axios.patch(
        `http://localhost:5000/bookings/${id}/confirm`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.modifiedCount) {
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: "confirmed" } : b))
        );
      }
    } catch (err) {
      console.error("Failed to confirm booking:", err);
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">
        Loading bookings...
      </p>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 border-b-2 border-blue-200 pb-2">
        Trainer Dashboard
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No bookings yet.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">User Email</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Time</th>
                <th className="px-6 py-3 text-left">Notes</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-6 py-3">{booking.userEmail}</td>
                  <td className="px-6 py-3">{booking.date}</td>
                  <td className="px-6 py-3">{booking.time}</td>
                  <td className="px-6 py-3">{booking.notes}</td>
                  <td className="px-6 py-3">
                    {booking.status === "confirmed" ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                        Confirmed
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm font-medium">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    {booking.status !== "confirmed" ? (
                      <button
                        onClick={() => handleConfirm(booking._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold transition"
                      >
                        Confirm
                      </button>
                    ) : (
                      <span className="text-gray-500 font-medium">✔</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TrainerDashboard;
