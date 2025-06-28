
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface UnitEconomicsSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    metrics: {
      cac: string;
      ltv: string;
      ltvCacRatio: string;
      paybackPeriod: string;
      grossMargin: string;
    };
    projections: Array<{
      timeline: string;
      users: string;
      arr: string;
      milestone: string;
    }>;
  };
}

export const UnitEconomicsSlide: React.FC<UnitEconomicsSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-purple-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card className="p-4 text-center">
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{slide.metrics.cac}</div>
            <div className="text-sm text-gray-600">CAC</div>
          </CardContent>
        </Card>
        <Card className="p-4 text-center">
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{slide.metrics.ltv}</div>
            <div className="text-sm text-gray-600">LTV</div>
          </CardContent>
        </Card>
        <Card className="p-4 text-center">
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{slide.metrics.ltvCacRatio}</div>
            <div className="text-sm text-gray-600">LTV:CAC</div>
          </CardContent>
        </Card>
        <Card className="p-4 text-center">
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{slide.metrics.paybackPeriod}</div>
            <div className="text-sm text-gray-600">Payback</div>
          </CardContent>
        </Card>
        <Card className="p-4 text-center">
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{slide.metrics.grossMargin}</div>
            <div className="text-sm text-gray-600">Gross Margin</div>
          </CardContent>
        </Card>
      </div>

      {/* Growth Projections */}
      <div>
        <h3 className="text-2xl font-bold text-center mb-6">Growth Projections</h3>
        <div className="space-y-4">
          {slide.projections.map((projection, index) => (
            <Card key={index} className="p-6">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{projection.timeline}</h4>
                      <p className="text-sm text-gray-600">{projection.milestone}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">{projection.users}</div>
                    <div className="text-lg font-semibold text-green-600">{projection.arr}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
