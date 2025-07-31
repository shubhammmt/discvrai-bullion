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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

      {/* Absolute Return */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">Absolute Return</p>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{formatCurrency(absoluteReturn)}</p>
            <TrendIndicator 
              value={returnPercentage} 
              showIcon={true}
              showValue={true}
              size="sm"
              className="text-xs"
            />
          </div>
        </CardContent>
      </Card>

      {/* Return % */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">Return %</p>
            <Activity className="w-4 h-4 text-blue-600" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{returnPercentage.toFixed(2)}%</p>
            <p className="text-xs text-muted-foreground">
              Current NAV: {summary.currentNAV.toFixed(3)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* XIRR */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">XIRR (Annualized)</p>
            <Target className="w-4 h-4 text-purple-600" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{summary.xirr}%</p>
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