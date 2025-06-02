import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Sample data - replace with your real workout progress
const data = [
  { name: "1D", progress: 30 },
  { name: "1W", progress: 60 },
  { name: "1M", progress: 80 },
  { name: "3M", progress: 50 },
  { name: "6M", progress: 90 },
];

const ProgressBarChart = () => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-700 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Progress Chart</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2a6a" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip contentStyle={{ backgroundColor: "#1f2a6a", border: "none" }} />
          <Bar dataKey="progress" fill="url(#colorUv)" radius={[10, 10, 0, 0]} />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9333ea" stopOpacity={1} />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity={1} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressBarChart;
