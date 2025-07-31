import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, IndianRupee, Activity, Target } from 'lucide-react';
import TrendIndicator from '@/components/stock/shared/TrendIndicator';

interface PortfolioSummaryProps {
  summary: {
    totalValue: number;
    totalInvestment: number;
    totalGains: number;
    totalGainsPercentage: number;
    xirr: number;
    currentNAV: number;
    riskRating: string;
    riskScore: number;
  };
  formatCurrency: (amount: number) => string;
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ summary, formatCurrency }) => {
  const absoluteReturn = summary.totalGains;
  const returnPercentage = summary.totalGainsPercentage;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {/* Total Portfolio Value */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">Total Portfolio Value</p>
            <IndianRupee className="w-4 h-4 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{formatCurrency(summary.totalValue)}</p>
            <p className="text-xs text-muted-foreground">
              Invested: {formatCurrency(summary.totalInvestment)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Return % & XIRR Combined */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">Portfolio Returns</p>
            <Activity className="w-4 h-4 text-blue-600" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Return %</span>
              <span className="text-xl font-bold text-foreground">{returnPercentage.toFixed(2)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">XIRR</span>
              <span className="text-xl font-bold text-foreground">{summary.xirr}%</span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Current NAV</span>
              <span>{summary.currentNAV.toFixed(3)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Profile */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">Risk Profile</p>
            <Target className="w-4 h-4 text-purple-600" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{summary.riskScore}/100</p>
            <Badge variant="outline" className="text-xs">
              {summary.riskRating} Risk
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioSummary;