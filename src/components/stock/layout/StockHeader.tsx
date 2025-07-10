import React from 'react';
import { Heart, Share2, Bell, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { StockData } from '@/data/stockMockData';
import TrendIndicator from '@/components/stock/shared/TrendIndicator';

interface StockHeaderProps {
  stockData: StockData;
}

const StockHeader: React.FC<StockHeaderProps> = ({ stockData }) => {
  const isPositive = stockData.change > 0;

  return (
    <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 lg:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Company Info & Price */}
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-6">
            
            {/* Company Logo & Name */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                L
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground lg:text-2xl">
                  {stockData.companyName}
                </h1>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{stockData.symbol}</span>
                  <Badge variant="outline" className="text-xs">NSE</Badge>
                </div>
              </div>
            </div>

            {/* Price Information */}
            <div className="flex flex-col lg:ml-6">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground lg:text-3xl">
                  ₹{stockData.currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
                <TrendIndicator 
                  value={stockData.change} 
                  showIcon={true}
                  className="text-sm lg:text-base"
                />
                <span className={`text-sm lg:text-base font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  ({isPositive ? '+' : ''}{stockData.changePercent}%)
                </span>
              </div>
              
              {/* Quick Stats */}
              <div className="mt-1 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span>Market Cap: {stockData.marketCap}</span>
                <span>P/E: {stockData.peRatio}</span>
                <span>Volume: {stockData.volume}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Watchlist</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Alerts</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button variant="default" size="sm" className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">AI Mode</span>
            </Button>
          </div>
        </div>

        {/* AI Insight Banner */}
        <Card className="mt-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800">
          <div className="p-3 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <p className="text-sm font-medium text-foreground">
              <span className="text-purple-600 dark:text-purple-400">AI Insight:</span>{' '}
              Turned ₹1L into ₹6.10L in last 5 Years - Strong fundamentals with consistent growth trajectory
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StockHeader;