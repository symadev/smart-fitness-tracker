import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const NutritionLogs = () => {
  const [formData, setFormData] = useState({
    mealName: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    mealType: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access-token");
    const userEmail = localStorage.getItem("user-email");

    try {
      await axios.post(
        "http://localhost:5000/nutritions",
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
        title: "Nutrition Saved!",
        text: "Your nutrition log has been saved successfully.",
        background: "#1e293b",
        color: "#f1f5f9",
        confirmButtonColor: "#10b981",
      });

      setFormData({
        mealName: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
        mealType: "",
        date: "",
        time: "",
      });
    } catch (error) {
      console.error("Failed to save nutrition:", error);
      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: "There was an error saving your nutrition. Please try again.",
        background: "#1e293b",
        color: "#f1f5f9",
        confirmButtonColor: "#ef4444"
      });
    }
  };

  return (

    <div className="w-full max-w-md bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-xl shadow-lg p-6 mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Log Nutrition</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="mealName"
          value={formData.mealName}
          onChange={handleChange}
          placeholder="Meal Name"
          className="w-full px-3 py-2 rounded-md bg-green-400 text-white placeholder-white focus:ring-2 focus:ring-yellow-300"
          required
        />

        {/* Calories & Protein */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="number"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            placeholder="Calories"
            className="px-3 py-2 rounded-md bg-green-400 text-white placeholder-white"
            required
          />
          <input
            type="number"
            name="protein"
            value={formData.protein}
            onChange={handleChange}
            placeholder="Protein (g)"
            className="px-3 py-2 rounded-md bg-green-400 text-white placeholder-white"
            required
          />
        </div>

        {/* Carbs & Fat */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="number"
            name="carbs"
            value={formData.carbs}
            onChange={handleChange}
            placeholder="Carbs (g)"
            className="px-3 py-2 rounded-md bg-green-400 text-white placeholder-white"
            required
          />
          <input
            type="number"
            name="fat"
            value={formData.fat}
            onChange={handleChange}
            placeholder="Fat (g)"
            className="px-3 py-2 rounded-md bg-green-400 text-white placeholder-white"
            required
          />
        </div>

        {/* Meal Type */}
        <select
          name="mealType"
          value={formData.mealType}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md bg-green-400 text-white"
          required
        >
          <option value="">Select Meal Type</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snacks">Snacks</option>
        </select>

        {/* Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="px-3 py-2 rounded-md bg-green-400 text-white"
            required
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="px-3 py-2 rounded-md bg-green-400 text-white"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 mt-2 rounded-md bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 transition-all font-semibold text-white shadow-md"
        >
          Save Nutrition
        </button>
      </form>
    </div>


  );
};

export default NutritionLogs;
