import WorkoutSummary from "../WorkoutSummary";
import ProgressTinyAreaChart from "../../Components/ProgressBarChart";
import NutritionPieChart from "./NutritionPieChart";
import SleepChart from "./SleepChart";
import AIChatBox from "./AIChatBox";


const DashboardHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-950 to-blue-900 text-white p-6">
      <h1 className="text-cyan-300 text-4xl font-bold mb-6 text-center">Fitness Dashboard</h1>

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <WorkoutSummary />
        <ProgressTinyAreaChart />
        <NutritionPieChart />
      </div>

      {/* SleepChart & AI Coach Side by Side */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* SleepChart - smaller width */}
        <div className="md:basis-1/3 h-full">
          <div className="h-full">
            <SleepChart />
          </div>
        </div>

        {/* AI Coach - larger width */}
        <div className="md:basis-2/3 h-full">
          <div className="h-full">
            <AIChatBox />
          </div>
        </div>
      </div>
    </div>
  );;
};

export default DashboardHome;
