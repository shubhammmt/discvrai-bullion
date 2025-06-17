
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface CACReductionSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    strategies: Array<{
      phase: string;
      timeline: string;
      approach: string;
      tactics: string[];
      target: string;
      impact: string;
    }>;
    trajectory: Array<{
      month: string;
      cac: string;
      reduction: string;
      driver: string;
    }>;
    keyMetrics: Array<{
      metric: string;
      description: string;
      target: string;
    }>;
  };
}

export const CACReductionSlide: React.FC<CACReductionSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-red-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>

      {/* CAC Reduction Strategies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {slide.strategies.map((strategy, index) => (
          <Card key={index} className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-red-700">{strategy.phase}</h3>
                <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded">{strategy.timeline}</span>
              </div>
              <p className="text-md font-semibold text-gray-800">{strategy.approach}</p>
              <ul className="space-y-1">
                {strategy.tactics.map((tactic, tacticIndex) => (
                  <li key={tacticIndex} className="text-sm text-gray-700 flex items-start">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {tactic}
                  </li>
                ))}
              </ul>
              <div className="border-t pt-3">
                <p className="text-sm font-semibold text-red-600">{strategy.target}</p>
                <p className="text-xs text-gray-600">{strategy.impact}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CAC Trajectory */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent>
          <h3 className="text-2xl font-bold text-center mb-6 text-green-800">CAC Reduction Trajectory</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {slide.trajectory.map((point, index) => (
              <div key={index} className="text-center p-4 bg-white rounded-lg border-2 border-green-200">
                <div className="text-lg font-bold text-green-600">{point.month}</div>
                <div className="text-2xl font-bold text-gray-900">{point.cac}</div>
                <div className="text-sm text-red-600 font-semibold">{point.reduction}</div>
                <div className="text-xs text-gray-600 mt-1">{point.driver}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics to Track */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent>
          <h3 className="text-2xl font-bold text-center mb-6 text-blue-800">Key Success Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slide.keyMetrics.map((metric, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                <div>
                  <p className="font-semibold text-gray-800">{metric.metric}</p>
                  <p className="text-sm text-gray-600">{metric.description}</p>
                </div>
                <div className="text-lg font-bold text-blue-600">{metric.target}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
