
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CheckCircle, AlertTriangle, XCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
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

  // Calculate cumulative health score
  const calculateHealthScore = () => {
    const scores = INVESTMENT_CHECKLIST.map(item => {
      switch (item.score) {
        case 'positive': return 85;
        case 'negative': return 25;
        default: return 55; // neutral
      }
    });
    
    return Math.round(scores.reduce((acc, score) => acc + score, 0) / scores.length);
  };

  const healthScore = calculateHealthScore();

  const getHealthLabel = (score: number) => {
    if (score >= 70) return 'Healthy';
    if (score >= 50) return 'Moderate';
    return 'Risky';
  };

  return (
    <Card className="p-6">
      {/* Header with Health Score Bar */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold">Investment Health Radar</h2>
        
        <div className="flex items-center gap-4 min-w-0 flex-1 max-w-md">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative flex-1 cursor-pointer">
                  <Progress value={healthScore} className="h-3" />
                  <div 
                    className="absolute top-0 left-0 h-3 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${healthScore}%`,
                      background: `linear-gradient(90deg, 
                        #ef4444 0%, 
                        #f97316 25%, 
                        #eab308 50%, 
                        #84cc16 75%, 
                        #22c55e 100%)`
                    }}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Investment health score for LODHA</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="font-medium text-foreground text-sm">{healthScore}/100</span>
            <span className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              healthScore >= 70 && "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
              healthScore >= 50 && healthScore < 70 && "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
              healthScore < 50 && "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
            )}>
              {getHealthLabel(healthScore)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {INVESTMENT_CHECKLIST.map((item, index) => (
          <div key={index} className="relative group h-40" style={{ perspective: '1000px' }}>
            <div 
              className="relative w-full h-full transition-transform duration-700 group-hover:[transform:rotateY(180deg)]" 
              style={{ 
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden'
              }}
            >
              {/* Front Side */}
              <Card 
                className={cn(
                  "absolute inset-0 p-4 pb-6 transition-all duration-200 hover:shadow-md cursor-pointer",
                  getStatusColor(item.score)
                )}
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(0deg)'
                }}
              >
                <div className="h-full flex flex-col items-center justify-between text-center">
                  {/* Category Icon */}
                  <div className="text-2xl">{item.icon}</div>
                  
                  {/* Status Icon */}
                  <div>{getStatusIcon(item.score)}</div>

                  {/* Category */}
                  <h3 className="font-medium text-sm text-foreground">
                    {item.category}
                  </h3>

                  {/* Status Badge - Properly centered */}
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "text-xs font-medium px-2 py-1 text-center",
                      item.score === 'positive' && "border-green-300 text-green-700 dark:text-green-400",
                      item.score === 'negative' && "border-red-300 text-red-700 dark:text-red-400",
                      item.score === 'neutral' && "border-yellow-300 text-yellow-700 dark:text-yellow-400"
                    )}
                  >
                    {item.status}
                  </Badge>
                </div>
              </Card>

              {/* Back Side - Metrics */}
              <Card 
                className={cn(
                  "absolute inset-0 p-4 pb-6 cursor-pointer",
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
                  <div className="text-center mt-3">
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
    </Card>
  );
};

export default InvestmentChecklist;
