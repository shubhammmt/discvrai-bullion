
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface MarketSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    marketData: Array<{
      amount: string;
      label: string;
      description: string;
    }>;
    samSomBreakdown?: {
      title: string;
      breakdown: Array<{
        metric: string;
        value: string;
        description: string;
        percentage: string;
      }>;
    };
  };
}

export const MarketSlide: React.FC<MarketSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {slide.marketData.map((data, index) => (
          <Card key={index} className="text-center p-6">
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold text-blue-600">{data.amount}</div>
              <div className="text-lg font-semibold">{data.label}</div>
              <div className="text-sm text-gray-600">{data.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {slide.samSomBreakdown && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-center mb-6">{slide.samSomBreakdown.title}</h3>
          <div className="space-y-4">
            {slide.samSomBreakdown.breakdown.map((item, index) => (
              <Card key={index} className="p-4 border-l-4 border-blue-500">
                <CardContent className="flex justify-between items-center space-y-0">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">{item.metric}</h4>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-blue-600">{item.value}</div>
                    <div className="text-sm font-medium text-blue-500">{item.percentage}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
