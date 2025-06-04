
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface SolutionSlideProps {
  slide: {
    title: string;
    icon: React.ComponentType<any>;
    features: Array<{
      title: string;
      description: string;
    }>;
  };
}

export const SolutionSlide: React.FC<SolutionSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-green-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-8">{slide.title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {slide.features.map((feature, index) => (
          <Card key={index} className="p-6 h-full">
            <CardContent className="space-y-3 h-full flex flex-col justify-between">
              <h3 className="text-lg font-semibold text-green-600">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
        {/* Add empty card if odd number of features for symmetry */}
        {slide.features.length % 2 !== 0 && (
          <Card className="p-6 h-full opacity-0">
            <CardContent className="space-y-3">
              <div></div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
