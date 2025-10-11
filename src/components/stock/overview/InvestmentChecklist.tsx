
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CheckCircle, AlertTriangle, XCircle, TrendingUp, TrendingDown, Minus, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useInvestmentHealthRadar } from '@/hooks/useInvestmentHealthRadar';

interface InvestmentChecklistProps {
  symbol?: string;
}

const InvestmentChecklist: React.FC<InvestmentChecklistProps> = ({ symbol }) => {
  const { data, isLoading, error } = useInvestmentHealthRadar(symbol);
  
  // Map category names to emoji icons
  const getCategoryIcon = (categoryName: string) => {
    const iconMap: Record<string, string> = {
      'Returns': '📈',
      'Profitability': '💰',
      'Valuation': '💎',
      'Efficiency': '⚡',
      'Shareholder Value': '🎁',
      'Risk': '🛡️',
    };
    return iconMap[categoryName] || '📊';
  };

  // Convert API score (0-10) to status
  const getStatusFromScore = (score: number): 'positive' | 'neutral' | 'negative' => {
    if (score >= 7) return 'positive';
    if (score >= 4) return 'neutral';
    return 'negative';
  };

  const getStatusLabel = (score: number): string => {
    if (score >= 7) return 'Strong';
    if (score >= 4) return 'Moderate';
    return 'Weak';
  };
  const getStatusIcon = (score: 'positive' | 'neutral' | 'negative') => {
    switch (score) {
      case 'positive':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'negative':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (score: 'positive' | 'neutral' | 'negative') => {
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

  // Calculate health score from API data (0-10 scale to 0-100)
  const healthScore = data ? Math.round(data.overall_score * 10) : 0;

  const getHealthLabel = (score: number) => {
    if (score >= 70) return 'Healthy';
    if (score >= 50) return 'Moderate';
    return 'Risky';
  };

  const getHealthLabelColor = (score: number) => {
    if (score >= 70) return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    if (score >= 50) return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
    return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
  };

  if (isLoading) {
    return (
      <Card className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading investment health data...</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <AlertTriangle className="h-8 w-8 mx-auto text-destructive" />
          <p className="text-destructive font-medium">Failed to load investment health data</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="p-6 flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">No data available</p>
      </Card>
    );
  }

  return (
    <Card className="p-3 sm:p-6">
      {/* Header with Health Score Bar */}
      <div className="mb-4 sm:mb-6">
        {/* Mobile Layout - Stacked */}
        <div className="block sm:hidden space-y-3">
          <h2 className="text-lg font-bold">Investment Health Radar</h2>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground text-sm">{healthScore}/100</span>
              <span className={cn(
                "text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap",
                getHealthLabelColor(healthScore)
              )}>
                {getHealthLabel(healthScore)}
              </span>
            </div>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative cursor-pointer">
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
                  <p>Investment health score for {data.symbol}</p>
                  <p className="text-xs text-muted-foreground">{data.company_name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Desktop Layout - Horizontal */}
        <div className="hidden sm:flex items-center justify-between gap-4">
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
                  <p>Investment health score for {data.symbol}</p>
                  <p className="text-xs text-muted-foreground">{data.company_name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="font-medium text-foreground text-sm">{healthScore}/100</span>
              <span className={cn(
                "text-xs font-medium px-2 py-1 rounded-full",
                getHealthLabelColor(healthScore)
              )}>
                {getHealthLabel(healthScore)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {data.category_scores.map((category, index) => {
          const status = getStatusFromScore(category.score);
          const statusLabel = getStatusLabel(category.score);
          const icon = getCategoryIcon(category.category_name);
          
          // Get top 3 metrics for this category
          const categoryMetrics = data.detailed_metrics[category.category_name]?.slice(0, 3) || [];
          
          return (
          <div key={index} className="relative group h-32 sm:h-40" style={{ perspective: '1000px' }}>
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
                  "absolute inset-0 p-2 sm:p-4 pb-4 sm:pb-6 transition-all duration-200 hover:shadow-md cursor-pointer",
                  getStatusColor(status)
                )}
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(0deg)'
                }}
              >
                <div className="h-full flex flex-col items-center justify-between text-center">
                  {/* Category Icon */}
                  <div className="text-xl sm:text-2xl">{icon}</div>
                  
                  {/* Status Icon */}
                  <div>{getStatusIcon(status)}</div>

                  {/* Category */}
                  <h3 className="font-medium text-xs sm:text-sm text-foreground leading-tight">
                    {category.category_name}
                  </h3>

                  {/* Status Badge */}
                   <Badge 
                     variant="outline" 
                     className={cn(
                       "text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 text-center",
                       (() => {
                         switch (status) {
                           case 'positive':
                             return "border-green-300 text-green-700 dark:text-green-400";
                           case 'negative':
                             return "border-red-300 text-red-700 dark:text-red-400";
                           case 'neutral':
                             return "border-yellow-300 text-yellow-700 dark:text-yellow-400";
                           default:
                             return "";
                         }
                       })()
                     )}
                   >
                    {statusLabel} ({category.score.toFixed(1)}/10)
                  </Badge>
                </div>
              </Card>

              {/* Back Side - Metrics */}
              <Card 
                className={cn(
                  "absolute inset-0 p-2 sm:p-4 pb-4 sm:pb-6 cursor-pointer",
                  getStatusColor(status)
                )}
                style={{ 
                  backfaceVisibility: 'hidden', 
                  transform: 'rotateY(180deg)' 
                }}
              >
                <div className="h-full flex flex-col justify-between">
                  {/* Header */}
                  <div className="text-center mb-2 sm:mb-3">
                    <h4 className="font-semibold text-xs text-foreground">
                      {category.category_name} Metrics
                    </h4>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-1 sm:space-y-2 flex-1">
                    {categoryMetrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="flex items-center justify-between">
                        <span className="text-xs font-medium text-foreground truncate">
                          {metric.metric_name}
                        </span>
                        <div className="flex items-center gap-1 ml-1">
                          <span className="text-xs font-semibold text-foreground">
                            {typeof metric.value === 'number' 
                              ? metric.value.toFixed(2) 
                              : metric.value}
                          </span>
                          <span className={cn(
                            "text-xs",
                            metric.score >= 7 ? "text-green-600" : 
                            metric.score >= 4 ? "text-yellow-600" : "text-red-600"
                          )}>
                            ({metric.score.toFixed(1)})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="text-center mt-2 sm:mt-3">
                    <p className="text-xs text-muted-foreground">
                      Hover to see overview
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );
        })}
      </div>

      {/* AI Insights Section */}
      {data.ai_insights && (
        <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
          <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <span>🤖</span> AI Analysis
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {data.ai_insights.performance_summary}
          </p>
          <p className="text-xs text-muted-foreground italic">
            {data.ai_insights.trending_insight}
          </p>
          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <span>Confidence: {(data.ai_insights.confidence_score * 100).toFixed(0)}%</span>
            <span>Updated: {new Date(data.calculation_timestamp).toLocaleDateString()}</span>
          </div>
        </div>
      )}
    </Card>
  );
};

export default InvestmentChecklist;
