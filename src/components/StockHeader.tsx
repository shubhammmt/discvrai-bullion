
import React from 'react';
import { ArrowUp, ArrowDown, TrendingUp, Building2 } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface StockHeaderProps {
  symbol: string;
  companyName: string;
  price: number;
  change: number;
  changePercent: number;
}

const mockMiniChartData = [
  { price: 158.25 },
  { price: 160.10 },
  { price: 159.80 },
  { price: 161.45 },
  { price: 163.20 },
  { price: 162.90 },
  { price: 162.80 },
];

const StockHeader = ({ symbol, companyName, price, change, changePercent }: StockHeaderProps) => {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-lg shadow-md border border-white/20 p-3 sm:p-6 mb-4 sm:mb-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        {/* Left Section - Company Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900 truncate">{symbol}</h1>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 cursor-help flex-shrink-0" />
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-semibold">{companyName}</h4>
                  <p className="text-sm text-muted-foreground">
                    Technology company focused on consumer electronics, software, and services.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 truncate">{companyName}</p>
          
          {/* Key metrics row */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm">
            <div className="flex items-center gap-1">
              <span className="text-gray-500">MCap:</span>
              <span className="font-medium">$2.89T</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-500">P/E:</span>
              <span className="font-medium">28.4</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-500">EPS:</span>
              <span className="font-medium">$6.16</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-500">52W:</span>
              <span className="font-medium">$124-$199</span>
            </div>
          </div>
        </div>
        
        {/* Middle Section - Mini Chart */}
        <div className="hidden lg:block w-32 h-12 mx-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockMiniChartData}>
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke={isPositive ? '#059669' : '#DC2626'}
                strokeWidth={2}
                dot={false}
                activeDot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Right Section - Price Info */}
        <div className="text-left sm:text-right">
          <div className="text-xl sm:text-3xl font-bold text-gray-900">${price.toFixed(2)}</div>
          <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span className="font-semibold">
              {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1">Today's Change</div>
        </div>
      </div>
    </div>
  );
};

export default StockHeader;
