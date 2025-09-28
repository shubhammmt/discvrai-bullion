import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Star } from 'lucide-react';

interface PricingSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    packages: Array<{
      tier: string;
      price: string;
      duration: string;
      features: string[];
      highlight: boolean;
    }>;
  };
}

export const PricingSlide: React.FC<PricingSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {slide.packages.map((pkg, index) => (
          <Card 
            key={index} 
            className={`p-6 relative ${
              pkg.highlight 
                ? 'border-2 border-blue-500 shadow-lg scale-105' 
                : 'border border-gray-200'
            }`}
          >
            {pkg.highlight && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  Most Popular
                </div>
              </div>
            )}
            <CardContent className="space-y-4">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">{pkg.tier}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-blue-600">{pkg.price}</span>
                  <span className="text-gray-600 ml-1">/{pkg.duration}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                {pkg.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
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