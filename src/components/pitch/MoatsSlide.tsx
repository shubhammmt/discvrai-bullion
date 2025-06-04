
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface MoatsSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    effects: Array<{
      title: string;
      description: string;
    }>;
  };
}

export const MoatsSlide: React.FC<MoatsSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-purple-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slide.effects.map((effect, index) => (
          <Card key={index} className="p-6">
            <CardContent className="space-y-3">
              <h3 className="text-lg font-semibold text-purple-600">{effect.title}</h3>
              <p className="text-gray-600">{effect.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
