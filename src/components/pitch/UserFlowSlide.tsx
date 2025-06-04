
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface UserFlowSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    steps: Array<{
      step: string;
      title: string;
      description: string;
      details: string[];
      icon: React.ComponentType<any>;
    }>;
  };
}

export const UserFlowSlide: React.FC<UserFlowSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>
      
      <div className="relative">
        {/* Flow Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {slide.steps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <div key={index} className="relative">
                <Card className="p-6 h-full">
                  <CardContent className="space-y-4 text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <StepIcon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-blue-600">{step.step}</div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                    <div className="space-y-2">
                      {step.details.map((detail, i) => (
                        <div key={i} className="flex items-center justify-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          <span className="text-sm text-gray-500">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Arrow to next step */}
                {index < slide.steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-blue-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
        <p className="text-lg text-gray-700 font-semibold">
          <span className="text-blue-600">Average Time:</span> Under 5 minutes from discovery to execution
        </p>
        <p className="text-md text-gray-600 mt-2">
          Traditional process takes 40+ hours • Our AI-powered flow reduces it by 99%
        </p>
      </div>
    </div>
  );
};
