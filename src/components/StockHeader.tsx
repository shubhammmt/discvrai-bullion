
import React from 'react';
import { ArrowUp, ArrowDown, TrendingUp, Building2 } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface StockHeaderProps {
  symbol: string;
  companyName: string;
  price: number;
  change: number;
  changePercent: number;
}

const StockHeader = ({ symbol, companyName, price, change, changePercent }: StockHeaderProps) => {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-lg shadow-md border border-white/20 p-6 mb-6">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{symbol}</h1>
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
          <p className="text-gray-600 text-sm">{companyName}</p>
          
          {/* Key metrics row */}
          <div className="flex items-center gap-6 mt-3 text-sm">
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
        
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900">${price.toFixed(2)}</div>
          <div className={`flex items-center justify-end gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
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
