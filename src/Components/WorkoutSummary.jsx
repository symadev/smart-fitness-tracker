import { useEffect, useState } from "react";
import axios from "axios";

// Progress bar component
const HorizontalProgress = ({ value }) => (
  <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden mt-2">
    <div
      className="h-full bg-pink-500 transition-all duration-300"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

const WorkoutSummary = () => {
  const [summary, setSummary] = useState({});
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchSummary = async () => {
      const token = localStorage.getItem("access-token");
      const email = localStorage.getItem("user-email");

      try {
        const res = await axios.get(`http://localhost:5000/workouts/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const allWorkouts = res.data;

        //  Filter to match both 'email' and 'userEmail'
        const workouts = allWorkouts.filter(
          (w) => w.email === email || w.userEmail === email
        );

        const typeCounts = workouts.reduce((acc, workout) => {
          const type = workout.workoutType;
          acc[type] = (acc[type] || 0) + 1;
          return acc;
        }, {});

        const total = workouts.length;
        const percentages = {};
        for (const [type, count] of Object.entries(typeCounts)) {
          percentages[type] = ((count / total) * 100).toFixed(1);
        }

        setSummary(percentages);
        setProgress((total / 10) * 100); // Optional logic
      } catch (err) {
        console.error("Failed to fetch workout summary", err);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6 rounded-xl shadow-lg text-white mb-8">
      <h2 className="text-xl font-semibold mb-4">Workout Summary</h2>
      <ul className="space-y-2">
        {Object.entries(summary).map(([type, percent]) => (
          <li key={type} className="flex justify-between">
            <span>{type}</span>
            <span>{percent}%</span>
          </li>
        ))}
      </ul>
      <HorizontalProgress value={progress} />
    </div>
  );
};

export default WorkoutSummary;
