
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface GTMSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    phases: Array<{
      phase: string;
      description: string;
      details?: string;
      target: string;
    }>;
  };
}

export const GTMSlide: React.FC<GTMSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {slide.phases.map((phase, index) => (
          <Card key={index} className="p-6">
            <CardContent className="space-y-4">
              <div className="text-2xl font-bold text-blue-600">{index + 1}</div>
              <h3 className="text-lg font-semibold">{phase.phase}</h3>
              <p className="text-gray-600">{phase.description}</p>
              {phase.details && <p className="text-sm text-gray-500">{phase.details}</p>}
              <p className="text-blue-600 font-semibold">{phase.target}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
