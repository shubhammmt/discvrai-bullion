import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface IntegrationSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    paths: Array<{
      type: string;
      description: string;
      timeline: string;
      effort: string;
    }>;
    note: string;
  };
}

export const IntegrationSlide: React.FC<IntegrationSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="h-screen flex flex-col justify-center p-12 bg-gradient-to-br from-background to-muted/20">
      <div className="text-center mb-8">
        <IconComponent className="w-12 h-12 mx-auto mb-3 text-primary" />
        <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
        <p className="text-lg text-muted-foreground">{slide.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto mb-6">
        {slide.paths.map((path, index) => (
          <Card key={index} className="border-2 hover:border-primary transition-all">
            <CardContent className="p-5 space-y-3">
              <h3 className="text-xl font-bold text-primary">{path.type}</h3>
              <p className="text-sm">{path.description}</p>
              <div className="pt-2 border-t space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Timeline:</span>
                  <span className="font-semibold">{path.timeline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Effort:</span>
                  <span className="font-semibold">{path.effort}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="max-w-3xl mx-auto bg-muted/30">
        <CardContent className="p-3 text-center">
          <p className="text-sm italic text-muted-foreground">{slide.note}</p>
        </CardContent>
      </Card>
    </div>
  );
};
