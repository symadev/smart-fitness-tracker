
import ProgressBarChart from "../../Components/ProgressBarChart";
import { FaRobot } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import WorkoutSummary from "../WorkoutSummary";
import { Link } from "react-router-dom";




// Optional: Create this component if you still want a simple progress bar
const HorizontalProgress = ({ value }) => (
  <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden mt-2">
    <div
      className="h-full bg-pink-500 transition-all duration-300"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

const DashboardHome = () => {

  //for summery section
const [summary, setSummary] = useState({});
const [progress, setProgress] = useState(0);



  //for summery parcentage section
  useEffect(() => {
    const fetchSummary = async () => {
      const token = localStorage.getItem("access-token");
      const email = localStorage.getItem("user-email");

      console.log("Email:", localStorage.getItem("user-email"));
console.log("Token:", localStorage.getItem("access-token"));


      try {
        const res = await axios.get(`http://localhost:5000/workouts/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const workouts = res.data;

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
        setProgress((total / 10) * 100); // Adjust this logic as needed
      } catch (err) {
        console.error("Failed to fetch workout summary", err);
      }
    };

    fetchSummary();
  }, []);



  return (
    <div className="min-h-screen bg-[#0f1f60] text-white p-6">
      <h1 className="text-cyan-300 text-4xl font-bold mb-6 text-center">Fitness Dashboard</h1>

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Replaced with new summary component */}
  <WorkoutSummary />

      

        {/* Bar Chart */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Weekly Progress</h2>
          <ProgressBarChart />
        </div>



          {/* AI Coach */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <FaRobot size={54} className="text-pink-500 mb-3" />
          <h2 className="text-xl font-semibold mb-2">Talk to AI Coach</h2>
          <Link  to="/dashboard/ai-coach" className="bg-gradient-to-r btn btn-neutral from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 px-6 py-2 rounded-lg  border-0 font-semibold">
            Chat Now
          </Link>
        </div>
      </div>

      {/* Workout Log Table */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-700 p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Workout Logs</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-white">
              <th>Date</th>
              <th>Exercise</th>
              <th>Sets</th>
              <th>Reps</th>
              <th>Dur</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>April 24, 2024</td>
              <td>Rench Press</td>
              <td>3</td>
              <td>10</td>
              <td>30</td>
            </tr>
            {/* Add dynamic rows later */}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default DashboardHome;
