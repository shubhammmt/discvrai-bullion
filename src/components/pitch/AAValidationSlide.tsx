import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, DollarSign, Zap } from 'lucide-react';

interface AAValidationSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    validationData: {
      headline: string;
      keyMetrics: Array<{
        metric: string;
        value: string;
        growth: string;
        icon: React.ComponentType<any>;
      }>;
      marketValidation: Array<{
        point: string;
        impact: string;
      }>;
      businessCase: {
        title: string;
        points: string[];
      };
    };
  };
}

export const AAValidationSlide: React.FC<AAValidationSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-4">{slide.subtitle}</p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-2xl font-bold text-blue-800">{slide.validationData.headline}</p>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {slide.validationData.keyMetrics.map((metric, index) => {
          const MetricIcon = metric.icon;
          return (
            <Card key={index} className="p-4 text-center">
              <CardContent className="space-y-2">
                <MetricIcon className="w-8 h-8 mx-auto text-blue-600" />
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                <div className="text-sm font-medium text-gray-700">{metric.metric}</div>
                <div className="text-xs text-green-600 font-medium">{metric.growth}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Market Validation Points */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-blue-600 mb-4">Market Validation & Impact</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {slide.validationData.marketValidation.map((validation, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900">{validation.point}</p>
                <p className="text-sm text-gray-600 mt-1">{validation.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Business Case */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h3 className="text-xl font-bold text-blue-800 mb-3">{slide.validationData.businessCase.title}</h3>
        <div className="space-y-2">
          {slide.validationData.businessCase.points.map((point, index) => (
            <div key={index} className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
              <p className="text-gray-700">{point}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};