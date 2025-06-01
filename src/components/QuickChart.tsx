
import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const mockChartData = [
  { time: '9:30', price: 150.25 },
  { time: '10:00', price: 152.10 },
  { time: '10:30', price: 151.80 },
  { time: '11:00', price: 153.45 },
  { time: '11:30', price: 155.20 },
  { time: '12:00', price: 154.90 },
  { time: '12:30', price: 156.75 },
  { time: '1:00', price: 158.30 },
  { time: '1:30', price: 157.85 },
  { time: '2:00', price: 159.40 },
  { time: '2:30', price: 161.20 },
  { time: '3:00', price: 160.95 },
  { time: '3:30', price: 162.80 },
];

const QuickChart = () => {
  const isPositive = mockChartData[mockChartData.length - 1].price > mockChartData[0].price;
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Today's Performance</h2>
        <div className="flex gap-3 text-sm">
          <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">1D</button>
          <button className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-full">1W</button>
          <button className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-full">1M</button>
          <button className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-full">1Y</button>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockChartData}>
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <YAxis 
              domain={['dataMin - 1', 'dataMax + 1']}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <Tooltip 
              contentStyle={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke={isPositive ? '#059669' : '#DC2626'}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: isPositive ? '#059669' : '#DC2626' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default QuickChart;
