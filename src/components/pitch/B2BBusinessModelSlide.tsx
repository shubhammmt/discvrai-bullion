import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface B2BBusinessModelSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    marketSize: {
      global: string;
      growth: string;
      opportunity: string;
    };
    revenueStreams: Array<{
      segment: string;
      description: string;
      pricing: string;
      marketSize: string;
      timeline: string;
    }>;
    competitiveAdvantage: {
      title: string;
      advantages: string[];
    };
    projections: {
      year3Target: string;
      revenueBreakdown: string;
      exitValuation: string;
    };
  };
}

export const B2BBusinessModelSlide: React.FC<B2BBusinessModelSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <IconComponent className="w-12 h-12 mx-auto mb-3 text-blue-600" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-lg text-gray-600 mb-6">{slide.subtitle}</p>
      </div>

      {/* Market Size */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <h4 className="text-lg font-bold text-blue-800">{slide.marketSize.global}</h4>
              <p className="text-sm text-blue-600">Global B2B Fintech Market</p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-blue-800">{slide.marketSize.growth}</h4>
              <p className="text-sm text-blue-600">CAGR Growth Rate</p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-blue-800">{slide.marketSize.opportunity}</h4>
              <p className="text-sm text-blue-600">Immediate Opportunity</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Streams */}
      <div>
        <h3 className="text-xl font-bold text-center mb-4">Enterprise Revenue Streams</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {slide.revenueStreams.map((stream, index) => (
            <Card key={index} className="p-4">
              <CardContent>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-gray-900 mb-1">{stream.segment}</h4>
                    <p className="text-sm text-gray-700 mb-2">{stream.description}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Pricing:</span>
                        <span className="text-xs font-semibold text-green-600">{stream.pricing}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Market:</span>
                        <span className="text-xs font-semibold text-blue-600">{stream.marketSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Timeline:</span>
                        <span className="text-xs font-semibold text-purple-600">{stream.timeline}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Competitive Advantage & Projections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <CardContent>
            <h3 className="text-lg font-bold text-green-600 mb-3">{slide.competitiveAdvantage.title}</h3>
            <div className="space-y-2">
              {slide.competitiveAdvantage.advantages.map((advantage, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">{advantage}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardContent>
            <h3 className="text-lg font-bold text-green-700 mb-3">Financial Projections</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-2xl font-bold text-green-600">{slide.projections.year3Target}</h4>
                <p className="text-sm text-green-700">Year 3 B2B ARR Target</p>
              </div>
              <div>
                <p className="text-sm text-gray-700 mb-1">{slide.projections.revenueBreakdown}</p>
              </div>
              <div className="pt-2 border-t border-green-200">
                <h4 className="text-lg font-bold text-green-600">{slide.projections.exitValuation}</h4>
                <p className="text-sm text-green-700">Potential Exit Valuation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};