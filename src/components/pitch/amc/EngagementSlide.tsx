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
    <div className="h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 p-5 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-3">
        <div className="text-center">
          <IconComponent className="w-10 h-10 mx-auto mb-2 text-yellow-600" />
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{slide.title}</h1>
          <p className="text-base text-gray-600">{slide.subtitle}</p>
        </div>

        {/* Campaign Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {slide.campaigns.map((campaign, index) => {
            const Icon = icons[index];
            return (
              <Card key={index} className="border-2 border-yellow-200 shadow-lg">
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5 text-yellow-600" />
                    <h3 className="text-xs font-bold text-yellow-600">{campaign.type}</h3>
                  </div>
                  <ul className="space-y-1">
                    {campaign.examples.map((example, idx) => (
                      <li key={idx} className="text-xs text-gray-700 flex items-start">
                        <span className="text-yellow-600 mr-1.5">●</span>
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
          <CardContent className="p-4">
            <h2 className="text-lg font-bold text-green-600 mb-3">Outcomes:</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {slide.outcomes.map((outcome, index) => (
                <div key={index} className="text-center bg-green-50 p-2 rounded-lg">
                  <p className="text-gray-700 font-medium text-xs">{outcome}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Integration */}
        <Card className="border-2 border-blue-200 shadow-lg">
          <CardContent className="p-4">
            <h2 className="text-lg font-bold text-blue-600 mb-3">Integration:</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {slide.integration.map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-blue-600 mr-1.5 text-sm">✓</span>
                  <span className="text-gray-700 text-xs">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bottom Line */}
        <Card className="bg-gradient-to-r from-yellow-600 to-orange-600 border-0">
          <CardContent className="p-4 text-center">
            <p className="text-base font-bold text-white">{slide.bottomLine}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
