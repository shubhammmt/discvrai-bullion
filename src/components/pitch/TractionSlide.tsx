
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface TractionSlideProps {
  slide: {
    title: string;
    icon: React.ComponentType<any>;
    metrics: Array<{
      metric: string;
      value: string;
      growth: string;
    }>;
  };
}

export const TractionSlide: React.FC<TractionSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-8">{slide.title}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {slide.metrics.map((metric, index) => (
          <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-dashed border-2 border-blue-300">
            <CardContent className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">{metric.metric}</h3>
              <div className="text-3xl font-bold text-blue-600">{metric.value}</div>
              <p className="text-gray-600 text-sm italic">{metric.growth}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
