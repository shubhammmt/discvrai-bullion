
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ProblemSlideProps {
  slide: {
    title: string;
    icon: React.ComponentType<any>;
    stats: Array<{
      number: string;
      label: string;
      description: string;
    }>;
  };
}

export const ProblemSlide: React.FC<ProblemSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-red-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-8">{slide.title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {slide.stats.map((stat, index) => (
          <Card key={index} className="text-center p-6">
            <CardContent className="space-y-4">
              <div className="text-4xl font-bold text-red-600">{stat.number}</div>
              <div className="text-xl font-semibold">{stat.label}</div>
              <div className="text-gray-600">{stat.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
