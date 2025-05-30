import WorkoutLogs from "./WorkoutLogs";
import ProgressBarChart from "../../Components/ProgressBarChart";
import { FaRobot } from "react-icons/fa";

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
  return (
    <div className="min-h-screen bg-[#0f1f60] text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Fitness Dashboard</h1>

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Summary Card */}
        <div className="bg-[#0e1c4b] p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Workout Summary</h2>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Cardio</span>
              <span>40%</span>
            </li>
            <li className="flex justify-between">
              <span>Strength</span>
              <span>35%</span>
            </li>
            <li className="flex justify-between">
              <span>Yoga</span>
              <span>25%</span>
            </li>
          </ul>
          <HorizontalProgress value={60} />
        </div>

        {/* AI Coach */}
        <div className="bg-[#0e1c4b] p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <FaRobot size={48} className="text-pink-500 mb-3" />
          <h2 className="text-xl font-semibold mb-2">Talk to AI Coach</h2>
          <button className="bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 px-6 py-2 rounded-lg font-semibold">
            Chat Now
          </button>
        </div>

        {/* Bar Chart */}
        <div className="bg-[#0e1c4b] p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Weekly Progress</h2>
          <ProgressBarChart />
        </div>
      </div>

      {/* Workout Log Table */}
      <div className="bg-[#0e1c4b] p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Workout Logs</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-pink-400">
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
