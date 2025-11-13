import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Search, Target, TrendingUp } from 'lucide-react';

interface ContentDistributionSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    contentProduction: string[];
    seoDiscovery: string[];
    conversionPath: string[];
    timeline: Array<{
      period: string;
      result: string;
    }>;
    benefits: string[];
    bottomLine: string;
  };
}

export const ContentDistributionSlide: React.FC<ContentDistributionSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-5 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-3">
        <div className="text-center">
          <IconComponent className="w-10 h-10 mx-auto mb-2 text-purple-600" />
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{slide.title}</h1>
          <p className="text-base text-gray-600">{slide.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Card className="border-2 border-purple-200 shadow-lg">
            <CardContent className="p-3 space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-purple-600" />
                <h3 className="text-sm font-bold text-purple-600">Content Production</h3>
              </div>
              <ul className="space-y-1">
                {slide.contentProduction.map((item, index) => (
                  <li key={index} className="text-xs text-gray-700 flex items-start">
                    <span className="text-purple-600 mr-1.5">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 shadow-lg">
            <CardContent className="p-3 space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Search className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-blue-600">SEO & Discovery</h3>
              </div>
              <ul className="space-y-1">
                {slide.seoDiscovery.map((item, index) => (
                  <li key={index} className="text-xs text-gray-700 flex items-start">
                    <span className="text-blue-600 mr-1.5">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 shadow-lg">
            <CardContent className="p-3 space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-green-600" />
                <h3 className="text-sm font-bold text-green-600">Conversion Path</h3>
              </div>
              <ul className="space-y-1">
                {slide.conversionPath.map((item, index) => (
                  <li key={index} className="text-xs text-gray-700 flex items-start">
                    <span className="text-green-600 mr-1.5">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <Card className="border-2 border-indigo-200 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
              <h2 className="text-lg font-bold text-indigo-600">Timeline to Multi-Million MAUs</h2>
            </div>
            <div className="space-y-2">
              {slide.timeline.map((phase, index) => (
                <div key={index} className="flex items-center gap-3 bg-indigo-50 p-2 rounded-lg">
                  <div className="text-sm font-bold text-indigo-600 min-w-[100px]">{phase.period}</div>
                  <div className="text-gray-700 text-xs">{phase.result}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card className="border-2 border-pink-200 shadow-lg">
          <CardContent className="p-4">
            <h2 className="text-base font-bold text-pink-600 mb-3">Your Benefits:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {slide.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-pink-600 mr-2 text-sm">✓</span>
                  <span className="text-gray-700 text-xs">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bottom Line */}
        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 border-0">
          <CardContent className="p-4 text-center">
            <p className="text-base font-bold text-white">{slide.bottomLine}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
