
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

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
      metrics: string;
    }>;
  };
}

export const GoToMarketSlide: React.FC<GoToMarketSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-orange-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>

      <div className="space-y-6">
        {slide.phases.map((phase, index) => (
          <Card key={index} className="p-6">
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{phase.phase}</h3>
                  <p className="text-sm text-gray-600">{phase.timeline} • Target: {phase.target}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Strategy</h4>
                  <div className="space-y-2">
                    {phase.strategy.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-gray-700">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Success Metrics</h4>
                  <p className="text-green-700 font-medium">{phase.metrics}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
