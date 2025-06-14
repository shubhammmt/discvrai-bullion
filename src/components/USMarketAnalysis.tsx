
import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart, Area, BarChart, Bar, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';

const portfolioPerformance = [
  { month: 'Jan', portfolio: 2100, sp500: 2080, nasdaq: 2050 },
  { month: 'Feb', portfolio: 2150, sp500: 2120, nasdaq: 2090 },
  { month: 'Mar', portfolio: 2080, sp500: 2090, nasdaq: 2020 },
  { month: 'Apr', portfolio: 2200, sp500: 2150, nasdaq: 2180 },
  { month: 'May', portfolio: 2280, sp500: 2200, nasdaq: 2250 },
  { month: 'Jun', portfolio: 2400, sp500: 2250, nasdaq: 2320 },
];

const sectorAllocation = [
  { sector: 'Technology', allocation: 32, performance: 28.5, color: '#3b82f6' },
  { sector: 'Healthcare', allocation: 18, performance: 15.2, color: '#10b981' },
  { sector: 'Financials', allocation: 15, performance: 12.8, color: '#8b5cf6' },
  { sector: 'Consumer', allocation: 12, performance: 8.4, color: '#f59e0b' },
  { sector: 'Energy', allocation: 8, performance: 22.1, color: '#ef4444' },
  { sector: 'Industrials', allocation: 15, performance: 11.3, color: '#06b6d4' },
];

const USMarketAnalysis = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-6 mb-8">
      {/* Portfolio Performance vs Benchmarks */}
      <Card className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border-2 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Portfolio vs Benchmarks
          </CardTitle>
          <p className="text-sm text-gray-600">Performance comparison (Normalized to 100)</p>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolioPerformance}>
                <defs>
                  <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="sp500Gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <YAxis 
                  domain={['dataMin - 50', 'dataMax + 50']}
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <Tooltip 
                  formatter={(value, name) => [`$${(value as number).toLocaleString('en-US')}K`, name]}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="portfolio" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fill="url(#portfolioGradient)"
                  name="Your Portfolio"
                />
                <Line 
                  type="monotone" 
                  dataKey="sp500" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="S&P 500"
                />
                <Line 
                  type="monotone" 
                  dataKey="nasdaq" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  dot={false}
                  name="NASDAQ"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          {/* Performance Summary */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-white/80 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">+14.3%</span>
              </div>
              <div className="text-xs text-gray-600">Your Portfolio</div>
            </div>
            <div className="text-center p-3 bg-white/80 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">+8.2%</span>
              </div>
              <div className="text-xs text-gray-600">S&P 500</div>
            </div>
            <div className="text-center p-3 bg-white/80 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-purple-600 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">+13.1%</span>
              </div>
              <div className="text-xs text-gray-600">NASDAQ</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sector Analysis */}
      <Card className="bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 border-2 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-gray-700" />
            Sector Allocation & Performance
          </CardTitle>
          <p className="text-sm text-gray-600">Portfolio breakdown with YTD returns</p>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorAllocation} layout="horizontal">
                <XAxis type="number" domain={[0, 35]} axisLine={false} tickLine={false} />
                <YAxis 
                  type="category" 
                  dataKey="sector" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  width={80}
                />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'allocation' ? `${value}%` : `+${value}%`,
                    name === 'allocation' ? 'Allocation' : 'YTD Return'
                  ]}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="allocation" 
                  fill="#e5e7eb"
                  radius={[0, 4, 4, 0]}
                  name="allocation"
                />
                <Bar 
                  dataKey="performance" 
                  radius={[0, 4, 4, 0]}
                  name="performance"
                >
                  {sectorAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Sector Legend */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {sectorAllocation.map((sector, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: sector.color }}
                />
                <span className="text-gray-700 font-medium">{sector.sector}</span>
                <span className="text-green-600 ml-auto">+{sector.performance}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default USMarketAnalysis;
