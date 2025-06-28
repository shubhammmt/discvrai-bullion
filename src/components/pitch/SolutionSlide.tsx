
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface SolutionSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    features: Array<{
      title: string;
      description: string;
      capabilities: string[];
    }>;
  };
}

export const SolutionSlide: React.FC<SolutionSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slide.features.map((feature, index) => (
          <Card key={index} className="p-6">
            <CardContent>
              <h3 className="text-xl font-bold text-blue-600 mb-3">{feature.title}</h3>
              <p className="text-gray-700 mb-4">{feature.description}</p>
              <div className="space-y-2">
                {feature.capabilities.map((capability, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-600">{capability}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
