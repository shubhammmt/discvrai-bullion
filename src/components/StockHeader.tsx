
import React from 'react';
import { ArrowUp, ArrowDown, Building2 } from 'lucide-react';
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
    <div className="bg-white/70 backdrop-blur-md rounded-lg shadow-md border border-white/20 p-4 sm:p-6 mb-4 sm:mb-6">
      {/* Company Info Row */}
      <div className="flex items-center gap-2 mb-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{symbol}</h1>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Building2 className="w-5 h-5 text-gray-500 cursor-help" />
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
      
      <p className="text-gray-600 text-sm mb-4">{companyName}</p>
      
      {/* Main Content - Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
        {/* Left: Key metrics */}
        <div className="order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-500 block">MCap:</span>
              <span className="font-medium">$2.89T</span>
            </div>
            <div>
              <span className="text-gray-500 block">P/E:</span>
              <span className="font-medium">28.4</span>
            </div>
            <div>
              <span className="text-gray-500 block">EPS:</span>
              <span className="font-medium">$6.16</span>
            </div>
            <div>
              <span className="text-gray-500 block">52W:</span>
              <span className="font-medium">$124-$199</span>
            </div>
          </div>
        </div>
        
        {/* Center: Mini Chart */}
        <div className="order-1 lg:order-2 flex justify-center">
          <div className="w-full max-w-[200px] h-16">
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
        </div>
        
        {/* Right: Price Info */}
        <div className="order-3 text-center lg:text-right">
          <div className="text-2xl sm:text-3xl font-bold text-gray-900">${price.toFixed(2)}</div>
          <div className={`flex items-center justify-center lg:justify-end gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
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
