import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FlywheelSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    retail: string[];
    distributors: string[];
    outcome: string;
  };
}

export const FlywheelSlide: React.FC<FlywheelSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="h-screen flex flex-col justify-center p-12 bg-gradient-to-br from-background to-muted/20">
      <div className="text-center mb-6">
        <IconComponent className="w-12 h-12 mx-auto mb-3 text-primary" />
        <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
        <p className="text-lg text-muted-foreground">{slide.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto mb-6">
        <Card className="border-2">
          <CardContent className="p-5">
            <h3 className="text-xl font-bold mb-3 text-primary">For Retail Investors</h3>
            <ul className="space-y-2 text-sm">
              {slide.retail.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-2">
          <CardContent className="p-5">
            <h3 className="text-xl font-bold mb-3 text-primary">For Distributors</h3>
            <ul className="space-y-2 text-sm">
              {slide.distributors.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card className="max-w-3xl mx-auto bg-primary/5 border-primary">
        <CardContent className="p-4 text-center">
          <p className="text-base font-semibold">{slide.outcome}</p>
        </CardContent>
      </Card>
    </div>
  );
};
