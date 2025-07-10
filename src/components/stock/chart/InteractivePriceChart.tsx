import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { CHART_DATA } from '@/data/chartMockData';
import { cn } from '@/lib/utils';
import TrendIndicator from '../shared/TrendIndicator';

interface InteractivePriceChartProps {
  symbol: string;
}

const timeframes = [
  { key: '1D', label: '1D' },
  { key: '1M', label: '1M' },
  { key: '3M', label: '3M' },
  { key: '1Y', label: '1Y' },
  { key: '3Y', label: '3Y' },
  { key: '5Y', label: '5Y' },
  { key: '10Y', label: '10Y' }
];

const InteractivePriceChart: React.FC<InteractivePriceChartProps> = ({ symbol }) => {
  const [activeTimeframe, setActiveTimeframe] = useState('3M');
  const [chartType, setChartType] = useState<'line' | 'area'>('area');

  const currentData = CHART_DATA[activeTimeframe];
  const chartData = currentData?.data?.map(point => ({
    date: point.date,
    price: point.price,
    formattedDate: new Date(point.date).toLocaleDateString('en-IN', { 
      month: 'short', 
      day: 'numeric' 
    })
  })) || [];

  const isPositiveReturn = currentData?.return?.startsWith('+');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-sm font-medium">
            ₹{payload[0].value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold">{symbol} Price Chart</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-muted-foreground">Period Return:</span>
            <TrendIndicator 
              value={parseFloat(currentData?.return?.replace(/[^-\d.]/g, '') || '0')} 
              showIcon={true}
              showValue={false}
              size="sm"
            />
            <span className={cn(
              "text-sm font-medium",
              isPositiveReturn ? "text-green-600" : "text-red-600"
            )}>
              {currentData?.return}
            </span>
          </div>
        </div>

        {/* Chart Type Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex bg-muted rounded-md p-1">
            <Button
              variant={chartType === 'line' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType('line')}
              className="h-8 px-3"
            >
              Line
            </Button>
            <Button
              variant={chartType === 'area' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType('area')}
              className="h-8 px-3"
            >
              Area
            </Button>
          </div>
        </div>
      </div>

      {/* Timeframe Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {timeframes.map((tf) => (
          <Button
            key={tf.key}
            variant={activeTimeframe === tf.key ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTimeframe(tf.key)}
            className="h-8 px-3"
          >
            <span className="font-medium">{tf.label}</span>
            {CHART_DATA[tf.key] && (
              <span className={cn(
                "ml-2 text-xs",
                CHART_DATA[tf.key].return.startsWith('+') ? "text-green-600" : "text-red-600"
              )}>
                {CHART_DATA[tf.key].return}
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="formattedDate" 
                className="text-xs"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fontSize: 12 }}
                domain={['dataMin - 50', 'dataMax + 50']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#priceGradient)"
              />
            </AreaChart>
          ) : (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="formattedDate" 
                className="text-xs"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fontSize: 12 }}
                domain={['dataMin - 50', 'dataMax + 50']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "#3b82f6" }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Chart Info */}
      <div className="mt-4 text-xs text-muted-foreground text-center">
        Historical data • Click and drag to zoom • Hover for details
      </div>
    </Card>
  );
};

export default InteractivePriceChart;