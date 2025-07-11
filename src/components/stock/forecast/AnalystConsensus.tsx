
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ANALYST_RATINGS } from '@/data/stockMockData';
import { Users, Target, TrendingUp, Crown, Calendar, DollarSign } from 'lucide-react';
import TrendIndicator from '../shared/TrendIndicator';

const AnalystConsensus: React.FC = () => {
  // Calculate consensus data
  const totalAnalysts = ANALYST_RATINGS.length;
  const averageTarget = ANALYST_RATINGS.reduce((sum, rating) => sum + rating.targetPrice, 0) / totalAnalysts;
  const currentPrice = 1412.60;
  const upside = ((averageTarget - currentPrice) / currentPrice) * 100;
  
  // Count ratings distribution
  const ratingCounts = ANALYST_RATINGS.reduce((acc, rating) => {
    acc[rating.rating] = (acc[rating.rating] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'Strong Buy':
        return 'bg-green-600 text-white';
      case 'Buy':
        return 'bg-green-500 text-white';
      case 'Hold':
        return 'bg-yellow-500 text-white';
      case 'Sell':
        return 'bg-red-500 text-white';
      case 'Strong Sell':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Analyst Forecasts</h2>

      {/* Top Row - Key Metrics in Compact Cards */}
      <div className="grid gap-3 md:grid-cols-4">
        {/* Number of Analysts */}
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-blue-600 flex-shrink-0" />
            <div>
              <div className="text-2xl font-bold text-blue-600">{totalAnalysts}</div>
              <div className="text-xs text-muted-foreground">Analysts</div>
            </div>
          </div>
        </Card>

        {/* Price Target */}
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Target className="h-6 w-6 text-green-600 flex-shrink-0" />
            <div>
              <div className="text-2xl font-bold text-green-600">
                ₹{averageTarget.toFixed(0)}
              </div>
              <div className="text-xs text-muted-foreground">Avg Target</div>
              <TrendIndicator 
                value={upside} 
                showIcon={false}
                className="text-xs"
              />
            </div>
          </div>
        </Card>

        {/* Consensus Rating */}
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-purple-600 flex-shrink-0" />
            <div>
              <div className="text-lg font-bold text-purple-600">Strong Buy</div>
              <div className="text-xs text-muted-foreground">Consensus</div>
              <div className="text-xs text-green-600">
                {(ratingCounts['Strong Buy'] || 0) + (ratingCounts['Buy'] || 0)}/{totalAnalysts} positive
              </div>
            </div>
          </div>
        </Card>

        {/* Rating Distribution */}
        <Card className="p-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">Rating Breakdown</div>
            <div className="flex gap-2 text-xs">
              <div className="text-center">
                <div className="font-bold text-green-600">{ratingCounts['Strong Buy'] || 0}</div>
                <div className="text-muted-foreground">Buy</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-yellow-600">{ratingCounts['Hold'] || 0}</div>
                <div className="text-muted-foreground">Hold</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-red-600">{ratingCounts['Sell'] || 0}</div>
                <div className="text-muted-foreground">Sell</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Middle Row - Earnings and Revenue Forecasts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <h3 className="font-semibold">Q2 FY25 Estimates</h3>
            </div>
            <Badge variant="outline" className="text-blue-600 border-blue-300">
              <Crown className="h-3 w-3 mr-1" />
              Upgraded
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-lg font-bold">₹12.50</div>
              <div className="text-xs text-muted-foreground">Expected EPS</div>
              <div className="text-xs text-green-600">+15.2% QoQ</div>
            </div>
            <div>
              <div className="text-lg font-bold">₹3,200 Cr</div>
              <div className="text-xs text-muted-foreground">Expected Revenue</div>
              <div className="text-xs text-green-600">+21.8% QoQ</div>
            </div>
          </div>
        </Card>

        {/* Recent Analyst Ratings - Compact Table */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Recent Updates</h3>
            <Button variant="outline" size="sm" className="text-xs h-7">
              View All
            </Button>
          </div>
          <div className="space-y-2">
            {ANALYST_RATINGS.slice(0, 3).map((rating, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium">{rating.firm}</div>
                  <Badge className={`${getRatingColor(rating.rating)} text-xs px-2 py-0`}>
                    {rating.rating}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">₹{rating.targetPrice.toLocaleString('en-IN')}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(rating.date).toLocaleDateString('en-IN', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Row - All Analyst Ratings in Compact Format */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">All Analyst Ratings</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>Target Range: ₹{Math.min(...ANALYST_RATINGS.map(r => r.targetPrice))} - ₹{Math.max(...ANALYST_RATINGS.map(r => r.targetPrice))}</span>
          </div>
        </div>

        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {ANALYST_RATINGS.map((rating, index) => (
            <div key={index} className="flex items-center justify-between p-2 border border-border rounded hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium">{rating.firm}</div>
                <Badge className={`${getRatingColor(rating.rating)} text-xs px-1.5 py-0`}>
                  {rating.rating === 'Strong Buy' ? 'S.Buy' : 
                   rating.rating === 'Strong Sell' ? 'S.Sell' : rating.rating}
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">₹{rating.targetPrice.toLocaleString('en-IN')}</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(rating.date).toLocaleDateString('en-IN', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Premium CTA - More Compact */}
      <Card className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold mb-1">Unlock Detailed Projections</h3>
            <p className="text-sm text-muted-foreground">
              Get detailed price, EPS and revenue projections with premium access
            </p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <Crown className="h-4 w-4 mr-2" />
            Upgrade
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AnalystConsensus;
