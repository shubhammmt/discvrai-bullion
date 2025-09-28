import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface OpportunitySlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    description: string;
    insights: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
}

export const OpportunitySlide: React.FC<OpportunitySlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>
      
      <Card className="p-8 mb-8 bg-gradient-to-r from-orange-50 to-red-50">
        <CardContent>
          <p className="text-xl text-center text-gray-700 leading-relaxed">{slide.description}</p>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slide.insights.map((insight, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl">{insight.icon}</span>
                <h3 className="text-xl font-semibold text-gray-900">{insight.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{insight.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};