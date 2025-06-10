
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface B2BBusinessSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    b2bModels: Array<{
      model: string;
      description: string;
      revenue: string;
      timeframe: string;
      advantages: string[];
    }>;
    whyB2B: {
      title: string;
      points: string[];
    };
    implementation: {
      title: string;
      phases: Array<{
        phase: string;
        description: string;
        timeline: string;
      }>;
    };
  };
}

export const B2BBusinessSlide: React.FC<B2BBusinessSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>

      {/* B2B Models */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {slide.b2bModels.map((model, index) => (
          <Card key={index} className="p-6">
            <CardContent className="space-y-4">
              <h3 className="text-xl font-bold text-blue-600">{model.model}</h3>
              <p className="text-gray-700">{model.description}</p>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-green-800 font-semibold">{model.revenue}</p>
                <p className="text-green-600 text-sm">{model.timeframe}</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-gray-800">Key Advantages:</p>
                <ul className="list-disc list-inside space-y-1">
                  {model.advantages.map((advantage, i) => (
                    <li key={i} className="text-sm text-gray-600">{advantage}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Why B2B */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <CardContent>
          <h3 className="text-xl font-bold text-blue-800 mb-4">{slide.whyB2B.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slide.whyB2B.points.map((point, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <p className="text-blue-700">{point}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Implementation */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">{slide.implementation.title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {slide.implementation.phases.map((phase, index) => (
            <Card key={index} className="p-4 border-l-4 border-l-orange-500">
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <h4 className="font-semibold">{phase.phase}</h4>
                </div>
                <p className="text-gray-600 text-sm">{phase.description}</p>
                <p className="text-orange-600 font-medium text-sm">{phase.timeline}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
