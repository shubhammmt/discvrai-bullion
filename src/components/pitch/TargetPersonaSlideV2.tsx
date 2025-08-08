import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface TargetPersonaSlideV2Props {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    personas: Array<{
      title: string;
      size: string;
      profile: string;
      demographics: string;
      keyBehaviors: string[];
      corePainPoint: string;
      productNeed: string;
      revenue: string;
      gtmApproach: string;
    }>;
    totalTAM: string;
    keyInsight: string;
  };
}

export const TargetPersonaSlideV2: React.FC<TargetPersonaSlideV2Props> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-purple-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>

      {/* Personas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {slide.personas.map((persona, index) => (
          <Card key={index} className="p-6 hover:shadow-xl transition-shadow border-l-4 border-purple-500">
            <CardContent className="space-y-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-purple-600">{persona.title}</h3>
                  <p className="text-lg font-semibold text-gray-800">{persona.size}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{persona.revenue}</div>
                  <div className="text-sm text-gray-600">per user</div>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-700 font-medium">{persona.profile}</p>
                <p className="text-sm text-gray-600 mt-2">{persona.demographics}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Key Behaviors:</h4>
                <div className="space-y-2">
                  {persona.keyBehaviors?.map((behavior, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-600">{behavior}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-4 p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                <h4 className="text-sm font-semibold text-gray-800 mb-1">Core Pain Point:</h4>
                <p className="text-sm text-red-700 italic">{persona.corePainPoint}</p>
              </div>
              
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">Product Need:</h4>
                  <p className="text-sm text-gray-600">{persona.productNeed}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">GTM Approach:</h4>
                  <p className="text-sm text-gray-600">{persona.gtmApproach}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Total TAM & Key Insight */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 border-2 border-green-200 bg-green-50">
          <CardContent className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Total Addressable Market</h3>
            <div className="text-4xl font-bold text-green-600 mb-2">{slide.totalTAM}</div>
            <div className="text-lg text-gray-700">Combined opportunity across all cohorts</div>
          </CardContent>
        </Card>

        <Card className="p-6 border-2 border-blue-200 bg-blue-50">
          <CardContent className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Market Reality</h3>
            <p className="text-lg text-gray-700 leading-relaxed">{slide.keyInsight}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};