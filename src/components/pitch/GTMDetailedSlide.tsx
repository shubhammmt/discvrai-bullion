import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Target, DollarSign } from 'lucide-react';

interface GTMDetailedSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    channels: Array<{
      name: string;
      percentage: number;
      cac: string;
      volume: string;
      budget: string;
      color: string;
      strategies: string[];
    }>;
    timeline: Array<{
      phase: string;
      focus: string;
      userTarget: string;
      keyActivities: string[];
    }>;
    keyMetrics: Array<{
      metric: string;
      value: string;
      description: string;
    }>;
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {slide.keyMetrics.map((metric, index) => (
          <Card key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-900">{metric.value}</div>
              <div className="text-sm font-medium text-blue-800">{metric.metric}</div>
              <div className="text-xs text-blue-600 mt-1">{metric.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Acquisition Channels */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Acquisition Channels</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {slide.channels.map((channel, index) => (
            <Card key={index} className="border-l-4" style={{ borderLeftColor: channel.color.replace('bg-', '#') }}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">{channel.name}</h3>
                    <Badge variant="secondary">{channel.percentage}%</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">CAC:</span>
                      <div className="font-semibold text-green-600">{channel.cac}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Volume:</span>
                      <div className="font-semibold text-blue-600">{channel.volume}</div>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-600">Budget:</span>
                      <div className="font-semibold text-purple-600">{channel.budget}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Strategies:</h4>
                    <ul className="space-y-1">
                      {channel.strategies.map((strategy, strategyIndex) => (
                        <li key={strategyIndex} className="text-sm text-gray-600">
                          • {strategy}
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

      {/* Growth Timeline */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Growth Timeline</h2>
        <div className="space-y-4">
          {slide.timeline.map((phase, index) => (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{phase.phase}</h3>
                      <p className="text-lg text-primary font-medium">{phase.focus}</p>
                    </div>
                    <Badge variant="outline" className="text-lg px-3 py-1">
                      <Users className="w-4 h-4 mr-1" />
                      {phase.userTarget}
                    </Badge>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Key Activities
                    </h4>
                    <ul className="space-y-1">
                      {phase.keyActivities.map((activity, activityIndex) => (
                        <li key={activityIndex} className="text-sm text-blue-800">
                          • {activity}
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
    </div>
  );
};