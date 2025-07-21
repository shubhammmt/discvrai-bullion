import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface MarketSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    marketSize: {
      tam: string;
      tamDetails: string;
      sam: string;
      samDetails: string;
      som: string;
      somDetails: string;
    };
    traction: Array<{
      metric: string;
      value: string;
      growth: string;
    }>;
    competitors: string[];
  };
}

export const MarketSlide: React.FC<MarketSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-green-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>

      {/* Market Size */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 text-center border-2 border-green-200">
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold text-green-600">{slide.marketSize.tam}</div>
            <div className="text-lg font-semibold text-gray-800">TAM</div>
            <div className="text-sm text-gray-600">{slide.marketSize.tamDetails}</div>
          </CardContent>
        </Card>
        <Card className="p-6 text-center border-2 border-blue-200">
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold text-blue-600">{slide.marketSize.sam}</div>
            <div className="text-lg font-semibold text-gray-800">SAM</div>
            <div className="text-sm text-gray-600">{slide.marketSize.samDetails}</div>
          </CardContent>
        </Card>
        <Card className="p-6 text-center border-2 border-purple-200">
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold text-purple-600">{slide.marketSize.som}</div>
            <div className="text-lg font-semibold text-gray-800">SOM</div>
            <div className="text-sm text-gray-600">{slide.marketSize.somDetails}</div>
          </CardContent>
        </Card>
      </div>

      {/* Traction & Competitors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Traction Metrics */}
        <Card className="p-6">
          <CardContent>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Proven Traction</h3>
            <div className="space-y-4">
              {slide.traction.map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <div className="text-lg font-semibold text-gray-800">{metric.metric}</div>
                    <div className="text-sm text-gray-600">{metric.growth}</div>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{metric.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Competitive Landscape */}
        <Card className="p-6">
          <CardContent>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Market Validation</h3>
            <div className="space-y-4">
              {slide.competitors.map((competitor, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{competitor}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};