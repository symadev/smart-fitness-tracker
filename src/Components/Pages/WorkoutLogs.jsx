import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const WorkoutLogs = () => {
  const [formData, setFormData] = useState({
    workoutType: "",
    duration: "",
    reps: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access-token");
    const userEmail = localStorage.getItem("user-email");

    try {
      const res = await axios.post(
        "http://localhost:5000/workouts",
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

      // Show success popup
      Swal.fire({
        icon: "success",
        title: "Workout Saved!",
        text: "Your workout log has been saved successfully.",
        confirmButtonColor: "#1e40af",
      });

      // Reset form
      setFormData({
        workoutType: "",
        duration: "",
        reps: "",
        date: "",
      });
    } catch (error) {
      console.error("Failed to save workout:", error);

      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: "There was an error saving your workout. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1f60]">
      <div className="w-full max-w-md bg-[#0e1c4b] text-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Log Workout</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold text-sm">Workout Type:</label>
            <select
              name="workoutType"
              value={formData.workoutType}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-[#2c2c54] text-white focus:ring-2 focus:ring-pink-500"
              required
            >
              <option value="">Select Workout</option>
              <option value="Cardio">Cardio</option>
              <option value="Strength">Strength</option>
              <option value="Yoga">Yoga</option>
              <option value="HIIT">HIIT</option>
            </select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-semibold text-sm">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-[#2c2c54] text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500"
                placeholder="e.g. 30 mins"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-semibold text-sm">Reps</label>
              <input
                type="number"
                name="reps"
                value={formData.reps}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-[#2c2c54] text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500"
                placeholder="e.g. 10"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-sm">Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-[#2c2c54] text-white focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 transition-all font-semibold text-white shadow-lg"
          >
            Save Workout
          </button>
        </form>
      </div>
    </div>
  );
};

export default WorkoutLogs;
