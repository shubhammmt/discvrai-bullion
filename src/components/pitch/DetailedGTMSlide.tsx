
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DetailedGTMSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    aggressivePlan: {
      title: string;
      timeline: string;
      phases: Array<{
        phase: string;
        duration: string;
        target: string;
        tactics: string[];
        signups: string;
      }>;
    };
    viralMechanics: {
      title: string;
      mechanics: Array<{
        feature: string;
        description: string;
        virality: string;
      }>;
    };
    communityTargets: {
      title: string;
      platforms: Array<{
        platform: string;
        audience: string;
        approach: string;
        reach: string;
      }>;
    };
    kpis: {
      title: string;
      metrics: Array<{
        metric: string;
        target: string;
        timeline: string;
      }>;
    };
  };
}

export const DetailedGTMSlide: React.FC<DetailedGTMSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  // Add safety checks for undefined properties
  if (!slide.aggressivePlan || !slide.viralMechanics || !slide.communityTargets || !slide.kpis) {
    console.log('DetailedGTMSlide: Missing required slide data properties', slide);
    return (
      <div className="space-y-8">
        <div className="text-center">
          <IconComponent className="w-16 h-16 mx-auto mb-4 text-green-600" />
          <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
          <p className="text-xl text-gray-600 mb-4">{slide.subtitle}</p>
          <p className="text-lg text-red-600">Slide data is incomplete. Please check the slide configuration.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-green-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-4">{slide.subtitle}</p>
        <p className="text-lg font-semibold text-green-600">{slide.aggressivePlan.timeline}</p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold mb-4">{slide.aggressivePlan.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slide.aggressivePlan.phases.map((phase, index) => (
              <Card key={index} className="p-4 border-l-4 border-green-500">
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-green-700">{phase.phase}</h4>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{phase.duration}</span>
                  </div>
                  <p className="text-sm font-semibold text-blue-600">{phase.target}</p>
                  <ul className="text-xs space-y-1">
                    {phase.tactics.map((tactic, tacticIndex) => (
                      <li key={tacticIndex} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                        {tactic}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm font-bold text-green-600">{phase.signups}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">{slide.viralMechanics.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {slide.viralMechanics.mechanics.map((mechanic, index) => (
              <Card key={index} className="p-4">
                <CardContent className="space-y-2">
                  <h4 className="font-semibold text-purple-600">{mechanic.feature}</h4>
                  <p className="text-sm text-gray-600">{mechanic.description}</p>
                  <p className="text-xs font-semibold text-purple-500">{mechanic.virality}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">{slide.communityTargets.title}</h3>
            <div className="space-y-3">
              {slide.communityTargets.platforms.map((platform, index) => (
                <Card key={index} className="p-3">
                  <CardContent className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-blue-600">{platform.platform}</h4>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{platform.reach}</span>
                    </div>
                    <p className="text-xs text-gray-600">{platform.audience}</p>
                    <p className="text-xs text-blue-500">{platform.approach}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{slide.kpis.title}</h3>
            <div className="space-y-3">
              {slide.kpis.metrics.map((kpi, index) => (
                <Card key={index} className="p-3 border-l-4 border-orange-500">
                  <CardContent className="space-y-2">
                    <h4 className="font-semibold text-orange-700">{kpi.metric}</h4>
                    <div className="flex justify-between text-sm">
                      <span className="text-orange-600 font-bold">{kpi.target}</span>
                      <span className="text-gray-500">{kpi.timeline}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
