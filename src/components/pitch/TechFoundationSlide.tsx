
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface TechFoundationSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    techStack: Array<{
      layer: string;
      components: string[];
    }>;
    dataAdvantage: string;
  };
}

export const TechFoundationSlide: React.FC<TechFoundationSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>

      <div className="space-y-6">
        {slide.techStack.map((layer, index) => (
          <Card key={index} className="p-6">
            <CardContent>
              <h3 className="text-xl font-bold text-blue-600 mb-4">{layer.layer}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {layer.components.map((component, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">{component}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="text-center">
          <h3 className="text-xl font-bold text-green-800 mb-3">Key Technology Advantage</h3>
          <p className="text-green-700 text-lg">{slide.dataAdvantage}</p>
        </CardContent>
      </Card>
    </div>
  );
};
