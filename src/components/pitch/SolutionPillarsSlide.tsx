import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface SolutionPillarsSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    pillars: Array<{
      icon: string;
      title: string;
      description: string;
      features: string[];
      impact: string;
    }>;
  };
}

export const SolutionPillarsSlide: React.FC<SolutionPillarsSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
        <p className="text-xl text-muted-foreground">{slide.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slide.pillars.map((pillar, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{pillar.icon}</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground">{pillar.description}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {pillar.features.map((feature, featureIdx) => (
                  <div key={featureIdx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t">
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Impact: {pillar.impact}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
