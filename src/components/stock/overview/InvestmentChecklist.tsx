
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, XCircle, HelpCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { INVESTMENT_CHECKLIST } from '@/data/stockMockData';
import { cn } from '@/lib/utils';

const InvestmentChecklist: React.FC = () => {
  const getStatusIcon = (score: string) => {
    switch (score) {
      case 'positive':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'negative':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (score: string) => {
    switch (score) {
      case 'positive':
        return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20';
      case 'negative':
        return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20';
      default:
        return 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/20';
    }
  };

  const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-3 w-3 text-red-600" />;
      default:
        return <Minus className="h-3 w-3 text-gray-600" />;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Investment Checklist</h2>
        <div className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-primary cursor-pointer hover:underline">
            How to read checklist?
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {INVESTMENT_CHECKLIST.map((item, index) => (
          <div key={index} className="relative group h-32" style={{ perspective: '1000px' }}>
            <div className="relative w-full h-full transition-transform duration-700 group-hover:[transform:rotateY(180deg)]" style={{ transformStyle: 'preserve-3d' }}>
              {/* Front Side */}
              <Card 
                className={cn(
                  "absolute inset-0 p-4 transition-all duration-200 hover:shadow-md cursor-pointer",
                  getStatusColor(item.score)
                )}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="text-center space-y-3 h-full">
                  {/* Category Icon */}
                  <div className="flex justify-center">
                    <div className="text-2xl">{item.icon}</div>
                  </div>
                  
                  {/* Status Icon */}
                  <div className="flex justify-center">
                    {getStatusIcon(item.score)}
                  </div>

                  {/* Category */}
                  <div>
                    <h3 className="font-medium text-sm text-foreground">
                      {item.category}
                    </h3>
                  </div>

                  {/* Status */}
                  <div>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-xs font-medium px-2 py-1",
                        item.score === 'positive' && "border-green-300 text-green-700 dark:text-green-400",
                        item.score === 'negative' && "border-red-300 text-red-700 dark:text-red-400",
                        item.score === 'neutral' && "border-yellow-300 text-yellow-700 dark:text-yellow-400"
                      )}
                    >
                      {item.status}
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Back Side - Metrics */}
              <Card 
                className={cn(
                  "absolute inset-0 p-4 cursor-pointer",
                  getStatusColor(item.score)
                )}
                style={{ 
                  backfaceVisibility: 'hidden', 
                  transform: 'rotateY(180deg)' 
                }}
              >
                <div className="h-full flex flex-col justify-between">
                  {/* Header */}
                  <div className="text-center mb-3">
                    <h4 className="font-semibold text-xs text-foreground">
                      {item.category} Metrics
                    </h4>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-2 flex-1">
                    {item.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="flex items-center justify-between">
                        <span className="text-xs font-medium text-foreground truncate">
                          {metric.label}
                        </span>
                        <div className="flex items-center gap-1 ml-1">
                          <span className="text-xs font-semibold text-foreground">
                            {metric.value}
                          </span>
                          {metric.trend && getTrendIcon(metric.trend)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="text-center mt-2">
                    <p className="text-xs text-muted-foreground">
                      Hover to see overview
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Overall Assessment:</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-green-600 font-medium">2 Strong</span>
            </span>
            <span className="flex items-center gap-1">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span className="text-yellow-600 font-medium">4 Moderate</span>
            </span>
            <span className="flex items-center gap-1">
              <XCircle className="h-4 w-4 text-red-600" />
              <span className="text-red-600 font-medium">0 Weak</span>
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InvestmentChecklist;
