
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
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
    <div className="bg-white/70 backdrop-blur-md rounded-lg shadow-md border border-white/20 p-3 sm:p-4 mb-4 sm:mb-6" style={{ height: '12vh', minHeight: '100px', maxHeight: '140px' }}>
      <div className="flex items-start justify-between h-full">
        {/* Left Section: Symbol, Company, and Key Metrics */}
        <div className="flex flex-col justify-between h-full flex-1 min-w-0">
          {/* Symbol and Exchange */}
          <div className="flex flex-col mb-2">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">{symbol}</h1>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">NASDAQ</span>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm truncate">{companyName}</p>
          </div>
          
          {/* Key Metrics - placed below company name */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 text-xs">
            <div className="text-center">
              <span className="text-gray-500 block">MCap</span>
              <span className="font-medium">$2.89T</span>
            </div>
            <div className="text-center">
              <span className="text-gray-500 block">P/E</span>
              <span className="font-medium">28.4</span>
            </div>
            <div className="text-center">
              <span className="text-gray-500 block">EPS</span>
              <span className="font-medium">$6.16</span>
            </div>
            <div className="text-center">
              <span className="text-gray-500 block">52W</span>
              <span className="font-medium">$124-$199</span>
            </div>
          </div>
        </div>
        
        {/* Middle Section: Mini Chart */}
        <div className="flex-1 flex justify-center items-center px-2 sm:px-4 max-w-[200px] sm:max-w-[300px]">
          <div className="w-full h-12 sm:h-16">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockMiniChartData}>
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke={isPositive ? '#059669' : '#DC2626'}
                  strokeWidth={1.5}
                  dot={false}
                  activeDot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Right Section: Price and Change */}
        <div className="text-right flex flex-col justify-center h-full">
          <div className="text-lg sm:text-xl font-bold text-gray-900">${price.toFixed(2)}</div>
          <div className={`flex items-center justify-end gap-1 text-xs sm:text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
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
