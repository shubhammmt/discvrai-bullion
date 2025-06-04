
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface BigTechSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    whyBigTechWontWin: Array<{
      reason: string;
      explanation: string;
    }>;
    whyCredWontPivot: {
      title: string;
      points: string[];
    };
    ourAdvantage: {
      title: string;
      points: string[];
    };
  };
}

export const BigTechSlide: React.FC<BigTechSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-red-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Why Big Tech Won't Win */}
        <Card className="p-6">
          <CardContent className="space-y-4">
            <h3 className="text-2xl font-bold text-red-600 mb-4">Why Big Tech Won't Win Here</h3>
            <div className="space-y-4">
              {slide.whyBigTechWontWin.map((item, index) => (
                <div key={index} className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-gray-900">{item.reason}</h4>
                  <p className="text-gray-600 text-sm">{item.explanation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Why CRED Won't Pivot */}
        <Card className="p-6">
          <CardContent className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">{slide.whyCredWontPivot.title}</h3>
            <div className="space-y-3">
              {slide.whyCredWontPivot.points.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600 text-sm">{point}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Our Advantage */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="space-y-4">
          <h3 className="text-2xl font-bold text-green-600 text-center mb-6">{slide.ourAdvantage.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slide.ourAdvantage.points.map((point, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <div className="w-3 h-3 bg-green-600 rounded-full flex-shrink-0"></div>
                <p className="text-gray-700 font-medium">{point}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
