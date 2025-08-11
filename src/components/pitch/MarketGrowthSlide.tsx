import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface MarketGrowthSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    marketSizing: {
      tam: { size: string; users: string; description: string; calculation: string; breakdown: string[]; };
      sam: { size: string; users: string; description: string; calculation: string; criteria: string[]; };
      som: { 
        size: string; 
        users: string; 
        description: string; 
        calculation: string;
        growthTrajectory?: Array<{ year: string; users: string; strategy: string; }>;
        strategyPhases?: Array<{ phase: string; focus: string; description: string; }>;
      };
    };
    marketProgression: {
      title: string;
      flow: Array<{ stage: string; size: string; driver?: string; filter?: string; focus?: string; }>;
    };
    revenueValidation: {
      title: string;
      examples: string[];
    };
    keyInsight: string;
  };
}

export const MarketGrowthSlide: React.FC<MarketGrowthSlideProps> = ({ slide }) => {

  const { title, subtitle, icon: Icon, marketSizing, marketProgression, revenueValidation, keyInsight } = slide;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Icon className="w-12 h-12 text-primary" />
          <div>
            <h1 className="text-4xl font-bold text-foreground">{title}</h1>
            <p className="text-xl text-muted-foreground mt-2">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* TAM/SAM/SOM Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-2 border-green-200 bg-green-50 h-full">
          <CardHeader className="pb-4">
            <CardTitle className="text-green-700 text-2xl">TAM</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 flex-1">
            <div className="text-4xl font-bold text-green-600">{marketSizing.tam.size}</div>
            <div className="text-xl font-semibold text-gray-800">{marketSizing.tam.users}</div>
            <p className="text-base text-gray-600 leading-relaxed">{marketSizing.tam.description}</p>
            <p className="text-sm text-gray-500 bg-white/50 p-3 rounded">{marketSizing.tam.calculation}</p>
            <div className="space-y-3">
              <h5 className="font-semibold text-sm text-green-700">Market Breakdown</h5>
              {marketSizing.tam.breakdown.map((item, index) => (
                <div key={index} className="text-sm text-gray-600 flex items-start gap-2 bg-white/30 p-2 rounded">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200 bg-blue-50 h-full">
          <CardHeader className="pb-4">
            <CardTitle className="text-blue-700 text-2xl">SAM</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 flex-1">
            <div className="text-4xl font-bold text-blue-600">{marketSizing.sam.size}</div>
            <div className="text-xl font-semibold text-gray-800">{marketSizing.sam.users}</div>
            <p className="text-base text-gray-600 leading-relaxed">{marketSizing.sam.description}</p>
            <p className="text-sm text-gray-500 bg-white/50 p-3 rounded">{marketSizing.sam.calculation}</p>
            <div className="space-y-3">
              <h5 className="font-semibold text-sm text-blue-700">Market Criteria</h5>
              {marketSizing.sam.criteria.map((item, index) => (
                <div key={index} className="text-sm text-gray-600 flex items-start gap-2 bg-white/30 p-2 rounded">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 bg-purple-50 h-full">
          <CardHeader className="pb-4">
            <CardTitle className="text-purple-700 text-2xl">SOM</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 flex-1">
            <div className="text-4xl font-bold text-purple-600">{marketSizing.som.size}</div>
            <div className="text-xl font-semibold text-gray-800">{marketSizing.som.users}</div>
            <p className="text-base text-gray-600 leading-relaxed">{marketSizing.som.description}</p>
            <p className="text-sm text-gray-500 bg-white/50 p-3 rounded">{marketSizing.som.calculation}</p>
            
            {/* Growth Trajectory */}
            {marketSizing.som.growthTrajectory && (
              <div className="mt-4 space-y-2">
                <h5 className="font-semibold text-sm text-purple-700">5-Year Growth Plan</h5>
                <div className="space-y-1">
                  {marketSizing.som.growthTrajectory.map((milestone, index) => (
                    <div key={index} className="flex justify-between items-center text-xs bg-white/50 p-2 rounded">
                      <span className="font-medium">{milestone.year}: {milestone.users}</span>
                      <span className="text-gray-600 text-[10px]">{milestone.strategy}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Strategy Phases */}
            {marketSizing.som.strategyPhases && (
              <div className="mt-4 space-y-2">
                <h5 className="font-semibold text-sm text-purple-700">Growth Strategy</h5>
                <div className="space-y-2">
                  {marketSizing.som.strategyPhases.map((phase, index) => (
                    <div key={index} className="bg-white/50 p-2 rounded">
                      <div className="font-medium text-xs text-purple-600">{phase.phase}</div>
                      <div className="font-semibold text-xs">{phase.focus}</div>
                      <div className="text-[10px] text-gray-600 mt-1">{phase.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Market Progression Flow */}
      <Card>
        <CardHeader>
          <CardTitle>{marketProgression.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {marketProgression.flow.map((stage, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-lg text-gray-800">{stage.stage}</h4>
                  <p className="text-2xl font-bold text-primary mt-2">{stage.size}</p>
                  {stage.driver && <p className="text-sm text-gray-600 mt-2">{stage.driver}</p>}
                  {stage.filter && <p className="text-sm text-gray-600 mt-2">{stage.filter}</p>}
                  {stage.focus && <p className="text-sm text-gray-600 mt-2">{stage.focus}</p>}
                </div>
                {index < marketProgression.flow.length - 1 && (
                  <div className="flex justify-center">
                    <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-400"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue Validation */}
      <Card>
        <CardHeader>
          <CardTitle>{revenueValidation.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {revenueValidation.examples.map((example, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm">{example}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Insight */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="text-center p-6">
          <h3 className="text-2xl font-bold mb-4">Key Insight</h3>
          <p className="text-lg">{keyInsight}</p>
        </CardContent>
      </Card>
    </div>
  );
};