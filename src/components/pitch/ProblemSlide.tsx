
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ProblemSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    keyStats: Array<{
      number: string;
      label: string;
      description: string;
    }>;
    painPoints: string[];
  };
}

export const ProblemSlide: React.FC<ProblemSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-red-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {slide.keyStats.map((stat, index) => (
          <Card key={index} className="p-6 text-center">
            <CardContent className="space-y-2">
              <div className="text-3xl font-bold text-red-600">{stat.number}</div>
              <div className="text-lg font-semibold text-gray-800">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pain Points */}
      <Card className="p-6">
        <CardContent>
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Key Pain Points</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slide.painPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">{point}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
