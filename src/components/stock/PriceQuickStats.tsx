
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Zap, Volume2 } from 'lucide-react';

interface PriceQuickStatsProps {
  stockData: any;
  aiAnalysis: any;
}

const PriceQuickStats = ({ stockData, aiAnalysis }: PriceQuickStatsProps) => {
  return (
    <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img 
                src={stockData.logo} 
                alt={stockData.companyName} 
                className="w-16 h-16 rounded-2xl shadow-lg ring-2 ring-gray-100" 
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-1">{stockData.companyName}</h2>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {stockData.sector}
                </Badge>
                <span>{stockData.exchange}</span>
                <span className="text-gray-300">•</span>
                <span className="font-mono">ISIN: {stockData.isin}</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-4xl font-bold text-gray-900 mb-2">₹{stockData.currentPrice.toLocaleString()}</div>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
              stockData.change >= 0 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {stockData.change >= 0 ? (
                <TrendingUp size={16} className="text-green-600" />
              ) : (
                <TrendingDown size={16} className="text-red-600" />
              )}
              <span>
                ₹{Math.abs(stockData.change)} ({stockData.changePercent >= 0 ? '+' : ''}{stockData.changePercent}%)
              </span>
            </div>
          </div>
        </div>

        {/* AI Price Movement Explanation */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Zap size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-800 mb-1">AI Market Analysis</p>
              <p className="text-sm text-blue-700 leading-relaxed">{aiAnalysis.priceMovementExplanation}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="group p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-2 mb-2">
              <Volume2 size={16} className="text-gray-600" />
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Volume</span>
            </div>
            <div className="text-xl font-bold text-gray-900">{stockData.volume.toLocaleString()}</div>
          </div>
          
          <div className="group p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-emerald-600" />
              <span className="text-xs font-medium text-emerald-600 uppercase tracking-wide">Market Cap</span>
            </div>
            <div className="text-xl font-bold text-gray-900">{stockData.marketCap}</div>
          </div>
          
          <div className="group p-4 bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl border border-violet-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-violet-600" />
              <span className="text-xs font-medium text-violet-600 uppercase tracking-wide">52W High</span>
            </div>
            <div className="text-xl font-bold text-gray-900">₹{stockData.weekHigh52}</div>
          </div>
          
          <div className="group p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown size={16} className="text-orange-600" />
              <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">52W Low</span>
            </div>
            <div className="text-xl font-bold text-gray-900">₹{stockData.weekLow52}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceQuickStats;
