import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, XCircle, HelpCircle } from 'lucide-react';
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
          <Card 
            key={index}
            className={cn(
              "p-4 transition-all duration-200 hover:shadow-md cursor-pointer group",
              getStatusColor(item.score)
            )}
          >
            <div className="text-center space-y-3">
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

              {/* Details on hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <p className="text-xs text-muted-foreground mt-2">
                  {item.details}
                </p>
              </div>
            </div>
          </Card>
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