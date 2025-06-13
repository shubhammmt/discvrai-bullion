
import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const portfolioData = [
  { month: 'Jan', value: 650000 },
  { month: 'Feb', value: 720000 },
  { month: 'Mar', value: 680000 },
  { month: 'Apr', value: 750000 },
  { month: 'May', value: 820000 },
  { month: 'Jun', value: 845000 },
];

const allocationData = [
  { name: 'Equity', value: 60, color: '#ff6b6b' },
  { name: 'Debt', value: 25, color: '#4ecdc4' },
  { name: 'Gold', value: 10, color: '#ffe66d' },
  { name: 'Cash', value: 5, color: '#95e1d3' },
];

interface PortfolioChartProps {
  isEnglish: boolean;
}

const PortfolioChart = ({ isEnglish }: PortfolioChartProps) => {
  const labels = {
    hindi: {
      performance: "पैसे की बढ़त",
      allocation: "पैसे का बंटवारा",
      equity: "शेयर",
      debt: "बॉन्ड",
      gold: "सोना",
      cash: "नकद"
    },
    english: {
      performance: "Portfolio Growth",
      allocation: "Asset Allocation",
      equity: "Equity",
      debt: "Debt",
      gold: "Gold",
      cash: "Cash"
    }
  };

  const content = isEnglish ? labels.english : labels.hindi;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Portfolio Performance Chart */}
      <Card className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 border-2 border-orange-200">
        <CardHeader>
          <CardTitle className="text-lg text-orange-800">{content.performance}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={portfolioData}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#9a3412' }}
                />
                <YAxis hide />
                <Tooltip 
                  formatter={(value) => [`₹${(value as number).toLocaleString('en-IN')}`, content.performance]}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{ 
                    backgroundColor: '#fff7ed', 
                    border: '2px solid #fb923c',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#f97316" 
                  strokeWidth={4}
                  dot={{ fill: '#ea580c', strokeWidth: 3, r: 6 }}
                  activeDot={{ r: 8, fill: '#dc2626' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Asset Allocation Chart */}
      <Card className="bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 border-2 border-teal-200">
        <CardHeader>
          <CardTitle className="text-lg text-teal-800">{content.allocation}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-center">
            <div className="w-32 h-32 mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
                    strokeWidth={3}
                    stroke="#ffffff"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, '']}
                    contentStyle={{ 
                      backgroundColor: '#f0fdfa', 
                      border: '2px solid #14b8a6',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-3 ml-4">
              {allocationData.map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/80 px-3 py-2 rounded-lg border border-white/60">
                  <div 
                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {isEnglish ? item.name : content[item.name.toLowerCase() as keyof typeof content]} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioChart;
