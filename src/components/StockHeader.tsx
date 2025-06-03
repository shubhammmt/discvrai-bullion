
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

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
    <div className="bg-white rounded-lg shadow-md border p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        {/* Left: Symbol and Company */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-gray-900">{symbol}</h1>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">NASDAQ</span>
          </div>
          <p className="text-gray-600 text-sm">{companyName}</p>
        </div>
        
        {/* Right: Price and Change */}
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">${price.toFixed(2)}</div>
          <div className={`flex items-center justify-end gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span className="font-semibold">
              {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>
      
      {/* Key Ratios */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-gray-100">
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Market Cap</div>
          <div className="font-semibold text-sm">$2.89T</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">P/E Ratio</div>
          <div className="font-semibold text-sm">28.4</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">EPS</div>
          <div className="font-semibold text-sm">$6.16</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">52W Range</div>
          <div className="font-semibold text-sm">$124-$199</div>
        </div>
      </div>
    </div>
  );
};

export default StockHeader;
