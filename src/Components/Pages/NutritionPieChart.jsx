import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import axios from "axios";

const mealColors = {
  Breakfast: "#ff6b6b",
  Lunch: "#4ecdc4",
  Dinner: "#45b7d1",
  Snacks: "#f9ca24",
};

const mealIcons = {
  Breakfast: "🌅",
  Lunch: "☀️",
  Dinner: "🌙",
  Snacks: "🍎",
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-lg border border-white/20 rounded-2xl p-4 shadow-2xl">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{mealIcons[data.name]}</span>
          <span className="font-bold text-gray-800">{data.name}</span>
        </div>
        <div className="text-sm text-gray-600">
          <p className="font-semibold">Logs: {data.value}</p>
          <p>Category: {data.name}</p>
        </div>
      </div>
    );
  }
  return null;
};

const NutritionPieChart = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nutritionData, setNutritionData] = useState([]);
  const [totalLogs, setTotalLogs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [weeklyCount, setWeeklyCount] = useState(0);

  useEffect(() => {
    const fetchNutritionLogs = async () => {
      try {
        const token = localStorage.getItem("access-token");

        const res = await axios.get("http://localhost:5000/nutritions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const logs = res.data || [];

        // Filter logs from last 7 days for weekly count
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - 7);
        const weeklyLogs = logs.filter((log) => {
          const logDate = new Date(log.date);
          return !isNaN(logDate) && logDate > cutoff;
        });
        setWeeklyCount(weeklyLogs.length);

        // Count logs per mealType (Breakfast, Lunch, Dinner, Snacks)
        const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snacks"];
        const counts = mealTypes.map((meal) => {
          return {
            name: meal,
            value: logs.filter((log) => log.mealType === meal).length,
            color: mealColors[meal],
            icon: mealIcons[meal],
          };
        });

        // Filter out meals with zero count for cleaner display
        const filteredData = counts.filter((item) => item.value > 0);

        setNutritionData(filteredData);
        setTotalLogs(filteredData.reduce((sum, item) => sum + item.value, 0));
      } catch (error) {
        console.error("Failed to fetch nutrition logs:", error);
        // fallback empty data
        setNutritionData([]);
        setTotalLogs(0);
        setWeeklyCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchNutritionLogs();
  }, []);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  if (loading) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>

        <div className="relative z-10 p-8 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="h-7 bg-white/20 rounded-lg w-48 animate-pulse mb-2"></div>
              <div className="h-4 bg-white/10 rounded w-32 animate-pulse"></div>
            </div>
            <div className="w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="w-48 h-48 bg-white/5 rounded-full animate-pulse border-8 border-white/10"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-96 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 rounded-3xl shadow-2xl relative overflow-hidden group hover:shadow-emerald-500/25 transition-all duration-700">
      <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm"></div>

      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-yellow-400/15 to-orange-500/10 rounded-full -translate-y-20 translate-x-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-lime-400/10 to-green-500/10 rounded-full translate-y-16 -translate-x-16 animate-pulse"></div>
      <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-yellow-300/40 rounded-full animate-bounce"></div>
      <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-lime-300/30 rounded-full animate-bounce"></div>

      <div className="relative z-10 p-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white drop-shadow-lg mb-1 flex items-center gap-3">
              <span className="text-3xl">🥗</span>
              Nutrition Insights
            </h2>
            <p className="text-white/80 text-sm">Weekly meal tracking overview</p>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
              <span className="text-white/90 text-sm font-medium">This Week</span>
            </div>
            <div className="text-white font-bold text-2xl">{weeklyCount}</div>
            <div className="text-white/70 text-xs">Total Logs</div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-inner relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-cyan-500/5 rounded-2xl"></div>

          <div className="relative z-10 h-full flex">
            {/* Pie Chart */}
            <div className="flex-1">
              {nutritionData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={nutritionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                      onMouseEnter={onPieEnter}
                      animationBegin={0}
                      animationDuration={800}
                    >
                      {nutritionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke={index === activeIndex ? "#ffffff" : "none"}
                          strokeWidth={index === activeIndex ? 3 : 0}
                          style={{
                            filter:
                              index === activeIndex
                                ? "brightness(1.1) drop-shadow(0 0 10px rgba(255,255,255,0.3))"
                                : "none",
                            transform: index === activeIndex ? "scale(1.05)" : "scale(1)",
                            transformOrigin: "center",
                            transition: "all 0.3s ease",
                          }}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-white/70">
                    <div className="text-5xl mb-3">🍽️</div>
                    <p className="font-medium">No nutrition data available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="w-32 flex flex-col justify-center gap-3 ml-4">
              {nutritionData.map((entry, index) => (
                <div
                  key={`legend-${index}`}
                  className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-white/20 backdrop-blur-sm transform scale-105"
                      : "hover:bg-white/10"
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{entry.icon}</span>
                    <div
                      className="w-3 h-3 rounded-full shadow-sm"
                      style={{ backgroundColor: entry.color }}
                    ></div>
                  </div>
                  <div>
                    <div className="text-white text-xs font-medium">{entry.name}</div>
                    <div className="text-white/70 text-xs">{entry.value} logs</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse"></div>
            <span className="text-white/90 text-sm font-medium">Nutrition Tracking</span>
          </div>

          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-white font-bold text-sm">{totalLogs}</div>
              <div className="text-white/70 text-xs">Total</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold text-sm">
                {nutritionData.length > 0 ? Math.round((weeklyCount / 7) * 10) / 10 : 0}
              </div>
              <div className="text-white/70 text-xs">Daily Avg</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionPieChart;
