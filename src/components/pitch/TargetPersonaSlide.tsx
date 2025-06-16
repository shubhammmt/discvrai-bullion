
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface TargetPersonaSlideProps {
  slide: {
    title: string;
    icon: React.ComponentType<any>;
    persona: {
      demographics: {
        age: string;
        income: string;
        location: string;
        role: string;
      };
      behavior: {
        tech: string;
        finance: string;
        goals: string;
        preferences: string;
      };
      painPoints: string[];
    };
  };
}

export const TargetPersonaSlide: React.FC<TargetPersonaSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-8">{slide.title}</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="space-y-4">
              <h3 className="text-xl font-bold text-blue-600">Demographics</h3>
              <div className="space-y-2">
                <p><strong>Age:</strong> {slide.persona.demographics.age}</p>
                <p><strong>Income:</strong> {slide.persona.demographics.income}</p>
                <p><strong>Location:</strong> {slide.persona.demographics.location}</p>
                <p><strong>Role:</strong> {slide.persona.demographics.role}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50">
            <CardContent className="space-y-4">
              <h3 className="text-xl font-bold text-green-600">Behavior</h3>
              <div className="space-y-2">
                <p><strong>Tech:</strong> {slide.persona.behavior.tech}</p>
                <p><strong>Finance:</strong> {slide.persona.behavior.finance}</p>
                <p><strong>Goals:</strong> {slide.persona.behavior.goals}</p>
                <p><strong>Preferences:</strong> {slide.persona.behavior.preferences}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="p-6 h-fit">
          <CardContent className="space-y-4">
            <h3 className="text-xl font-bold text-red-600">Key Pain Points</h3>
            <div className="space-y-3">
              {slide.persona.painPoints.map((pain, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{pain}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
