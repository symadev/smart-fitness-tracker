import ProgressBarChart from "../../Components/ProgressBarChart";
import { useEffect, useState } from "react";
import axios from "axios";
import WorkoutSummary from "../WorkoutSummary";
import { Link } from "react-router-dom";
import roboImg from "../../assets/images/icons8-robot-64 (1).png";

const DashboardHome = () => {
  const [summary, setSummary] = useState({});
  const [progress, setProgress] = useState(0);
  const [workoutLogs, setWorkoutLogs] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      const token = localStorage.getItem("access-token");
      const email = localStorage.getItem("user-email");

      try {
        const res = await axios.get(`http://localhost:5000/workouts/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const workouts = res.data;
        setWorkoutLogs(workouts);

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
        setProgress((total / 10) * 100); // Example logic
      } catch (err) {
        console.error("Failed to fetch workout summary", err);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-950 to-blue-500  text-white p-6">
      <h1 className="text-cyan-300 text-4xl font-bold mb-6 text-center">Fitness Dashboard</h1>

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ">
        <WorkoutSummary />

        {/* Bar Chart */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6   rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Weekly Progress</h2>
          <ProgressBarChart />
        </div>

        {/* AI Coach */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
          <img src={roboImg} className="w-24 mb-3" alt="AI Coach" />
          <h2 className="text-xl font-semibold mb-2">Talk to AI Coach</h2>
          <Link
            to="/dashboard/ai-coach"
            className="bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 px-6 py-2 rounded-lg font-semibold shadow-md transition"
          >
            Chat Now
          </Link>
        </div>
      </div>

      {/* Workout Log Table */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-700 p-6 rounded-xl shadow-lg mb-8 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Workout Logs</h2>
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-white text-sm md:text-base">
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Exercise</th>
              <th className="px-4 py-2">Reps</th>
              <th className="px-4 py-2">Duration</th>
            </tr>
          </thead>
          <tbody>
            {workoutLogs.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-gray-200 py-6">
                  No workout logs found. Start tracking your progress!
                </td>
              </tr>
            ) : (
              workoutLogs.map((workout) => (
                <tr key={workout._id} className="bg-white bg-opacity-10 hover:bg-opacity-20 transition">
                  <td className="px-4 py-2">{new Date(workout.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{workout.workoutType}</td>
                  <td className="px-4 py-2">{workout.reps}</td>
                  <td className="px-4 py-2">{workout.duration}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardHome;
