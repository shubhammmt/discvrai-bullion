
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
      icon: React.ComponentType<any>;
      benefit: string;
    }>;
    solutionDifferentiators?: {
      title: string;
      comparisons: string[];
    };
    platformMetrics?: {
      integrations: string;
      coverage: string;
      speed: string;
      accuracy: string;
    };
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

      {/* 4 Symmetrical Solution Blocks */}
      <div className="grid grid-cols-2 gap-6">
        {slide.features.map((feature, index) => {
          const FeatureIcon = feature.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <FeatureIcon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-4">{feature.description}</p>
                
                <div className="space-y-2 mb-4">
                  {feature.capabilities.map((capability, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-600">{capability}</p>
                    </div>
                  ))}
                </div>
                
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-sm font-medium text-blue-600">{feature.benefit}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Differentiators Section */}
      {slide.solutionDifferentiators && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4">{slide.solutionDifferentiators.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {slide.solutionDifferentiators.comparisons.map((comparison, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">{comparison}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
