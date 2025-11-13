import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface EnginesSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    engines: Array<{
      name: string;
      features: string[];
    }>;
  };
}

export const EnginesSlide: React.FC<EnginesSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="h-screen flex flex-col justify-center p-12 bg-gradient-to-br from-background to-muted/20">
      <div className="text-center mb-8">
        <IconComponent className="w-12 h-12 mx-auto mb-3 text-primary" />
        <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
        <p className="text-lg text-muted-foreground">{slide.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto">
        {slide.engines.map((engine, index) => (
          <Card key={index} className="border-2 hover:border-primary transition-all">
            <CardContent className="p-4">
              <h3 className="text-lg font-bold mb-3 text-primary">{engine.name}</h3>
              <ul className="space-y-1.5 text-sm">
                {engine.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{feature}</span>
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
