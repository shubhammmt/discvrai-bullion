
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface TargetPersonaSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    persona: {
      demographics: {
        age: string;
        income: string;
        location: string;
        profile: string;
      };
      behavior: string[];
      needs: string[];
      painPoints: string[];
    };
  };
}

export const TargetPersonaSlide: React.FC<TargetPersonaSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-purple-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>

      {/* Demographics */}
      <Card className="p-6 bg-purple-50">
        <CardContent>
          <h3 className="text-xl font-bold text-purple-800 mb-4">Demographics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="font-semibold text-purple-700">Age</div>
              <div className="text-sm">{slide.persona.demographics.age}</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-purple-700">Income</div>
              <div className="text-sm">{slide.persona.demographics.income}</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-purple-700">Location</div>
              <div className="text-sm">{slide.persona.demographics.location}</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-purple-700">Profile</div>
              <div className="text-sm">{slide.persona.demographics.profile}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Behavior, Needs, Pain Points */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <CardContent>
            <h3 className="text-lg font-bold text-blue-600 mb-4">Behavior</h3>
            <div className="space-y-3">
              {slide.persona.behavior.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardContent>
            <h3 className="text-lg font-bold text-green-600 mb-4">Needs</h3>
            <div className="space-y-3">
              {slide.persona.needs.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardContent>
            <h3 className="text-lg font-bold text-red-600 mb-4">Pain Points</h3>
            <div className="space-y-3">
              {slide.persona.painPoints.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
