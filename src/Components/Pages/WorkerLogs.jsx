import NutritionLogs from "./NutritionLogs";
import SleepLogs from "./SleepLogs";
import WorkoutLogs from "./WorkoutLogs";

const WorkerLogs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-950 to-blue-500 py-10 px-4 sm:px-10">
      <h2 className="text-3xl font-bold text-center text-cyan-300 mb-10">
        Log Your Health Activities
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Workout Form */}
        <div className="rounded-xl shadow-md p-6">
          
          <WorkoutLogs/>
        </div>

        {/* Nutrition Form */}
        <div className=" rounded-xl shadow-md p-6">
          
          <NutritionLogs/>
        </div>

        {/* Sleep Form */}
        <div className=" rounded-xl shadow-md p-6">
         
         <SleepLogs/>
        </div>
      </div>
    </div>
  );
};

export default WorkerLogs;
