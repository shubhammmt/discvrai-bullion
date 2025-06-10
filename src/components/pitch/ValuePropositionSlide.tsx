
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ValuePropositionSlideProps {
  slide: {
    title: string;
    valueProps: Array<{
      title: string;
      description: string;
      icon: React.ComponentType<any>;
    }>;
  };
}

export const ValuePropositionSlide: React.FC<ValuePropositionSlideProps> = ({ slide }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">{slide.title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {slide.valueProps.map((prop, index) => {
          const IconComponent = prop.icon;
          return (
            <Card key={index} className="text-center p-6">
              <CardContent className="space-y-4">
                <IconComponent className="w-12 h-12 mx-auto text-blue-600" />
                <div className="text-xl font-semibold">{prop.title}</div>
                <div className="text-gray-600">{prop.description}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
