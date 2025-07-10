import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GrowthMetric {
  title: string;
  periods: {
    label: string;
    value: number;
    isPositive: boolean;
  }[];
}

const HistoricalGrowthMetrics: React.FC = () => {
  const growthMetrics: GrowthMetric[] = [
    {
      title: "Compounded Sales Growth",
      periods: [
        { label: "10 Years:", value: 11, isPositive: true },
        { label: "5 Years:", value: 16, isPositive: true },
        { label: "3 Years:", value: 27, isPositive: true },
        { label: "TTM:", value: 7, isPositive: true }
      ]
    },
    {
      title: "Compounded Profit Growth", 
      periods: [
        { label: "10 Years:", value: 24, isPositive: true },
        { label: "5 Years:", value: 15, isPositive: true },
        { label: "3 Years:", value: 51, isPositive: true },
        { label: "TTM:", value: 70, isPositive: true }
      ]
    },
    {
      title: "Stock Price CAGR",
      periods: [
        { label: "10 Years:", value: 26, isPositive: true },
        { label: "5 Years:", value: 34, isPositive: true },
        { label: "3 Years:", value: 43, isPositive: true },
        { label: "1 Year:", value: -8, isPositive: false }
      ]
    },
    {
      title: "Return on Equity",
      periods: [
        { label: "10 Years:", value: 14, isPositive: true },
        { label: "5 Years:", value: 18, isPositive: true },
        { label: "3 Years:", value: 18, isPositive: true },
        { label: "Last Year:", value: 20, isPositive: true }
      ]
    }
  ];

  const getValueColor = (isPositive: boolean) => {
    return isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  };

  const getBackgroundGradient = (index: number) => {
    const gradients = [
      'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800',
      'from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-emerald-200 dark:border-emerald-800',
      'from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200 dark:border-purple-800',
      'from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border-orange-200 dark:border-orange-800'
    ];
    return gradients[index % gradients.length];
  };

  const getIconColor = (index: number) => {
    const colors = [
      'text-blue-600',
      'text-emerald-600', 
      'text-purple-600',
      'text-orange-600'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Historical Growth Analysis</h2>
          <p className="text-sm text-muted-foreground">Long-term performance across key metrics</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {growthMetrics.map((metric, index) => (
          <Card 
            key={index}
            className={cn(
              "p-5 transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br border",
              getBackgroundGradient(index)
            )}
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-semibold text-foreground leading-tight">
                  {metric.title}
                </h3>
                <TrendingUp className={cn("w-4 h-4 mt-0.5", getIconColor(index))} />
              </div>

              {/* Metrics */}
              <div className="space-y-3">
                {metric.periods.map((period, periodIndex) => (
                  <div key={periodIndex} className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                      {period.label}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className={cn("text-sm font-bold", getValueColor(period.isPositive))}>
                        {period.isPositive ? '+' : ''}{period.value}%
                      </span>
                      {period.isPositive ? (
                        <ArrowUpRight className="w-3 h-3 text-green-500" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary indicator */}
              <div className="pt-2 border-t border-border/50">
                <div className="flex items-center justify-center gap-1">
                  <div className={cn("w-2 h-2 rounded-full", 
                    metric.periods.filter(p => p.isPositive).length >= 3 
                      ? "bg-green-500" 
                      : "bg-yellow-500"
                  )} />
                  <span className="text-xs text-muted-foreground">
                    {metric.periods.filter(p => p.isPositive).length >= 3 
                      ? "Consistent Growth" 
                      : "Mixed Performance"
                    }
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* AI Summary */}
      <Card className="p-4 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950/50 dark:to-gray-950/50 border-slate-200 dark:border-slate-800">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <TrendingUp className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Growth Analysis Summary</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              LODHA demonstrates strong historical growth with exceptional profit expansion (24-70% CAGR) and robust sales growth (11-27% CAGR). 
              Stock returns have been impressive long-term (26% 10-year CAGR) though recent performance shows volatility. 
              Consistent ROE improvement (14-20%) indicates efficient capital utilization and strong operational excellence.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HistoricalGrowthMetrics;