
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface DifferentiationSlideProps {
  slide: {
    title: string;
    icon: React.ComponentType<any>;
    competitors: Array<{
      name: string;
      approach: string;
      limitation: string;
    }>;
    ourAdvantage: {
      title: string;
      points: string[];
    };
  };
}

export const DifferentiationSlide: React.FC<DifferentiationSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-8">{slide.title}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {slide.competitors.map((comp, index) => (
          <Card key={index} className="p-6 border-red-200 bg-red-50">
            <CardContent className="space-y-4">
              <h3 className="text-xl font-bold text-red-600">{comp.name}</h3>
              <p className="text-gray-700"><strong>Approach:</strong> {comp.approach}</p>
              <p className="text-sm text-red-500"><strong>Limitation:</strong> {comp.limitation}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent>
          <h3 className="text-2xl font-bold text-center mb-6 text-green-800">{slide.ourAdvantage.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slide.ourAdvantage.points.map((point, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-gray-700">{point}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
