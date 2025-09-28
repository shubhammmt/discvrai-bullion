import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface ContestFormatsSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    formats: Array<{
      category: string;
      description: string;
      features: string[];
    }>;
  };
}

export const ContestFormatsSlide: React.FC<ContestFormatsSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slide.formats.map((format, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{format.category}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{format.description}</p>
              </div>
              
              <div className="space-y-2">
                {format.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};