
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { KEY_METRICS } from '@/data/stockMockData';
import TrendIndicator from '../shared/TrendIndicator';
import { cn } from '@/lib/utils';

const KeyMetricsTable: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Market Cap and Volatility Information */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-1">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Market Cap</h3>
          <p className="text-base font-medium">₹1,38,853 Cr</p>
        </div>
        <div className="md:col-span-1">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Volatility</h3>
          <Badge variant="outline" className="text-red-600 border-red-200">High Risk</Badge>
        </div>
      </div>

      {/* Financial Ratios Grid */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-6">Key Financial Ratios</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {KEY_METRICS.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  {metric.label}
                </span>
                {metric.trend && (
                  <TrendIndicator 
                    value={metric.trend === 'up' ? 1 : metric.trend === 'down' ? -1 : 0} 
                    showIcon={true}
                    showValue={false}
                    size="sm"
                  />
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-foreground">
                  {typeof metric.value === 'number' 
                    ? metric.value.toLocaleString('en-IN', { minimumFractionDigits: 1 })
                    : metric.value
                  }
                </span>
              </div>
              
              {metric.comparison && (
                <div className="text-xs text-muted-foreground">
                  {metric.comparison}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Financial Health Indicators */}
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="text-lg font-semibold mb-4">Financial Health Summary</h3>
          <div className="grid gap-4 md:grid-cols-4">
            
            <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="text-2xl font-bold text-green-600">A-</div>
              <div className="text-sm text-green-700 dark:text-green-400 font-medium">Profitability</div>
              <div className="text-xs text-muted-foreground mt-1">Strong margins</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="text-2xl font-bold text-blue-600">B+</div>
              <div className="text-sm text-blue-700 dark:text-blue-400 font-medium">Liquidity</div>
              <div className="text-xs text-muted-foreground mt-1">Adequate cash</div>
            </div>
            
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="text-2xl font-bold text-yellow-600">B</div>
              <div className="text-sm text-yellow-700 dark:text-yellow-400 font-medium">Leverage</div>
              <div className="text-xs text-muted-foreground mt-1">Moderate debt</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="text-2xl font-bold text-green-600">A</div>
              <div className="text-sm text-green-700 dark:text-green-400 font-medium">Efficiency</div>
              <div className="text-xs text-muted-foreground mt-1">Good returns</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default KeyMetricsTable;
