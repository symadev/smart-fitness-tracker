import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import axios from "axios";
import dayjs from "dayjs";

// Utility to filter logs by date range
const countLogsInDays = (logs, days) => {
  const cutoff = dayjs().subtract(days, "day");
  return logs.filter(log => dayjs(log.date).isAfter(cutoff)).length;
};

const ProgressBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const token = localStorage.getItem("access-token");
      const email = localStorage.getItem("user-email");

      try {
        const res = await axios.get(`http://localhost:5000/workouts/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const workouts = res.data;

        const total = workouts.length || 1; // avoid division by 0
        const oneDay = countLogsInDays(workouts, 1);
        const oneWeek = countLogsInDays(workouts, 7);
        const oneMonth = countLogsInDays(workouts, 30);
        const threeMonths = countLogsInDays(workouts, 90);
        const sixMonths = countLogsInDays(workouts, 180);

        const progressData = [
          { name: "1D", progress: ((oneDay / total) * 100).toFixed(1) },
          { name: "1W", progress: ((oneWeek / total) * 100).toFixed(1) },
          { name: "1M", progress: ((oneMonth / total) * 100).toFixed(1) },
          { name: "3M", progress: ((threeMonths / total) * 100).toFixed(1) },
          { name: "6M", progress: ((sixMonths / total) * 100).toFixed(1) },
        ];

        setData(progressData);
      } catch (error) {
        console.error("Failed to fetch progress data", error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-700 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Progress Chart</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2a6a" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" domain={[0, 100]} />
          <Tooltip contentStyle={{ backgroundColor: "#1f2a6a", border: "none", color: "#fff" }} />
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
