
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Activity } from 'lucide-react';
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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Price Chart
            <Badge variant="secondary">AI Enhanced</Badge>
          </CardTitle>
          <div className="flex gap-1">
            {['1D', '5D', '1M', '6M', '1Y', 'Max'].map((period) => (
              <Button
                key={period}
                variant={chartTimeframe === period ? "default" : "outline"}
                size="sm"
                onClick={() => setChartTimeframe(period)}
              >
                {period}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ChartContainer
            config={{
              price: {
                label: "Price",
                color: "hsl(var(--chart-1))",
              },
            }}
          >
            <AreaChart data={chartData}>
              <XAxis dataKey="time" />
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="hsl(var(--chart-1))" 
                fill="hsl(var(--chart-1))" 
                fillOpacity={0.2} 
              />
            </AreaChart>
          </ChartContainer>
        </div>
        
        {/* AI Chart Annotations */}
        <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Activity size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-purple-800 mb-1">Technical AI Insights:</p>
              <p className="text-sm text-purple-700">
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
