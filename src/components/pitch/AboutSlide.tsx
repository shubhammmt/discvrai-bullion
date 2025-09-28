import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface AboutSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    description: string;
    positioning: string;
    features: string[];
  };
}

export const AboutSlide: React.FC<AboutSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <CardContent className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">What We Do</h3>
            <p className="text-gray-600 leading-relaxed">{slide.description}</p>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-medium">{slide.positioning}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="p-6">
          <CardContent className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">Our Features</h3>
            <div className="space-y-3">
              {slide.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};