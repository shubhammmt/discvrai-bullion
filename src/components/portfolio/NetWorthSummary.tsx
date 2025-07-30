import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Wallet, DollarSign } from 'lucide-react';
import { NetWorthData } from '@/hooks/useComprehensivePortfolio';

interface NetWorthSummaryProps {
  netWorth: NetWorthData;
  formatCurrency: (amount: number) => string;
  className?: string;
}

const NetWorthSummary: React.FC<NetWorthSummaryProps> = ({ 
  netWorth, 
  formatCurrency, 
  className = "" 
}) => {
  const getChangeColor = (value: number) => value >= 0 ? 'text-green-600' : 'text-red-600';
  const getChangeIcon = (value: number) => value >= 0 ? TrendingUp : TrendingDown;
  const ChangeIcon = getChangeIcon(netWorth.monthlyChange);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      {/* Net Worth - Primary Card */}
      <Card className="md:col-span-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm opacity-90">Net Worth</h3>
              <p className="text-3xl font-bold">{formatCurrency(netWorth.netWorthValue)}</p>
            </div>
            <Wallet className="w-8 h-8 opacity-80" />
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <ChangeIcon className="w-4 h-4" />
              <span>{netWorth.monthlyChange >= 0 ? '+' : ''}{formatCurrency(netWorth.monthlyChange)} this month</span>
            </div>
            <div>
              <span>+{netWorth.yearlyGrowth}% this year</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Assets */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-muted-foreground">Total Assets</h3>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-foreground">{formatCurrency(netWorth.totalAssets)}</p>
          <p className="text-sm text-muted-foreground">Across all categories</p>
        </CardContent>
      </Card>

      {/* Total Liabilities */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-muted-foreground">Total Liabilities</h3>
            <TrendingDown className="w-4 h-4 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-foreground">{formatCurrency(netWorth.totalLiabilities)}</p>
          <p className="text-sm text-muted-foreground">Loans & outstanding</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NetWorthSummary;