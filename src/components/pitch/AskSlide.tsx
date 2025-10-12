import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Target, TrendingUp } from 'lucide-react';

interface AskSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    investment: {
      amount: string;
      security: string;
      minimum: string;
      close: string;
    };
    benefits: string[];
    returns: Array<{
      scenario: string;
      valuation: string;
      investment: string;
      returns: string;
      multiple: string;
    }>;
    useOfFunds: Array<{
      category: string;
      percentage: number;
      amount: string;
    }>;
    milestones: Array<{
      month: string;
      goal: string;
    }>;
  };
}

export const AskSlide: React.FC<AskSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
        <p className="text-xl text-muted-foreground mb-4">{slide.subtitle}</p>
        
        <Card className="max-w-2xl mx-auto bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <p className="text-4xl font-bold text-green-700 dark:text-green-300 mb-4">
              {slide.investment.amount}
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Security</p>
                <p className="font-semibold">{slide.investment.security}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Minimum</p>
                <p className="font-semibold">{slide.investment.minimum}</p>
              </div>
              <div className="col-span-2">
                <p className="text-muted-foreground">Target Close</p>
                <p className="font-semibold">{slide.investment.close}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* What You Get */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              What You Get
            </h3>
            <ul className="space-y-2">
              {slide.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 dark:text-green-400 flex-shrink-0">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Expected Returns */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Expected Returns (5Y)
            </h3>
            <div className="space-y-3">
              {slide.returns.map((scenario, idx) => (
                <div key={idx} className={`p-2 rounded-lg ${
                  scenario.scenario === 'Base' 
                    ? 'bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800'
                    : 'bg-secondary'
                }`}>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">{scenario.scenario}</p>
                  <p className="text-xs"><span className="text-muted-foreground">Valuation:</span> <span className="font-medium">{scenario.valuation}</span></p>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">{scenario.returns}</p>
                  <p className="text-xs text-muted-foreground">{scenario.multiple} return</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Use of Funds */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Use of Funds
            </h3>
            <div className="space-y-2">
              {slide.useOfFunds.map((fund, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium">{fund.category}</span>
                    <span className="text-muted-foreground">{fund.amount}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-1.5">
                    <div 
                      className="bg-primary h-1.5 rounded-full transition-all" 
                      style={{ width: `${fund.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Milestones */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span className="text-xl">🎯</span>
            Key Milestones with This Capital
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {slide.milestones.map((milestone, idx) => (
              <div key={idx} className="bg-background/50 rounded-lg p-3">
                <p className="font-bold text-purple-600 dark:text-purple-400 mb-1">{milestone.month}</p>
                <p className="text-sm">{milestone.goal}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
