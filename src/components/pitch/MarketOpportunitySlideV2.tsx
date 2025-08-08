import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface MarketOpportunitySlideV2Props {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    marketStory: {
      headline: string;
      massMarketExplosion: Array<{
        category: string;
        current: string;
        projected2030: string;
        growth: string;
        catalyst: string;
      }>;
      massMarketValidation: string[];
    };
    productGrowthAcrossCategories: {
      investmentProducts: {
        currentUsers: string;
        projected2030: string;
        painPoint: string;
        opportunitySize: string;
      };
      creditProducts: {
        currentUsers: string;
        projected2030: string;
        painPoint: string;
        opportunitySize: string;
      };
      protectionProducts: {
        currentGap: string;
        projected2030: string;
        painPoint: string;
        opportunitySize: string;
      };
    };
    keyInsight: string;
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

      {/* Market Story Headline */}
      <Card className="p-6 mb-8 border-2 border-green-200 bg-green-50">
        <CardContent className="text-center">
          <h3 className="text-2xl font-bold text-green-700 mb-4">{slide.marketStory.headline}</h3>
        </CardContent>
      </Card>

      {/* Mass Market Explosion Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {slide.marketStory.massMarketExplosion.map((category, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <CardContent>
              <h4 className="text-xl font-bold text-blue-600 mb-3">{category.category}</h4>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current:</span>
                  <span className="font-semibold">{category.current}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">2030:</span>
                  <span className="font-semibold text-green-600">{category.projected2030}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Growth:</span>
                  <span className="font-semibold text-purple-600">{category.growth}</span>
                </div>
              </div>
              <div className="pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-600 font-medium">{category.catalyst}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Product Growth Across Categories */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Product Growth Across Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-2 border-blue-200 bg-blue-50">
            <CardContent>
              <h4 className="text-lg font-bold text-blue-600 mb-3">Investment Products</h4>
              <div className="space-y-2 mb-4">
                <div><span className="text-gray-600">Current:</span> <span className="font-semibold">{slide.productGrowthAcrossCategories.investmentProducts.currentUsers}</span></div>
                <div><span className="text-gray-600">2030:</span> <span className="font-semibold text-green-600">{slide.productGrowthAcrossCategories.investmentProducts.projected2030}</span></div>
              </div>
              <div className="text-sm text-gray-600 mb-2"><strong>Pain:</strong> {slide.productGrowthAcrossCategories.investmentProducts.painPoint}</div>
              <div className="text-sm font-medium text-blue-600">{slide.productGrowthAcrossCategories.investmentProducts.opportunitySize}</div>
            </CardContent>
          </Card>

          <Card className="p-6 border-2 border-purple-200 bg-purple-50">
            <CardContent>
              <h4 className="text-lg font-bold text-purple-600 mb-3">Credit Products</h4>
              <div className="space-y-2 mb-4">
                <div><span className="text-gray-600">Current:</span> <span className="font-semibold">{slide.productGrowthAcrossCategories.creditProducts.currentUsers}</span></div>
                <div><span className="text-gray-600">2030:</span> <span className="font-semibold text-green-600">{slide.productGrowthAcrossCategories.creditProducts.projected2030}</span></div>
              </div>
              <div className="text-sm text-gray-600 mb-2"><strong>Pain:</strong> {slide.productGrowthAcrossCategories.creditProducts.painPoint}</div>
              <div className="text-sm font-medium text-purple-600">{slide.productGrowthAcrossCategories.creditProducts.opportunitySize}</div>
            </CardContent>
          </Card>

          <Card className="p-6 border-2 border-orange-200 bg-orange-50">
            <CardContent>
              <h4 className="text-lg font-bold text-orange-600 mb-3">Protection Products</h4>
              <div className="space-y-2 mb-4">
                <div><span className="text-gray-600">Gap:</span> <span className="font-semibold">{slide.productGrowthAcrossCategories.protectionProducts.currentGap}</span></div>
                <div><span className="text-gray-600">2030:</span> <span className="font-semibold text-green-600">{slide.productGrowthAcrossCategories.protectionProducts.projected2030}</span></div>
              </div>
              <div className="text-sm text-gray-600 mb-2"><strong>Pain:</strong> {slide.productGrowthAcrossCategories.protectionProducts.painPoint}</div>
              <div className="text-sm font-medium text-orange-600">{slide.productGrowthAcrossCategories.protectionProducts.opportunitySize}</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mass Market Validation */}
      <Card className="p-6 mb-8">
        <CardContent>
          <h3 className="text-2xl font-bold text-green-600 mb-6 text-center">Mass Market Validation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slide.marketStory.massMarketValidation.map((point, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">{point}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Insight */}
      <Card className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="text-center">
          <h3 className="text-2xl font-bold mb-4">Key Insight</h3>
          <p className="text-lg">{slide.keyInsight}</p>
        </CardContent>
      </Card>
    </div>
  );
};