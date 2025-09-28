import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface AudienceSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    profile: string;
    stats: Array<{
      metric: string;
      value: string;
      growth: string;
    }>;
  };
}

export const AudienceSlide: React.FC<AudienceSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>
      
      <Card className="p-8 mb-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent>
          <p className="text-xl text-center text-gray-700 leading-relaxed">{slide.profile}</p>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {slide.stats.map((stat, index) => (
          <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
            <CardContent className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">{stat.metric}</h3>
              <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
              <p className="text-gray-600 text-sm">{stat.growth}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};