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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <IconComponent className="w-20 h-20 mx-auto mb-6 text-purple-600" />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{slide.title}</h1>
          <p className="text-2xl text-gray-600">{slide.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-2 border-purple-200 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-purple-600" />
                <h3 className="text-xl font-bold text-purple-600">Content Production</h3>
              </div>
              <ul className="space-y-2">
                {slide.contentProduction.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <span className="text-purple-600 mr-2">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Search className="w-8 h-8 text-blue-600" />
                <h3 className="text-xl font-bold text-blue-600">SEO & Discovery</h3>
              </div>
              <ul className="space-y-2">
                {slide.seoDiscovery.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <span className="text-blue-600 mr-2">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-bold text-green-600">Conversion Path</h3>
              </div>
              <ul className="space-y-2">
                {slide.conversionPath.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <span className="text-green-600 mr-2">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <Card className="border-2 border-indigo-200 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-10 h-10 text-indigo-600" />
              <h2 className="text-3xl font-bold text-indigo-600">Timeline to Multi-Million MAUs</h2>
            </div>
            <div className="space-y-4">
              {slide.timeline.map((phase, index) => (
                <div key={index} className="flex items-center gap-4 bg-indigo-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-600 min-w-[120px]">{phase.period}</div>
                  <div className="text-gray-700">{phase.result}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card className="border-2 border-pink-200 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">Your Benefits:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {slide.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-pink-600 mr-3 text-xl">✓</span>
                  <span className="text-gray-700 text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bottom Line */}
        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 border-0">
          <CardContent className="p-8 text-center">
            <p className="text-2xl font-bold text-white">{slide.bottomLine}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
