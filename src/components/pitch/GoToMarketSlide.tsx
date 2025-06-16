
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface GoToMarketSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    phases: Array<{
      phase: string;
      timeline: string;
      target: string;
      strategy: string[];
    }>;
  };
}

export const GoToMarketSlide: React.FC<GoToMarketSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>
      
      <div className="space-y-6">
        {slide.phases.map((phase, index) => (
          <Card key={index} className="p-6">
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-600">{phase.phase}</h3>
                  <p className="text-gray-600">{phase.timeline} • Target: {phase.target}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {phase.strategy.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-gray-700">{item}</p>
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
