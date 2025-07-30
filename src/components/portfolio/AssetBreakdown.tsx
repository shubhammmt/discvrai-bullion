import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Shield, 
  Coins, 
  Building, 
  Target, 
  PiggyBank,
  Wallet 
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { AssetData } from '@/hooks/useComprehensivePortfolio';

interface AssetBreakdownProps {
  assets: AssetData;
  formatCurrency: (amount: number) => string;
  className?: string;
}

const AssetBreakdown: React.FC<AssetBreakdownProps> = ({ 
  assets, 
  formatCurrency, 
  className = "" 
}) => {
  const getAssetIcon = (assetType: string) => {
    const iconProps = { className: "w-4 h-4" };
    
    switch (assetType.toLowerCase()) {
      case 'equity':
        return <TrendingUp {...iconProps} className="w-4 h-4 text-blue-600" />;
      case 'debt':
        return <Shield {...iconProps} className="w-4 h-4 text-green-600" />;
      case 'gold':
        return <Coins {...iconProps} className="w-4 h-4 text-yellow-600" />;
      case 'realestate':
        return <Building {...iconProps} className="w-4 h-4 text-purple-600" />;
      case 'alternatives':
        return <Target {...iconProps} className="w-4 h-4 text-indigo-600" />;
      case 'savings':
      case 'fixeddeposits':
      case 'emergency':
        return <PiggyBank {...iconProps} className="w-4 h-4 text-green-600" />;
      default:
        return <Wallet {...iconProps} className="w-4 h-4 text-gray-600" />;
    }
  };

  const totalInvestments = Object.values(assets.investments).reduce((a, b) => a + b, 0);
  const totalCash = Object.values(assets.cash).reduce((a, b) => a + b, 0);
  const totalAssets = totalInvestments + totalCash;

  // Data for pie chart
  const assetAllocationData = [
    { name: 'Equity', value: assets.investments.equity, color: '#3B82F6' },
    { name: 'Debt', value: assets.investments.debt, color: '#10B981' },
    { name: 'Gold', value: assets.investments.gold, color: '#F59E0B' },
    { name: 'Real Estate', value: assets.investments.realEstate, color: '#8B5CF6' },
    { name: 'Alternatives', value: assets.investments.alternatives, color: '#6366F1' },
    { name: 'Cash & Liquid', value: totalCash, color: '#6B7280' }
  ].filter(item => item.value > 0);

  const renderTooltip = (props: any) => {
    if (props.active && props.payload && props.payload.length) {
      const data = props.payload[0];
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatCurrency(data.value)} ({((data.value / totalAssets) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${className}`}>
      
      {/* Investment Assets */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Investment Assets
            </CardTitle>
            <Badge variant="outline">{formatCurrency(totalInvestments)}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(assets.investments).map(([key, value]) => {
              if (value === 0) return null;
              
              return (
                <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    {getAssetIcon(key)}
                    <span className="capitalize font-medium">
                      {key === 'realEstate' ? 'Real Estate' : key}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(value)}</p>
                    <p className="text-sm text-muted-foreground">
                      {((value / totalInvestments) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Investment Performance Metrics */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-green-600">+15.2%</p>
                <p className="text-xs text-muted-foreground">XIRR</p>
              </div>
              <div>
                <p className="text-lg font-bold">+2.8%</p>
                <p className="text-xs text-muted-foreground">vs Nifty</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cash & Liquid Assets + Asset Allocation Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PiggyBank className="w-5 h-5 text-green-600" />
            Cash & Liquid Assets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-4">
            {Object.entries(assets.cash).map(([key, value]) => {
              if (value === 0) return null;
              
              return (
                <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    {getAssetIcon(key)}
                    <span className="capitalize font-medium">
                      {key === 'fixedDeposits' ? 'Fixed Deposits' : key}
                    </span>
                  </div>
                  <p className="font-semibold">{formatCurrency(value)}</p>
                </div>
              );
            })}
          </div>

          {/* Asset Allocation Pie Chart */}
          <div className="h-48">
            <h4 className="font-medium mb-2 text-center">Asset Allocation</h4>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetAllocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {assetAllocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={renderTooltip} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {assetAllocationData.map((item, index) => (
              <div key={index} className="flex items-center gap-1 text-xs">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetBreakdown;