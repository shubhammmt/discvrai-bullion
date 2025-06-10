
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PlatformPositioningSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    platformVsProduct: {
      title: string;
      platform: {
        title: string;
        characteristics: string[];
        examples: string[];
      };
      product: {
        title: string;
        characteristics: string[];
        examples: string[];
      };
    };
    whyPlatformWins: {
      title: string;
      advantages: Array<{
        advantage: string;
        description: string;
        example: string;
      }>;
    };
  };
}

export const PlatformPositioningSlide: React.FC<PlatformPositioningSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>

      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-center">{slide.platformVsProduct.title}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-2 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-700">{slide.platformVsProduct.platform.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {slide.platformVsProduct.platform.characteristics.map((characteristic, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span className="text-sm">{characteristic}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-green-200">
                <p className="text-sm font-semibold text-green-700 mb-2">Similar to:</p>
                <p className="text-xs text-green-600">{slide.platformVsProduct.platform.examples.join(', ')}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-700">{slide.platformVsProduct.product.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {slide.platformVsProduct.product.characteristics.map((characteristic, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span className="text-sm">{characteristic}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-red-200">
                <p className="text-sm font-semibold text-red-700 mb-2">Examples:</p>
                <p className="text-xs text-red-600">{slide.platformVsProduct.product.examples.join(', ')}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-6">{slide.whyPlatformWins.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {slide.whyPlatformWins.advantages.map((advantage, index) => (
              <Card key={index} className="p-4">
                <CardContent className="space-y-2">
                  <h4 className="font-semibold text-blue-600">{advantage.advantage}</h4>
                  <p className="text-sm text-gray-600">{advantage.description}</p>
                  <p className="text-xs text-gray-500 italic">Example: {advantage.example}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
