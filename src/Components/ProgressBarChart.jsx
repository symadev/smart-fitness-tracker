import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import axios from "axios";

// Helper to count logs within X days
const countLogsInDays = (logs, days) => {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return logs.filter(log => new Date(log.date) > cutoff).length;
};

const ProgressBarChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [trend, setTrend] = useState("up");

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      const token = localStorage.getItem("access-token");

      try {
        const res = await axios.get("http://localhost:5000/workouts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const workouts = res.data || [];
        const total = workouts.length || 1; // Avoid division by zero
        setTotalWorkouts(workouts.length);

        const progressData = [
          {
            name: "1D",
            period: "Today",
            uv: parseFloat(((countLogsInDays(workouts, 1) / total) * 100).toFixed(1)),
          },
          {
            name: "1W",
            period: "This Week",
            uv: parseFloat(((countLogsInDays(workouts, 7) / total) * 100).toFixed(1)),
          },
          {
            name: "1M",
            period: "This Month",
            uv: parseFloat(((countLogsInDays(workouts, 30) / total) * 100).toFixed(1)),
          },
          {
            name: "3M",
            period: "3 Months",
            uv: parseFloat(((countLogsInDays(workouts, 90) / total) * 100).toFixed(1)),
          },
          {
            name: "6M",
            period: "6 Months",
            uv: parseFloat(((countLogsInDays(workouts, 180) / total) * 100).toFixed(1)),
          },
        ];

        // Determine trend: compare 1W vs 1M
        const recent = progressData[1].uv; // 1W
        const older = progressData[2].uv;   // 1M
        setTrend(recent >= older ? "up" : "down");

        setData(progressData);
      } catch (error) {
        console.error("Failed to fetch logs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataPoint = data.find(d => d.name === label);
      return (
        <div className="bg-gray-900/95 backdrop-blur-lg border border-purple-500/30 rounded-xl p-4 shadow-2xl">
          <p className="text-purple-200 font-medium text-sm mb-1">{dataPoint?.period}</p>
          <p className="text-white font-bold text-lg">
            {payload[0].value}%
          </p>
          <div className="w-full h-px bg-gradient-to-r from-purple-500/20 to-pink-500/20 my-2"></div>
          <p className="text-gray-300 text-xs">of total workouts</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 rounded-2xl shadow-2xl relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
        
        <div className="relative z-10 p-6 h-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="h-6 bg-white/20 rounded w-32 animate-pulse mb-2"></div>
              <div className="h-4 bg-white/10 rounded w-24 animate-pulse"></div>
            </div>
            <div className="w-12 h-12 bg-white/10 rounded-full animate-pulse"></div>
          </div>
          
          <div className="h-48 bg-white/5 rounded-xl animate-pulse flex items-end justify-center space-x-2 p-4">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="bg-white/20 rounded-t animate-pulse" style={{height: `${30 + i * 15}%`, width: '20px'}}></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 rounded-2xl shadow-2xl relative overflow-hidden group hover:shadow-3xl transition-all duration-500">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full -translate-y-20 translate-x-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full translate-y-12 -translate-x-12 animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-pink-400/30 rounded-full animate-bounce delay-500"></div>
      <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-cyan-400/20 rounded-full animate-bounce delay-1500"></div>
      
      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white drop-shadow-lg mb-1">
              Workout Progress
            </h2>
            <p className="text-white/70 text-sm">Activity distribution over time</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-full ${trend === 'up' ? 'bg-green-500/20' : 'bg-red-500/20'} backdrop-blur-sm`}>
              <div className={`text-lg ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {trend === 'up' ? '📈' : '📉'}
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold text-lg">{totalWorkouts}</div>
              <div className="text-white/60 text-xs">Total Workouts</div>
            </div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="flex-1 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4 shadow-inner relative overflow-hidden">
          {/* Chart glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-cyan-500/5 rounded-xl"></div>
          
          <div className="relative z-10 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f472b6" stopOpacity={0.8}/>
                    <stop offset="50%" stopColor="#c084fc" stopOpacity={0.6}/>
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f472b6"/>
                    <stop offset="50%" stopColor="#c084fc"/>
                    <stop offset="100%" stopColor="#60a5fa"/>
                  </linearGradient>
                  
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#e5e7eb', fontSize: 12, fontWeight: 500 }}
                  dy={10}
                />
                
                <YAxis hide />
                
                <Tooltip content={<CustomTooltip />} />
                
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="url(#strokeGradient)"
                  fill="url(#progressGradient)"
                  strokeWidth={3}
                  dot={{ 
                    r: 6, 
                    fill: "#fff", 
                    stroke: "#f472b6", 
                    strokeWidth: 3,
                    filter: "url(#glow)"
                  }}
                  activeDot={{ 
                    r: 8, 
                    fill: "#f472b6", 
                    stroke: "#fff", 
                    strokeWidth: 2,
                    filter: "url(#glow)"
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse"></div>
            <span className="text-white/80 text-sm font-medium">Progress Trend</span>
          </div>
          
          <div className="flex gap-4">
            {data.slice(0, 3).map((item) => (
              <div key={item.name} className="text-center">
                <div className="text-white font-bold text-sm">{item.uv}%</div>
                <div className="text-white/60 text-xs">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default ProgressBarChart;
