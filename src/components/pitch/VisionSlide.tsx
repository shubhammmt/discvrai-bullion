
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface VisionSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    vision: string;
    metrics?: Array<{
      metric: string;
      value: string;
    }>;
  };
}

export const VisionSlide: React.FC<VisionSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>
      <Card className="p-8 mb-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent>
          <p className="text-xl text-center text-gray-700 leading-relaxed">{slide.vision}</p>
        </CardContent>
      </Card>
      {slide.metrics && slide.metrics.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {slide.metrics.map((metric, index) => (
            <Card key={index} className="text-center p-6">
              <CardContent className="space-y-3">
                <h3 className="text-lg font-semibold text-blue-600">{metric.metric}</h3>
                <p className="text-gray-600">{metric.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
