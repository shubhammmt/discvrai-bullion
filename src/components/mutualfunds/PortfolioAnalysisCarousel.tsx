import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { 
  TrendingUp, 
  Shield, 
  Target, 
  AlertTriangle, 
  PieChart,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react';

interface AnalysisCard {
  id: string;
  title: string;
  description: string;
  metrics: {
    value: string;
    label: string;
    trend?: 'up' | 'down' | 'neutral';
    change?: string;
  }[];
  icon: React.ElementType;
  color: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface PortfolioAnalysisCarouselProps {
  onViewDetails?: (analysisId: string) => void;
}

const PortfolioAnalysisCarousel = ({ onViewDetails }: PortfolioAnalysisCarouselProps) => {
  const analysisCards: AnalysisCard[] = [
    {
      id: 'performance',
      title: 'Portfolio Performance',
      description: 'Your portfolio is outperforming benchmark by 3.2% this quarter',
      metrics: [
        { value: '+18.5%', label: '1Y Returns', trend: 'up', change: '+2.1%' },
        { value: '₹12.4L', label: 'Current Value', trend: 'up' },
        { value: '85/100', label: 'Risk Score', trend: 'neutral' }
      ],
      icon: TrendingUp,
      color: 'bg-green-500/10 border-green-500/20',
      action: {
        label: 'View Detailed Analysis',
        onClick: () => onViewDetails?.('performance')
      }
    },
    {
      id: 'allocation',
      title: 'Asset Allocation',
      description: 'Your allocation is well-diversified with room for optimization',
      metrics: [
        { value: '65%', label: 'Equity Funds', trend: 'neutral' },
        { value: '25%', label: 'Debt Funds', trend: 'neutral' },
        { value: '10%', label: 'Hybrid Funds', trend: 'neutral' }
      ],
      icon: PieChart,
      color: 'bg-blue-500/10 border-blue-500/20',
      action: {
        label: 'Optimize Allocation',
        onClick: () => onViewDetails?.('allocation')
      }
    },
    {
      id: 'risk',
      title: 'Risk Assessment',
      description: 'Your portfolio risk is aligned with your moderate risk profile',
      metrics: [
        { value: 'Moderate', label: 'Risk Level', trend: 'neutral' },
        { value: '12.5%', label: 'Volatility', trend: 'down', change: '-1.2%' },
        { value: '3.2', label: 'Sharpe Ratio', trend: 'up' }
      ],
      icon: Shield,
      color: 'bg-yellow-500/10 border-yellow-500/20',
      action: {
        label: 'Review Risk Settings',
        onClick: () => onViewDetails?.('risk')
      }
    },
    {
      id: 'goals',
      title: 'Goal Tracking',
      description: 'You are on track to achieve 2 out of 3 financial goals',
      metrics: [
        { value: '67%', label: 'Goals on Track', trend: 'up' },
        { value: '₹45L', label: 'Target Amount', trend: 'neutral' },
        { value: '3.2Y', label: 'Avg. Timeline', trend: 'neutral' }
      ],
      icon: Target,
      color: 'bg-purple-500/10 border-purple-500/20',
      action: {
        label: 'Adjust Goals',
        onClick: () => onViewDetails?.('goals')
      }
    },
    {
      id: 'rebalancing',
      title: 'Rebalancing Needed',
      description: 'Some funds are overweight and need rebalancing',
      metrics: [
        { value: '3', label: 'Funds to Rebalance', trend: 'neutral' },
        { value: '₹25K', label: 'Suggested Amount', trend: 'neutral' },
        { value: 'High', label: 'Priority', trend: 'up' }
      ],
      icon: BarChart3,
      color: 'bg-orange-500/10 border-orange-500/20',
      action: {
        label: 'Start Rebalancing',
        onClick: () => onViewDetails?.('rebalancing')
      }
    }
  ];

  const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight className="w-3 h-3 text-green-600" />;
      case 'down':
        return <ArrowDownRight className="w-3 h-3 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Portfolio Analysis Insights</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            AI-powered analysis of your portfolio performance, risk, and optimization opportunities
          </p>
        </div>

        <Carousel className="w-full max-w-7xl mx-auto">
          <CarouselContent className="-ml-2 md:-ml-4">
            {analysisCards.map((card) => {
              const IconComponent = card.icon;
              return (
                <CarouselItem key={card.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className={`h-full ${card.color} hover:shadow-lg transition-all duration-300`}>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-background rounded-lg">
                            <IconComponent className="w-5 h-5 text-foreground" />
                          </div>
                          <CardTitle className="text-lg">{card.title}</CardTitle>
                        </div>
                        <Clock className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">{card.description}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="grid gap-3">
                        {card.metrics.map((metric, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                            <div>
                              <p className="text-sm text-muted-foreground">{metric.label}</p>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">{metric.value}</span>
                                {getTrendIcon(metric.trend)}
                                {metric.change && (
                                  <span className={`text-xs ${
                                    metric.trend === 'up' ? 'text-green-600' : 
                                    metric.trend === 'down' ? 'text-red-600' : 
                                    'text-muted-foreground'
                                  }`}>
                                    {metric.change}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {card.action && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={card.action.onClick}
                        >
                          {card.action.label}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default PortfolioAnalysisCarousel;