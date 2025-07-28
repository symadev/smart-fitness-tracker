import { useEffect, useState } from "react";
import axios from "axios";

const WorkoutSummary = () => {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkoutSummary = async () => {
      setLoading(true);
      const token = localStorage.getItem("access-token");
      const userEmail = localStorage.getItem("user-email");

      try {
        const res = await axios.get("https://fitness-server-lilac.vercel.app/workouts", {
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
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutSummary();
  }, []);

  const getWorkoutIcon = (type) => {
    const icons = {
      Cardio: "🏃‍♂️",
      Strength: "💪",
      Yoga: "🧘‍♀️",
      HIIT: "⚡",
      default: "🏋️‍♂️"
    };
    return icons[type] || icons.default;
  };

  const getProgressColor = (type, index) => {
    const colors = [
      "from-red-400 to-pink-500",
      "from-blue-400 to-cyan-500", 
      "from-green-400 to-emerald-500",
      "from-purple-400 to-violet-500",
      "from-orange-400 to-yellow-500"
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl shadow-2xl p-6 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-12 translate-x-12 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8 animate-pulse delay-300"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-white/20 rounded-lg animate-pulse"></div>
            <div className="h-6 bg-white/20 rounded w-32 animate-pulse"></div>
          </div>
          
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="flex justify-between mb-2">
                  <div className="h-4 bg-white/20 rounded w-16"></div>
                  <div className="h-4 bg-white/20 rounded w-8"></div>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-white/20 rounded-full animate-pulse" style={{width: `${20 + i * 15}%`}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl shadow-2xl relative overflow-hidden group hover:shadow-3xl transition-all duration-300">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12 animate-pulse delay-700"></div>
      <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-white/10 rounded-full animate-bounce delay-1000"></div>
      
      <div className="relative z-10 p-6 h-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm shadow-lg">
            <div className="text-xl">📊</div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white drop-shadow-lg">Workout Summary</h2>
            <p className="text-white/70 text-sm">Your activity breakdown</p>
          </div>
        </div>

        {/* Progress Items */}
        <div className="space-y-5">
          {summary.map((item, index) => (
            <div 
              key={item.type} 
              className="group/item transform hover:scale-102 transition-all duration-200"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Label Row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getWorkoutIcon(item.type)}</span>
                  <span className="text-white font-medium text-sm">{item.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/90 font-bold text-sm">{item.percent}%</span>
                  <div className="w-2 h-2 bg-white/40 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"></div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="relative">
                <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
                  <div
                    className={`h-full bg-gradient-to-r ${getProgressColor(item.type, index)} rounded-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden group-hover/item:shadow-xl`}
                    style={{ 
                      width: `${item.percent}%`,
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer"></div>
                  </div>
                </div>
                
                {/* Glow effect on hover */}
                <div 
                  className={`absolute top-0 h-3 bg-gradient-to-r ${getProgressColor(item.type, index)} rounded-full opacity-0 group-hover/item:opacity-30 transition-all duration-300 blur-sm`}
                  style={{ width: `${item.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Summary */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <div className="flex items-center justify-between">
            <span className="text-white/80 text-sm font-medium">Total Workouts</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-bold">{summary.length} Types</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default WorkoutSummary;