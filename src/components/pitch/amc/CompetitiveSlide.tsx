import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface CompetitiveSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    vsCompetitors: Array<{
      competitor: string;
      ourEdge: string[];
    }>;
  };
}

export const CompetitiveSlide: React.FC<CompetitiveSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="h-screen flex flex-col justify-center p-12 bg-gradient-to-br from-background to-muted/20">
      <div className="text-center mb-8">
        <IconComponent className="w-12 h-12 mx-auto mb-3 text-primary" />
        <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
        <p className="text-lg text-muted-foreground">{slide.subtitle}</p>
      </div>
      
      <div className="space-y-4 max-w-5xl mx-auto">
        {slide.vsCompetitors.map((comparison, index) => (
          <Card key={index} className="border-2 hover:border-primary transition-all">
            <CardContent className="p-5">
              <h3 className="text-lg font-bold mb-3 text-destructive/80">vs {comparison.competitor}</h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                {comparison.ourEdge.map((edge, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>{edge}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
