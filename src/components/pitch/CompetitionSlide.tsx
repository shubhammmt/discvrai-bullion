
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface CompetitionSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    competitors: Array<{
      category: string;
      examples: string;
      limitations: string[];
      ourAdvantage: string;
    }>;
    uniquePosition: string;
  };
}

export const CompetitionSlide: React.FC<CompetitionSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-red-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>

      <div className="space-y-6">
        {slide.competitors.map((competitor, index) => (
          <Card key={index} className="p-6">
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{competitor.category}</h3>
                  <p className="text-sm text-gray-600 mb-4">Examples: {competitor.examples}</p>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Limitations:</h4>
                    <div className="space-y-2">
                      {competitor.limitations.map((limitation, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-gray-700">{limitation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Our Advantage:</h4>
                  <p className="text-green-700 font-medium">{competitor.ourAdvantage}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="text-center">
          <h3 className="text-xl font-bold text-blue-800 mb-3">Unique Market Position</h3>
          <p className="text-blue-700 text-lg font-medium">{slide.uniquePosition}</p>
        </CardContent>
      </Card>
    </div>
  );
};
