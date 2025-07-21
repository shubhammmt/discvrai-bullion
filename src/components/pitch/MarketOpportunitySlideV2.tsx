import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface MarketOpportunitySlideV2Props {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    marketData: {
      totalMarket: string;
      description: string;
      breakdown: Array<{
        asset: string;
        value: string;
        growth: string;
      }>;
    };
    userExplosion: Array<{
      metric: string;
      detail: string;
    }>;
    keyInsight: {
      title: string;
      stats: string[];
    };
  };
}

export const MarketOpportunitySlideV2: React.FC<MarketOpportunitySlideV2Props> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-green-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>

      {/* Total Market Size */}
      <Card className="p-6 mb-8 border-2 border-green-200 bg-green-50">
        <CardContent className="text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">{slide.marketData.totalMarket}</div>
          <div className="text-lg text-gray-800">{slide.marketData.description}</div>
        </CardContent>
      </Card>

      {/* Asset Breakdown */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {slide.marketData.breakdown.map((asset, index) => (
          <Card key={index} className="p-4 text-center hover:shadow-lg transition-shadow">
            <CardContent className="space-y-2">
              <div className="text-lg font-semibold text-gray-800">{asset.asset}</div>
              <div className="text-xl font-bold text-blue-600">{asset.value}</div>
              <div className="text-sm text-gray-600">{asset.growth}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User Explosion & Key Insight */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Explosion */}
        <Card className="p-6">
          <CardContent>
            <h3 className="text-2xl font-bold text-blue-600 mb-6 text-center">User Base Explosion</h3>
            <div className="space-y-4">
              {slide.userExplosion.map((user, index) => (
                <div key={index} className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-800">{user.metric}</div>
                  <div className="text-sm text-gray-600">{user.detail}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Insight */}
        <Card className="p-6">
          <CardContent>
            <h3 className="text-2xl font-bold text-red-600 mb-6 text-center">{slide.keyInsight.title}</h3>
            <div className="space-y-4">
              {slide.keyInsight.stats.map((stat, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm">{stat}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};