import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface RoadmapSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    phases: Array<{
      phase: string;
      timeline: string;
      objective: string;
      metrics: string;
    }>;
  };
}

export const RoadmapSlide: React.FC<RoadmapSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-green-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>
      
      <div className="space-y-6">
        {slide.phases.map((phase, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-green-500">
            <CardContent className="space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-gray-800">{phase.phase}</h3>
                <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  {phase.timeline}
                </span>
              </div>
              <p className="text-gray-700 font-medium">{phase.objective}</p>
              <p className="text-gray-600 text-sm italic">Key Metrics: {phase.metrics}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};