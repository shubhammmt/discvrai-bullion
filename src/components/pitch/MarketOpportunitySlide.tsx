
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

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
    marketContext: string;
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

      {/* Market Size */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[slide.marketData.tam, slide.marketData.sam, slide.marketData.som].map((market, index) => (
          <Card key={index} className="p-6 text-center">
            <CardContent className="space-y-3">
              <div className="text-4xl font-bold text-blue-600">{market.number}</div>
              <div className="text-xl font-semibold text-gray-800">{market.label}</div>
              <div className="text-sm text-gray-600">{market.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Market Validation */}
      <Card className="p-6">
        <CardContent>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Market Validation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slide.validation.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">{point}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Context */}
      <Card className="p-6 bg-blue-50">
        <CardContent className="text-center">
          <p className="text-lg text-blue-800 font-medium">{slide.marketContext}</p>
        </CardContent>
      </Card>
    </div>
  );
};
