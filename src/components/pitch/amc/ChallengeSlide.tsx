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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-12">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center">
          <IconComponent className="w-20 h-20 mx-auto mb-6 text-red-600" />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{slide.title}</h1>
          <p className="text-2xl text-gray-600">{slide.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {slide.scenarios.map((scenario, index) => (
            <Card key={index} className="border-2 border-red-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <AlertCircle className="w-10 h-10 text-red-600" />
                  <h2 className="text-2xl font-bold text-red-600">{scenario.title}</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Problem:</h3>
                    <p className="text-lg text-gray-700">{scenario.problem}</p>
                  </div>
                  
                  <div className="border-t-2 border-red-100 pt-4">
                    <h3 className="font-semibold text-gray-800 mb-2">Pain Points:</h3>
                    <p className="text-lg text-gray-700">{scenario.pain}</p>
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
