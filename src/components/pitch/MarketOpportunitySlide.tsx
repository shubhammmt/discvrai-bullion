
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface MarketOpportunitySlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    marketData: {
      tam: { number: string; label: string; description: string };
      sam: { number: string; label: string; description: string };
      som: { number: string; label: string; description: string };
    };
    validation: string[];
  };
}

export const MarketOpportunitySlide: React.FC<MarketOpportunitySlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-purple-50">
          <CardContent className="space-y-4">
            <h3 className="text-xl font-bold text-blue-600">TAM</h3>
            <div className="text-3xl font-bold text-blue-800">{slide.marketData.tam.number}</div>
            <div className="text-lg font-semibold">{slide.marketData.tam.label}</div>
            <p className="text-gray-600 text-sm">{slide.marketData.tam.description}</p>
          </CardContent>
        </Card>
        <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-blue-50">
          <CardContent className="space-y-4">
            <h3 className="text-xl font-bold text-green-600">SAM</h3>
            <div className="text-3xl font-bold text-green-800">{slide.marketData.sam.number}</div>
            <div className="text-lg font-semibold">{slide.marketData.sam.label}</div>
            <p className="text-gray-600 text-sm">{slide.marketData.sam.description}</p>
          </CardContent>
        </Card>
        <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="space-y-4">
            <h3 className="text-xl font-bold text-purple-600">SOM</h3>
            <div className="text-3xl font-bold text-purple-800">{slide.marketData.som.number}</div>
            <div className="text-lg font-semibold">{slide.marketData.som.label}</div>
            <p className="text-gray-600 text-sm">{slide.marketData.som.description}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-to-r from-gray-50 to-blue-50">
        <CardContent>
          <h3 className="text-xl font-bold text-center mb-4 text-gray-800">Market Validation</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {slide.validation.map((point, index) => (
              <div key={index} className="text-center p-3 bg-white rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-700">{point}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
