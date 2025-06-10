
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DetailedGTMSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    communityStrategy: {
      title: string;
      communities: Array<{
        platform: string;
        target: string;
        approach: string;
        timeline: string;
        goal: string;
      }>;
    };
    contentStrategy: {
      title: string;
      contentTypes: Array<{
        type: string;
        description: string;
        distribution: string;
        goal: string;
      }>;
    };
    measurableKPIs: {
      title: string;
      kpis: Array<{
        milestone: string;
        metrics: string[];
        validation: string;
      }>;
    };
    riskMitigation: {
      title: string;
      risks: Array<{
        risk: string;
        mitigation: string;
        fallback: string;
      }>;
    };
  };
}

export const DetailedGTMSlide: React.FC<DetailedGTMSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-green-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold mb-4">{slide.communityStrategy.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slide.communityStrategy.communities.map((community, index) => (
              <Card key={index} className="p-4">
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-blue-600">{community.platform}</h4>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{community.timeline}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>Target:</strong> {community.target}</p>
                    <p><strong>Approach:</strong> {community.approach}</p>
                    <p className="text-green-600 font-semibold"><strong>Goal:</strong> {community.goal}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">{slide.contentStrategy.title}</h3>
          <div className="space-y-4">
            {slide.contentStrategy.contentTypes.map((content, index) => (
              <Card key={index} className="p-4">
                <CardContent className="space-y-2">
                  <h4 className="font-semibold text-purple-600">{content.type}</h4>
                  <p className="text-sm">{content.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="font-semibold">Distribution: </span>
                      <span className="text-gray-600">{content.distribution}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Goal: </span>
                      <span className="text-purple-600">{content.goal}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">{slide.measurableKPIs.title}</h3>
          <div className="space-y-4">
            {slide.measurableKPIs.kpis.map((kpi, index) => (
              <Card key={index} className="p-4 border-l-4 border-green-500">
                <CardContent className="space-y-3">
                  <h4 className="font-bold text-green-700">{kpi.milestone}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Key Metrics:</p>
                      <ul className="text-xs space-y-1">
                        {kpi.metrics.map((metric, metricIndex) => (
                          <li key={metricIndex} className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                            {metric}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Validation:</p>
                      <p className="text-xs text-green-600">{kpi.validation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">{slide.riskMitigation.title}</h3>
          <div className="space-y-4">
            {slide.riskMitigation.risks.map((risk, index) => (
              <Card key={index} className="p-4">
                <CardContent className="space-y-3">
                  <h4 className="font-semibold text-red-600">{risk.risk}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-orange-600">Mitigation: </span>
                      <span>{risk.mitigation}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-blue-600">Fallback: </span>
                      <span>{risk.fallback}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
