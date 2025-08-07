import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Target, DollarSign } from 'lucide-react';

interface GTMDetailedSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    phases: Array<{
      phase: string;
      timeline: string;
      target: string;
      channels: Array<{
        name: string;
        allocation: string;
        cac: string;
        volume: string;
      }>;
      metrics: string[];
    }>;
    totalBudget: string;
    targetCAC: string;
  };
}

export const GTMDetailedSlide: React.FC<GTMDetailedSlideProps> = ({ slide }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <slide.icon className="w-16 h-16 text-primary" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h1>
          <p className="text-xl text-gray-600">{slide.subtitle}</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-900">{slide.totalBudget}</div>
            <div className="text-sm text-blue-700">Total CAC Budget</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-900">{slide.targetCAC}</div>
            <div className="text-sm text-green-700">Target Blended CAC</div>
          </CardContent>
        </Card>
      </div>

      {/* Phases */}
      <div className="space-y-6">
        {slide.phases.map((phase, index) => (
          <Card key={index} className="border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Phase Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{phase.phase}</h3>
                    <p className="text-gray-600">{phase.timeline}</p>
                  </div>
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    <Users className="w-4 h-4 mr-1" />
                    {phase.target}
                  </Badge>
                </div>

                {/* Channels */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {phase.channels.map((channel, channelIndex) => (
                    <Card key={channelIndex} className="bg-gray-50">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{channel.name}</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Allocation:</span>
                            <span className="font-medium">{channel.allocation}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">CAC:</span>
                            <span className="font-medium">{channel.cac}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Volume:</span>
                            <span className="font-medium">{channel.volume}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Success Metrics */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Success Metrics
                  </h4>
                  <ul className="space-y-1">
                    {phase.metrics.map((metric, metricIndex) => (
                      <li key={metricIndex} className="text-sm text-blue-800">
                        • {metric}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};