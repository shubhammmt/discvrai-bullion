import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, CheckCircle, DollarSign } from 'lucide-react';

interface PathToProfitabilitySlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    timeline: Array<{
      phase: string;
      revenue: string;
      costs: string;
      burn?: string;
      profit?: string;
      keyMetrics: string;
      milestones: string[];
    }>;
    revenueBreakdown: {
      [key: string]: {
        percentage: number;
        amount: string;
        description: string;
      };
    };
  };
}

export const PathToProfitabilitySlide: React.FC<PathToProfitabilitySlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
        <p className="text-xl text-muted-foreground">{slide.subtitle}</p>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {slide.timeline.map((period, index) => {
          const isProfit = period.profit && !period.profit.startsWith('-');
          
          return (
            <Card key={index} className={isProfit ? 'border-2 border-primary bg-primary/5' : ''}>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Phase Info */}
                  <div>
                    <h3 className="text-xl font-bold mb-2">{period.phase}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{period.keyMetrics}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Revenue</span>
                        <span className="text-lg font-bold text-primary">{period.revenue}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Costs</span>
                        <span className="text-lg font-semibold">{period.costs}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between items-center">
                        <span className="text-sm font-medium">Net</span>
                        <span className={`text-xl font-bold ${isProfit ? 'text-green-600' : 'text-orange-600'}`}>
                          {period.burn || period.profit}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="md:col-span-2">
                    <h4 className="font-semibold mb-3">Key Milestones</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {period.milestones.map((milestone, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                          <span className="text-sm">{milestone}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Revenue Breakdown at Month 12 */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
        <CardContent className="p-6">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-primary" />
            Month 12 Revenue Breakdown
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(slide.revenueBreakdown).map(([key, value]) => (
              <div key={key} className="bg-background rounded-lg p-4 border border-primary/20">
                <div className="text-3xl font-bold text-primary mb-1">{value.percentage}%</div>
                <div className="text-lg font-semibold mb-2">{value.amount}</div>
                <div className="text-sm text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div className="text-xs text-muted-foreground mt-2 pt-2 border-t">
                  {value.description}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
