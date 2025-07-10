
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Zap } from 'lucide-react';

interface PriceQuickStatsProps {
  stockData: any;
  aiAnalysis: any;
}

const PriceQuickStats = ({ stockData, aiAnalysis }: PriceQuickStatsProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <img src={stockData.logo} alt={stockData.companyName} className="w-12 h-12 rounded-lg" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{stockData.companyName}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{stockData.sector}</span>
                <span>•</span>
                <span>{stockData.exchange}</span>
                <span>•</span>
                <span>ISIN: {stockData.isin}</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">₹{stockData.currentPrice.toLocaleString()}</div>
            <div className={`flex items-center gap-1 ${stockData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stockData.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="font-medium">
                ₹{Math.abs(stockData.change)} ({stockData.changePercent >= 0 ? '+' : ''}{stockData.changePercent}%)
              </span>
            </div>
          </div>
        </div>

        {/* AI Price Movement Explanation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <div className="flex items-start gap-2">
            <Zap size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-800 mb-1">AI Analysis:</p>
              <p className="text-sm text-blue-700">{aiAnalysis.priceMovementExplanation}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-gray-900">{stockData.volume.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Volume</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-gray-900">{stockData.marketCap}</div>
            <div className="text-xs text-gray-600">Market Cap</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-gray-900">₹{stockData.weekHigh52}</div>
            <div className="text-xs text-gray-600">52W High</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-gray-900">₹{stockData.weekLow52}</div>
            <div className="text-xs text-gray-600">52W Low</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceQuickStats;
