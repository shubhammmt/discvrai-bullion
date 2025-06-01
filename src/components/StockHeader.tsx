
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
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{symbol}</h1>
          <p className="text-lg text-gray-600">{companyName}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900">${price.toFixed(2)}</div>
          <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span className="font-semibold">
              {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex gap-3 flex-wrap">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
          <Plus size={16} className="mr-2" />
          Buy Now
        </Button>
        <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
          <Bell size={16} className="mr-2" />
          Add Alert
        </Button>
        <Button variant="outline" className="border-purple-500 text-purple-600 hover:bg-purple-50">
          <Eye size={16} className="mr-2" />
          Watchlist
        </Button>
        <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
          <TrendingUp size={16} className="mr-2" />
          Portfolio
        </Button>
      </div>
    </div>
  );
};

export default StockHeader;
