
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Activity, Sparkles } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis } from 'recharts';

interface InteractivePriceChartProps {
  stockData: any;
  aiAnalysis: any;
}

const InteractivePriceChart = ({ stockData, aiAnalysis }: InteractivePriceChartProps) => {
  const [chartTimeframe, setChartTimeframe] = useState('1D');

  // Mock chart data - in real implementation, this would come from APIs
  const chartData = [
    { time: '09:15', price: stockData.currentPrice * 0.98 },
    { time: '10:00', price: stockData.currentPrice * 0.985 },
    { time: '11:00', price: stockData.currentPrice * 0.99 },
    { time: '12:00', price: stockData.currentPrice * 0.995 },
    { time: '13:00', price: stockData.currentPrice * 0.998 },
    { time: '14:00', price: stockData.currentPrice * 1.005 },
    { time: '15:30', price: stockData.currentPrice }
  ];

  return (
    <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Interactive Price Chart</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
                  <Sparkles size={12} className="mr-1" />
                  AI Enhanced
                </Badge>
                <span className="text-sm text-gray-500">Real-time analysis</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
            {['1D', '5D', '1M', '6M', '1Y', 'Max'].map((period) => (
              <Button
                key={period}
                variant={chartTimeframe === period ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartTimeframe(period)}
                className={`px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  chartTimeframe === period 
                    ? 'bg-white shadow-sm text-gray-900' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                {period}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="h-72 mb-6">
          <ChartContainer
            config={{
              price: {
                label: "Price",
                color: "hsl(var(--chart-1))",
              },
            }}
          >
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <YAxis 
                domain={['dataMin - 5', 'dataMax + 5']} 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="hsl(var(--chart-1))" 
                fill="url(#priceGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </div>
        
        {/* AI Chart Annotations */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Activity size={18} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-purple-800 mb-1">Technical AI Insights</p>
              <p className="text-sm text-purple-700 leading-relaxed">
                {aiAnalysis.technicalInsights}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractivePriceChart;
