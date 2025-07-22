import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const SleepLogs = () => {
  const [formData, setFormData] = useState({
    duration: "",
    date: "",
    startTime: "",
    endTime: "",
    quality: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access-token");
    const userEmail = localStorage.getItem("user-email");

    try {
      await axios.post(
        "http://localhost:5000/sleep",
        {
          ...formData,
          userEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Sleep Log Saved",
        text: "Your sleep record has been successfully saved!",
        confirmButtonColor: "#1e40af",
      });

      setFormData({
        duration: "",
        date: "",
        startTime: "",
        endTime: "",
        quality: "",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save sleep log. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (

    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 w-full max-w-md text-white">
      <h2 className="text-3xl font-bold text-center mb-6">Log Sleep</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          step="0.1"
          name="duration"
          placeholder="Sleep Duration (hrs)"
          value={formData.duration}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded bg-indigo-400 placeholder-white"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded bg-indigo-400 text-white"
        />
        <label htmlFor="startTime" className="block mb-1 text-white">Sleep Start Time</label>
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded bg-indigo-400 text-white"
        />
        <label htmlFor="endTime" className="block mb-1 text-white">Sleep End Time</label>
        <input
          type="time"
          id="endTime"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded bg-indigo-400 text-white"
        />

        <select
          name="quality"
          value={formData.quality}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded bg-indigo-400 text-white"
        >
          <option value="">Select Sleep Quality</option>
          <option value="Excellent">Excellent</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Poor">Poor</option>
        </select>

        <button
          type="submit"
          className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded"
        >
          Save Sleep Log
        </button>
      </form>
    </div>

  );
};

export default SleepLogs;
