import { useEffect, useState } from "react";
import axios from "axios";

const WorkoutSummary = () => {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const fetchWorkoutSummary = async () => {
      const token = localStorage.getItem("access-token");
      const userEmail = localStorage.getItem("user-email");

      try {
        const res = await axios.get("http://localhost:5000/workouts", {
          headers: { Authorization: `Bearer ${token}` },
          params: { email: userEmail },
        });

        const workouts = res.data;
        const totals = {};

        workouts.forEach((log) => {
          const type = log.workoutType;
          const duration = parseInt(log.duration) || 0;
          if (!totals[type]) totals[type] = 0;
          totals[type] += duration;
        });

        const totalDuration = Object.values(totals).reduce((sum, val) => sum + val, 0);

        const summaryData = Object.entries(totals).map(([type, duration]) => ({
          type,
          percent: totalDuration ? ((duration / totalDuration) * 100).toFixed(1) : 0,
        }));

        setSummary(summaryData);
      } catch (error) {
        console.error("Failed to fetch workout summary:", error);
      }
    };

    fetchWorkoutSummary();
  }, []);

  return (
    <div className="w-full max-w-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Workout Summary</h2>
      <div className="space-y-4">
        {summary.map((item) => (
          <div key={item.type}>
            <div className="flex justify-between text-sm font-medium mb-1">
              <span>{item.type}</span>
              <span>{item.percent}%</span>
            </div>
            <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden">
              <div
                className="h-full bg-pink-500"
                style={{ width: `${item.percent}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutSummary;
