
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Globe, Users } from 'lucide-react';

interface MarketSizeSlideProps {
  slide: {
    title: string;
    marketSize: string;
    growthRate: string;
    keyTrends: string[];
  };
}

export const MarketSizeSlide: React.FC<MarketSizeSlideProps> = ({ slide }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <Globe className="w-16 h-16 mx-auto mb-4 text-green-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-8">{slide.title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
          <CardContent className="text-center space-y-4">
            <Users className="w-12 h-12 mx-auto text-green-600" />
            <div className="text-4xl font-bold text-green-600">{slide.marketSize}</div>
            <div className="text-xl font-semibold text-gray-800">Total Market Size</div>
          </CardContent>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="text-center space-y-4">
            <TrendingUp className="w-12 h-12 mx-auto text-blue-600" />
            <div className="text-4xl font-bold text-blue-600">{slide.growthRate}</div>
            <div className="text-xl font-semibold text-gray-800">Growth Rate</div>
          </CardContent>
        </Card>
      </div>

      <Card className="p-6">
        <CardContent>
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">Key Market Trends</h3>
          <div className="space-y-4">
            {slide.keyTrends.map((trend, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div className="text-lg text-gray-800">{trend}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
