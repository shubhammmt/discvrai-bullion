
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ExecutionExampleSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    example: {
      title: string;
      steps: Array<{
        step: string;
        description: string;
        screenshot: string;
        time: string;
      }>;
    };
  };
}

export const ExecutionExampleSlide: React.FC<ExecutionExampleSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-purple-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>
      
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardContent>
          <h3 className="text-2xl font-bold text-center mb-8 text-purple-800">{slide.example.title}</h3>
          
          <div className="space-y-6">
            {slide.example.steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-purple-800 mb-2">{step.step}</h4>
                  <p className="text-gray-700 mb-2">{step.description}</p>
                  <p className="text-sm text-gray-600 italic mb-2">"{step.screenshot}"</p>
                  <div className="text-xs text-purple-600 font-medium">⏱️ {step.time}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center bg-purple-100 p-4 rounded-lg">
            <p className="text-purple-800 font-semibold">
              Total Time: {slide.example.steps.reduce((acc: any, step: any) => acc + " + " + step.time, "").slice(3)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
