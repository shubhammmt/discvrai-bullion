import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface DistributorSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    features: string[];
    benefits: string[];
  };
}

export const DistributorSlide: React.FC<DistributorSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="h-screen flex flex-col justify-center p-12 bg-gradient-to-br from-background to-muted/20">
      <div className="text-center mb-6">
        <IconComponent className="w-12 h-12 mx-auto mb-3 text-primary" />
        <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
        <p className="text-lg text-muted-foreground">{slide.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
        <Card className="border-2">
          <CardContent className="p-5">
            <h3 className="text-xl font-bold mb-3 text-primary">Platform Features</h3>
            <ul className="space-y-1.5 text-sm">
              {slide.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-2">
          <CardContent className="p-5">
            <h3 className="text-xl font-bold mb-3 text-primary">Key Benefits</h3>
            <ul className="space-y-1.5 text-sm">
              {slide.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
