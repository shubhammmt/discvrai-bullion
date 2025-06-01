
import React from 'react';
import { ArrowUp, ArrowDown, Plus, Bell, Eye, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{symbol}</h1>
            <p className="text-sm text-gray-600">{companyName}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">${price.toFixed(2)}</div>
            <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
              <span className="font-semibold">
                {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus size={14} className="mr-1" />
            Buy
          </Button>
          <Button size="sm" variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
            <Bell size={14} className="mr-1" />
            Alert
          </Button>
          <Button size="sm" variant="outline" className="border-purple-500 text-purple-600 hover:bg-purple-50">
            <Eye size={14} className="mr-1" />
            Watch
          </Button>
          <Button size="sm" variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
            <TrendingUp size={14} className="mr-1" />
            Portfolio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StockHeader;
