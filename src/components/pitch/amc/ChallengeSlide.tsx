import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

interface ChallengeSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    scenarios: Array<{
      title: string;
      problem: string;
      pain: string;
    }>;
  };
}

export const ChallengeSlide: React.FC<ChallengeSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-6 overflow-auto">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="text-center">
          <IconComponent className="w-12 h-12 mx-auto mb-3 text-red-600" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{slide.title}</h1>
          <p className="text-lg text-gray-600">{slide.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {slide.scenarios.map((scenario, index) => (
            <Card key={index} className="border-2 border-red-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <h2 className="text-lg font-bold text-red-600">{scenario.title}</h2>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1 text-xs">Problem:</h3>
                    <p className="text-sm text-gray-700">{scenario.problem}</p>
                  </div>
                  
                  <div className="border-t-2 border-red-100 pt-2">
                    <h3 className="font-semibold text-gray-800 mb-1 text-xs">Pain Points:</h3>
                    <p className="text-sm text-gray-700">{scenario.pain}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
