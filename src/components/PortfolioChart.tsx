
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
  { name: 'Equity', value: 60, color: '#f97316' },
  { name: 'Debt', value: 25, color: '#3b82f6' },
  { name: 'Gold', value: 10, color: '#eab308' },
  { name: 'Cash', value: 5, color: '#10b981' },
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
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg">{content.performance}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={portfolioData}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  formatter={(value) => [`₹${(value as number).toLocaleString('en-IN')}`, content.performance]}
                  labelStyle={{ color: '#374151' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#f97316" 
                  strokeWidth={3}
                  dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Asset Allocation Chart */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg">{content.allocation}</CardTitle>
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
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 ml-4">
              {allocationData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">
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
