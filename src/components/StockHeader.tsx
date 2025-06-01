
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
    <div className="bg-white/70 backdrop-blur-md rounded-lg shadow-md border border-white/20 p-6 mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{symbol}</h1>
          <p className="text-gray-600 mt-1">{companyName}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900">${price.toFixed(2)}</div>
          <div className={`flex items-center justify-end gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span className="font-semibold">
              {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockHeader;
