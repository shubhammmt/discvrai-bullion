
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Users } from 'lucide-react';

interface TeamSlideProps {
  slide: {
    title: string;
    icon: React.ComponentType<any>;
    founder: {
      name: string;
      experience: string;
      points: string[];
    };
    keyStrengths: string[];
    plannedHires: string[];
  };
}

export const TeamSlide: React.FC<TeamSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-8">{slide.title}</h2>
      </div>
      
      {/* Founder Profile */}
      <Card className="p-8 max-w-5xl mx-auto">
        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-600">{slide.founder.name}</h3>
            <p className="text-lg text-gray-600 font-semibold">{slide.founder.experience}</p>
          </div>
          <div className="space-y-4">
            {slide.founder.points.map((point, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-gray-700">{point}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Strengths */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50">
        <CardContent>
          <h3 className="text-xl font-bold text-center mb-6 text-blue-800">Why This Team Can Execute</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slide.keyStrengths.map((strength, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 text-sm">{strength}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Planned Hires */}
      <Card className="p-6">
        <CardContent>
          <h3 className="text-xl font-bold text-center mb-6 text-purple-800">Key Hires Planned</h3>
          <div className="space-y-3">
            {slide.plannedHires.map((hire, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border border-purple-200 rounded-lg">
                <Users className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 text-sm">{hire}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
