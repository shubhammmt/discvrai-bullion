
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Snowflake, Activity } from 'lucide-react';

const heatmapData = [
  { symbol: 'AAPL', company: 'Apple Inc.', change: 2.4, volume: 'High', sector: 'Technology' },
  { symbol: 'MSFT', company: 'Microsoft', change: 1.8, volume: 'High', sector: 'Technology' },
  { symbol: 'GOOGL', company: 'Alphabet', change: -0.8, volume: 'Medium', sector: 'Technology' },
  { symbol: 'AMZN', company: 'Amazon', change: 3.2, volume: 'High', sector: 'Consumer' },
  { symbol: 'TSLA', company: 'Tesla', change: -2.1, volume: 'Very High', sector: 'Automotive' },
  { symbol: 'NVDA', company: 'NVIDIA', change: 4.7, volume: 'Very High', sector: 'Technology' },
  { symbol: 'META', company: 'Meta Platforms', change: 1.2, volume: 'High', sector: 'Technology' },
  { symbol: 'JPM', company: 'JPMorgan Chase', change: 0.6, volume: 'Medium', sector: 'Financials' },
  { symbol: 'JNJ', company: 'Johnson & Johnson', change: -0.3, volume: 'Low', sector: 'Healthcare' },
  { symbol: 'V', company: 'Visa Inc.', change: 1.9, volume: 'Medium', sector: 'Financials' },
  { symbol: 'PG', company: 'Procter & Gamble', change: 0.2, volume: 'Low', sector: 'Consumer' },
  { symbol: 'HD', company: 'Home Depot', change: -1.4, volume: 'Medium', sector: 'Retail' },
];

const getChangeColor = (change: number) => {
  if (change > 3) return 'bg-emerald-600 text-white';
  if (change > 1.5) return 'bg-emerald-500 text-white';
  if (change > 0.5) return 'bg-emerald-400 text-white';
  if (change > -0.5) return 'bg-gray-300 text-gray-800';
  if (change > -1.5) return 'bg-red-400 text-white';
  if (change > -3) return 'bg-red-500 text-white';
  return 'bg-red-600 text-white';
};

const getVolumeIcon = (volume: string) => {
  switch (volume) {
    case 'Very High': return <Flame className="w-3 h-3 text-red-500" />;
    case 'High': return <Activity className="w-3 h-3 text-orange-500" />;
    case 'Medium': return <Activity className="w-3 h-3 text-yellow-500" />;
    default: return <Snowflake className="w-3 h-3 text-blue-500" />;
  }
};

const USMarketHeatmap = () => {
  return (
    <Card className="bg-gradient-to-br from-white via-gray-50 to-slate-100 border-2 border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-gray-700" />
          Market Heatmap - S&P 500 Movers
        </CardTitle>
        <p className="text-sm text-gray-600">Real-time performance and volume indicators</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {heatmapData.map((stock, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer ${getChangeColor(stock.change)}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm">{stock.symbol}</span>
                {getVolumeIcon(stock.volume)}
              </div>
              <div className="text-xs opacity-90 mb-1 truncate">{stock.company}</div>
              <div className="text-lg font-bold">
                {stock.change > 0 ? '+' : ''}{stock.change.toFixed(1)}%
              </div>
              <div className="text-xs opacity-80">{stock.sector}</div>
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700">Volume:</span>
            <div className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-red-500" />
              <span>Very High</span>
            </div>
            <div className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-orange-500" />
              <span>High</span>
            </div>
            <div className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-yellow-500" />
              <span>Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <Snowflake className="w-3 h-3 text-blue-500" />
              <span>Low</span>
            </div>
          </div>
        </div>
        
        <div className="mt-2 flex items-center gap-4 text-xs">
          <span className="font-medium text-gray-700">Performance:</span>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-emerald-600 rounded"></div>
            <span>+3%+</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-emerald-400 rounded"></div>
            <span>+0.5% to +3%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <span>-0.5% to +0.5%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-400 rounded"></div>
            <span>-0.5% to -3%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 rounded"></div>
            <span>-3%-</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default USMarketHeatmap;
