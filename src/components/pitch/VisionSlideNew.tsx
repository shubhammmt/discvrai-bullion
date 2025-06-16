
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface VisionSlideNewProps {
  slide: {
    title: string;
    icon: React.ComponentType<any>;
    vision: string;
    goals: string[];
    impact: {
      individual: string;
      societal: string;
      economic: string;
    };
  };
}

export const VisionSlideNew: React.FC<VisionSlideNewProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-purple-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-8">{slide.title}</h2>
      </div>
      
      <Card className="p-8 bg-gradient-to-r from-purple-50 to-blue-50 mb-8">
        <CardContent>
          <p className="text-xl text-center text-gray-800 font-medium leading-relaxed">
            "{slide.vision}"
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {slide.goals.map((goal, index) => (
          <Card key={index} className="p-6">
            <CardContent className="flex items-center gap-4">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <p className="text-gray-700">{goal}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-blue-50">
          <CardContent className="space-y-3">
            <h3 className="text-lg font-bold text-green-600">Individual Impact</h3>
            <p className="text-gray-700">{slide.impact.individual}</p>
          </CardContent>
        </Card>
        <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-purple-50">
          <CardContent className="space-y-3">
            <h3 className="text-lg font-bold text-blue-600">Societal Impact</h3>
            <p className="text-gray-700">{slide.impact.societal}</p>
          </CardContent>
        </Card>
        <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="space-y-3">
            <h3 className="text-lg font-bold text-purple-600">Economic Impact</h3>
            <p className="text-gray-700">{slide.impact.economic}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
