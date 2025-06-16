
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface UnitEconomicsSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    economics: {
      cac: { value: string; description: string };
      ltv: { value: string; description: string };
      ratio: { value: string; description: string };
      payback: { value: string; description: string };
    };
    breakdown: {
      title: string;
      components: Array<{
        source: string;
        amount: string;
        description: string;
      }>;
    };
  };
}

export const UnitEconomicsSlide: React.FC<UnitEconomicsSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-green-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 text-center bg-gradient-to-br from-red-50 to-orange-50">
          <CardContent className="space-y-3">
            <h3 className="text-lg font-bold text-red-600">CAC</h3>
            <div className="text-3xl font-bold text-red-800">{slide.economics.cac.value}</div>
            <p className="text-sm text-gray-600">{slide.economics.cac.description}</p>
          </CardContent>
        </Card>
        <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-blue-50">
          <CardContent className="space-y-3">
            <h3 className="text-lg font-bold text-green-600">LTV</h3>
            <div className="text-3xl font-bold text-green-800">{slide.economics.ltv.value}</div>
            <p className="text-sm text-gray-600">{slide.economics.ltv.description}</p>
          </CardContent>
        </Card>
        <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-purple-50">
          <CardContent className="space-y-3">
            <h3 className="text-lg font-bold text-blue-600">LTV/CAC</h3>
            <div className="text-3xl font-bold text-blue-800">{slide.economics.ratio.value}</div>
            <p className="text-sm text-gray-600">{slide.economics.ratio.description}</p>
          </CardContent>
        </Card>
        <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="space-y-3">
            <h3 className="text-lg font-bold text-purple-600">Payback</h3>
            <div className="text-3xl font-bold text-purple-800">{slide.economics.payback.value}</div>
            <p className="text-sm text-gray-600">{slide.economics.payback.description}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent>
          <h3 className="text-2xl font-bold text-center mb-6 text-green-800">{slide.breakdown.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slide.breakdown.components.map((comp, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-white rounded-lg">
                <div>
                  <p className="font-semibold">{comp.source}</p>
                  <p className="text-sm text-gray-600">{comp.description}</p>
                </div>
                <div className="text-xl font-bold text-green-600">{comp.amount}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
