
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FundingSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    allocation?: Array<{
      percentage: string;
      category: string;
      description: string;
    }>;
    fundDetails?: {
      raiseAmount: string;
      timeline: string;
      valuation?: string;
    };
    keyMilestones?: string[];
    competitiveContext?: {
      title: string;
      examples: string[];
    };
    exitStrategy?: {
      timeline: string;
      pathways: string[];
    };
  };
}

export const FundingSlide: React.FC<FundingSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-green-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>

      {/* Fund Details */}
      {slide.fundDetails && (
        <div className="text-center mb-8">
          <Card className="p-6 bg-green-50 max-w-md mx-auto">
            <CardContent>
              <h4 className="text-lg font-bold text-green-800 mb-2">Funding Target</h4>
              <p className="text-3xl font-bold text-green-600">{slide.fundDetails.raiseAmount}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Fund Allocation */}
      {slide.allocation && (
        <div>
          <h3 className="text-2xl font-bold text-center mb-6">Fund Allocation</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {slide.allocation.map((item, index) => (
              <Card key={index} className="p-4">
                <CardContent>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {item.percentage}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">{item.category}</h4>
                  </div>
                  <p className="text-sm text-gray-700">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Milestones */}
      {slide.keyMilestones && (
        <Card className="p-6 bg-blue-50">
          <CardContent>
            <h3 className="text-xl font-bold text-blue-800 mb-4">Key Milestones</h3>
            <div className="space-y-3">
              {slide.keyMilestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-blue-700">{milestone}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Competitive Context & Exit Strategy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slide.competitiveContext && (
          <Card className="p-6">
            <CardContent>
              <h3 className="text-xl font-bold text-purple-600 mb-4">{slide.competitiveContext.title}</h3>
              <div className="space-y-2">
                {slide.competitiveContext.examples?.map((example, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">{example}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {slide.exitStrategy && (
          <Card className="p-6">
            <CardContent>
              <h3 className="text-xl font-bold text-orange-600 mb-4">Exit Strategy</h3>
              <div className="space-y-2">
                {slide.exitStrategy.pathways?.map((strategy, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">{strategy}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
