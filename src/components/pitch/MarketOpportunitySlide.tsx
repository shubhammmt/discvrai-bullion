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
    marketContext?: string;
  };
}

export const MarketOpportunitySlide: React.FC<MarketOpportunitySlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>
      
      {/* Market Context */}
      {slide.marketContext && (
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 mb-8">
          <CardContent>
            <p className="text-lg text-center text-blue-800 font-medium">
              {slide.marketContext}
            </p>
          </CardContent>
        </Card>
      )}

      {/* TAM/SAM/SOM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center p-6 border-2 border-blue-200">
          <CardContent className="space-y-4">
            <div className="text-4xl font-bold text-blue-600">{slide.marketData.tam.number}</div>
            <div className="text-lg font-semibold">{slide.marketData.tam.label}</div>
            <div className="text-sm text-gray-600">{slide.marketData.tam.description}</div>
          </CardContent>
        </Card>
        
        <Card className="text-center p-6 border-2 border-green-200">
          <CardContent className="space-y-4">
            <div className="text-4xl font-bold text-green-600">{slide.marketData.sam.number}</div>
            <div className="text-lg font-semibold">{slide.marketData.sam.label}</div>
            <div className="text-sm text-gray-600">{slide.marketData.sam.description}</div>
          </CardContent>
        </Card>
        
        <Card className="text-center p-6 border-2 border-purple-200">
          <CardContent className="space-y-4">
            <div className="text-4xl font-bold text-purple-600">{slide.marketData.som.number}</div>
            <div className="text-lg font-semibold">{slide.marketData.som.label}</div>
            <div className="text-sm text-gray-600">{slide.marketData.som.description}</div>
          </CardContent>
        </Card>
      </div>

      {/* Validation Points */}
      <Card className="p-6">
        <CardContent>
          <h3 className="text-xl font-bold text-center mb-6 text-gray-800">Market Validation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slide.validation.map((point, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-gray-700">{point}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
