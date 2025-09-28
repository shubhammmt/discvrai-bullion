import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ValueSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    description?: string;
    benefits: Array<{
      title: string;
      description: string;
      icon: React.ComponentType<any> | string;
    }>;
  };
}

export const ValueSlide: React.FC<ValueSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>
      
      {slide.description && (
        <Card className="p-8 mb-8 bg-gradient-to-r from-green-50 to-blue-50">
          <CardContent>
            <p className="text-xl text-center text-gray-700 leading-relaxed">{slide.description}</p>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {slide.benefits.map((benefit, index) => {
          const BenefitIcon = typeof benefit.icon === 'string' ? null : benefit.icon;
          return (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                {BenefitIcon ? (
                  <BenefitIcon className="w-12 h-12 mx-auto text-blue-600" />
                ) : (
                  <span className="text-3xl">{typeof benefit.icon === 'string' ? benefit.icon : ''}</span>
                )}
                <h3 className="text-xl font-semibold text-gray-800">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};