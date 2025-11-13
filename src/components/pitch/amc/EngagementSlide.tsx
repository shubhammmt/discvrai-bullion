import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Zap, Gift } from 'lucide-react';

interface EngagementSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    campaigns: Array<{
      type: string;
      examples: string[];
    }>;
    outcomes: string[];
    integration: string[];
    bottomLine: string;
  };
}

export const EngagementSlide: React.FC<EngagementSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;
  const icons = [Trophy, Zap, Gift];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <IconComponent className="w-20 h-20 mx-auto mb-6 text-yellow-600" />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{slide.title}</h1>
          <p className="text-2xl text-gray-600">{slide.subtitle}</p>
        </div>

        {/* Campaign Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {slide.campaigns.map((campaign, index) => {
            const Icon = icons[index];
            return (
              <Card key={index} className="border-2 border-yellow-200 shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-8 h-8 text-yellow-600" />
                    <h3 className="text-lg font-bold text-yellow-600">{campaign.type}</h3>
                  </div>
                  <ul className="space-y-2">
                    {campaign.examples.map((example, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start">
                        <span className="text-yellow-600 mr-2">●</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Outcomes */}
        <Card className="border-2 border-green-200 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-green-600 mb-6">Outcomes:</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {slide.outcomes.map((outcome, index) => (
                <div key={index} className="text-center bg-green-50 p-4 rounded-lg">
                  <p className="text-gray-700 font-medium">{outcome}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Integration */}
        <Card className="border-2 border-blue-200 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">Integration:</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {slide.integration.map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2 text-lg">✓</span>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bottom Line */}
        <Card className="bg-gradient-to-r from-yellow-600 to-orange-600 border-0">
          <CardContent className="p-8 text-center">
            <p className="text-2xl font-bold text-white">{slide.bottomLine}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
