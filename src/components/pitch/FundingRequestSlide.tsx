import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Target, TrendingUp, Zap } from 'lucide-react';

interface FundingRequestSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
  };
}

export const FundingRequestSlide: React.FC<FundingRequestSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  const raiseDetails = {
    amount: '₹5 cr',
    round: 'Seed',
    structure: 'Convertible notes with 20% discount | Min Cap: ₹50 cr'
  };

  const useOfFunds = [
    'Accelerate user growth from 1M to 10M MAUs',
    'Scale distribution partnerships',
    'Achieve profitability by FY29'
  ];

  const keyImpact = [
    {
      icon: Target,
      title: 'Tech + Content Engine',
      description: 'Strengthen discovery-led growth infrastructure',
      color: 'text-blue-600'
    },
    {
      icon: TrendingUp,
      title: 'Product Stack Expansion',
      description: 'Insurance, loans, gold, and mutual funds',
      color: 'text-green-600'
    },
    {
      icon: Zap,
      title: 'B2B Foundation',
      description: 'Build institutional monetization layer',
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h2 className="text-4xl font-bold text-foreground mb-2">{slide.title}</h2>
        <p className="text-xl text-muted-foreground">{slide.subtitle}</p>
      </div>

      {/* Raise Target */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">Raise Target</p>
          <h3 className="text-5xl font-bold text-primary mb-2">{raiseDetails.amount}</h3>
          <p className="text-lg font-semibold text-foreground mb-3">{raiseDetails.round}</p>
          <div className="inline-block bg-background/50 px-4 py-2 rounded-lg">
            <p className="text-sm text-muted-foreground">{raiseDetails.structure}</p>
          </div>
        </CardContent>
      </Card>

      {/* Use of Funds */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-4 text-center">Use of Funds</h3>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-3">
              {useOfFunds.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-foreground font-medium pt-1">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Impact */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-4 text-center">Key Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {keyImpact.map((item, index) => {
            const ItemIcon = item.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-5 text-center">
                  <ItemIcon className={`w-12 h-12 mx-auto mb-3 ${item.color}`} />
                  <h4 className="text-lg font-bold text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Bottom Line */}
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="p-6 text-center">
          <p className="text-lg font-semibold">
            This raise will power the transition from validated model to scaled platform, capturing India's $50B+ financial distribution opportunity through zero-CAC content flywheel
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
