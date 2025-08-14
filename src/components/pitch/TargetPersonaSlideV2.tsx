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
      demographics: {
        age: string;
        income: string;
        investableAssets: string;
        monthlyInvestable: string;
        location: string;
      };
      keyBehaviors: string[];
      painPoints: string[];
      productNeed: string;
      revenue: string;
      gtmApproach: string;
      howDiscvrSolves: string[];
    }>;
    totalTAM: string;
    keyInsight: string;
  };
}

export const TargetPersonaSlideV2: React.FC<TargetPersonaSlideV2Props> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <IconComponent className="w-12 h-12 mx-auto mb-3 text-purple-600" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-lg text-gray-600 mb-6">{slide.subtitle}</p>
      </div>

      {/* Personas - Optimized for viewport */}
      <div className="space-y-6">
        {slide.personas.map((persona, index) => (
          <Card key={index} className="p-6 hover:shadow-xl transition-shadow border-l-4 border-purple-500">
            <CardContent>
              {/* Header Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-purple-600 mb-1">{persona.title}</h3>
                  <p className="text-lg font-semibold text-gray-800 mb-3">{persona.size}</p>
                  <p className="text-gray-700 font-medium">{persona.profile}</p>
                </div>
                
                {/* Demographics */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Demographics</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div><strong>Age:</strong> {persona.demographics.age}</div>
                    <div><strong>Income:</strong> {persona.demographics.income}</div>
                    <div><strong>Assets:</strong> {persona.demographics.investableAssets}</div>
                    <div><strong>Monthly:</strong> {persona.demographics.monthlyInvestable}</div>
                    <div className="col-span-2"><strong>Location:</strong> {persona.demographics.location}</div>
                  </div>
                </div>
              </div>

              {/* Content in 3 columns */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Key Behaviors */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Key Behaviors</h4>
                  <div className="space-y-2">
                    {persona.keyBehaviors?.map((behavior, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-xs text-gray-600 leading-relaxed">{behavior}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Pain Points */}
                <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Key Pain Points</h4>
                  <div className="space-y-2">
                    {persona.painPoints?.map((painPoint, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-xs text-red-700 leading-relaxed">{painPoint}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Need & GTM */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Product Need</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{persona.productNeed}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">GTM Approach</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{persona.gtmApproach}</p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded border-l-2 border-blue-300">
                    <div className="text-xs font-semibold text-blue-800">{persona.revenue}</div>
                  </div>
                </div>
              </div>
              
              {/* How DISCVR Solves - Full Width */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-800 mb-3">How DISCVR Solves</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {persona.howDiscvrSolves?.map((solution, i) => (
                    <div key={i} className="text-xs text-gray-600 bg-blue-50 p-3 rounded border-l-2 border-blue-300 leading-relaxed">
                      {solution}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Key Insight - Compact */}
      <div className="flex justify-center mt-6">
        <Card className="p-4 border-2 border-blue-200 bg-blue-50 max-w-4xl w-full">
          <CardContent className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Market Reality</h3>
            <p className="text-base text-gray-700 leading-relaxed">{slide.keyInsight}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};