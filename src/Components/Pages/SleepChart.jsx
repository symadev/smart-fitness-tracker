import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

const SleepChart = () => {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data generator
  const generateMockData = () => {
    const mockData = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const duration = Math.random() * 3 + 6; // 6-9 hours
      const quality = Math.random() * 3 + 7; // 7-10 quality
      
      mockData.push({
        name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        duration: parseFloat(duration.toFixed(1)),
        quality: parseFloat(quality.toFixed(1)),
        dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'short' })
      });
    }
    return mockData;
  };

  useEffect(() => {
    const fetchSleepLogs = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      try {
        const mockLogs = generateMockData();
        setData(mockLogs);
      } catch (err) {
        console.error("Failed to fetch sleep logs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSleepLogs();
  }, []);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 text-white p-3 rounded-lg shadow-lg border border-gray-600">
          <p className="font-medium">{`${data.dayOfWeek}, ${label}`}</p>
          <p className="text-blue-300 text-sm">{`Sleep: ${data.duration}h`}</p>
          <p className="text-green-300 text-sm">{`Quality: ${data.quality}/10`}</p>
        </div>
      );
    }
    return null;
  };

  // Get bar color based on duration
  const getBarColor = (duration, index) => {
    if (activeIndex !== null && activeIndex !== index) {
      return 'rgba(59, 130, 246, 0.3)';
    }
    return duration < 7 ? '#f59e0b' : duration < 8 ? '#10b981' : '#3b82f6';
  };

  // Calculate stats
  const avgDuration = data.length > 0 
    ? (data.reduce((sum, item) => sum + item.duration, 0) / data.length).toFixed(1)
    : 0;

  const totalSleep = data.reduce((sum, item) => sum + item.duration, 0).toFixed(1);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-4 h-80 flex flex-col">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-48 bg-gray-200 rounded mb-4"></div>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-amber-100 via-amber-300 to-amber-600 rounded-xl p-4 h-80 flex flex-col shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-700">Sleep Duration This Week</h3>
          <p className="text-sm text-gray-700">Hours of sleep tracking</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{avgDuration}</div>
          <div className="text-xs text-gray-700">Avg Hours</div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
            onMouseEnter={(data, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#64748b' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#64748b' }}
              domain={[0, 10]}
              width={25}
            />
            <Tooltip content={<CustomTooltip />} />
            
            <Bar 
              dataKey="duration" 
              radius={[3, 3, 0, 0]}
              maxBarSize={40}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getBarColor(entry.duration, index)}
                  className="transition-all duration-200 hover:opacity-80"
                />
              ))}
            </Bar>
            
            <Line 
              type="monotone" 
              dataKey="quality" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ 
                fill: '#10b981', 
                strokeWidth: 1, 
                r: 3
              }}
              activeDot={{ 
                r: 5, 
                fill: '#10b981',
                stroke: '#ffffff',
                strokeWidth: 2
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Stats */}
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-xs text-white">Duration (hrs)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-xs text-white">Quality</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-700">{totalSleep}h</div>
          <div className="text-xs text-white">Total</div>
        </div>
      </div>
    </div>
  );
};

export default SleepChart;