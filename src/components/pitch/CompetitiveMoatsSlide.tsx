
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface CompetitiveMoatsSlideProps {
  slide: {
    title: string;
    icon: React.ComponentType<any>;
    moats: Array<{
      type: string;
      icon: React.ComponentType<any>;
      description: string;
      timeline: string;
    }>;
  };
}

export const CompetitiveMoatsSlide: React.FC<CompetitiveMoatsSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-purple-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-8">{slide.title}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slide.moats.map((moat, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <moat.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-purple-600">{moat.type}</h3>
              </div>
              <p className="text-gray-600">{moat.description}</p>
              <div className="text-sm text-blue-600 font-medium">Timeline: {moat.timeline}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
