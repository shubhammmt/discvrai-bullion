import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ANALYST_RATINGS } from '@/data/stockMockData';
import { Users, Target, TrendingUp, Crown } from 'lucide-react';
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
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Forecasts</h2>

      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Number of Analysts */}
        <Card className="p-6 text-center">
          <Users className="h-8 w-8 mx-auto mb-3 text-blue-600" />
          <div className="text-3xl font-bold text-blue-600 mb-1">{totalAnalysts}</div>
          <div className="text-sm text-muted-foreground">No. of Analysts</div>
        </Card>

        {/* Price Target */}
        <Card className="p-6 text-center">
          <Target className="h-8 w-8 mx-auto mb-3 text-green-600" />
          <div className="text-3xl font-bold text-green-600 mb-1">
            {averageTarget.toFixed(2)}
          </div>
          <div className="text-sm text-muted-foreground">1Y Price Target</div>
          <TrendIndicator 
            value={upside} 
            showIcon={true}
            className="justify-center mt-2 text-sm"
          />
          <div className="text-xs text-muted-foreground mt-1">
            {upside > 0 ? 'Upside' : 'Downside'}: {Math.abs(upside).toFixed(1)}%
          </div>
        </Card>

        {/* Recommendation */}
        <Card className="p-6 text-center">
          <TrendingUp className="h-8 w-8 mx-auto mb-3 text-purple-600" />
          <div className="text-xl font-bold text-purple-600 mb-1">Strong Buy</div>
          <div className="text-sm text-muted-foreground">Consensus Rating</div>
          <Badge variant="outline" className="mt-2 text-green-600 border-green-300">
            {(ratingCounts['Strong Buy'] || 0) + (ratingCounts['Buy'] || 0)} of {totalAnalysts} positive
          </Badge>
        </Card>
      </div>

      {/* Earnings Forecasts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Q2 EPS Estimate</h3>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Crown className="h-4 w-4 text-yellow-600" />
            <Badge variant="outline" className="text-blue-600 border-blue-300">Upgrade</Badge>
          </div>
          <div className="text-2xl font-bold mb-2">₹12.50</div>
          <div className="text-sm text-muted-foreground">
            Expected EPS for Q2 FY25
          </div>
          <div className="text-xs text-green-600 mt-2">
            +15.2% vs previous quarter
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold">Q2 Revenue Estimate</h3>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Crown className="h-4 w-4 text-yellow-600" />
            <Badge variant="outline" className="text-green-600 border-green-300">Upgrade</Badge>
          </div>
          <div className="text-2xl font-bold mb-2">₹3,200 Cr</div>
          <div className="text-sm text-muted-foreground">
            Expected Revenue for Q2 FY25
          </div>
          <div className="text-xs text-green-600 mt-2">
            +21.8% vs previous quarter
          </div>
        </Card>
      </div>

      {/* Analyst Ratings Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Recent Analyst Ratings</h3>
          <Button variant="outline" size="sm">
            View All Ratings
          </Button>
        </div>

        <div className="space-y-4">
          {ANALYST_RATINGS.map((rating, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="font-medium">{rating.firm}</div>
                <Badge className={getRatingColor(rating.rating)}>
                  {rating.rating}
                </Badge>
              </div>
              <div className="text-right space-y-1">
                <div className="font-bold">₹{rating.targetPrice.toLocaleString('en-IN')}</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(rating.date).toLocaleDateString('en-IN')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Premium CTA */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Unlock Premium Features</h3>
            <p className="text-sm text-muted-foreground">
              Price, EPS and Revenue Projections
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