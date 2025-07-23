
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ProblemSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    keyStats?: Array<{
      number: string;
      label: string;
      description: string;
    }>;
    painPoints?: string[];
    problemData?: {
      coreIssue: string;
      painPoints: Array<{
        category: string;
        severity: string;
        stats: string[];
      }>;
      currentSolutionGaps: string[];
    };
  };
}

export const ProblemSlide: React.FC<ProblemSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-red-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>

      {/* Key Statistics - only show if keyStats exists */}
      {slide.keyStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {slide.keyStats.map((stat, index) => (
            <Card key={index} className="p-6 text-center">
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold text-red-600">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-800">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Core Issue - show if problemData exists */}
      {slide.problemData && (
        <Card className="p-6 mb-8">
          <CardContent>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Core Issue</h3>
            <p className="text-lg text-gray-700 text-center">{slide.problemData.coreIssue}</p>
          </CardContent>
        </Card>
      )}

      {/* Problem Categories - show if problemData exists */}
      {slide.problemData ? (
        <div className="space-y-6">
          {slide.problemData.painPoints.map((painPoint, index) => (
            <Card key={index} className="p-6">
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    painPoint.severity === 'Critical' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {painPoint.severity}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">{painPoint.category}</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {painPoint.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">{stat}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Legacy Pain Points - show if simple painPoints exists */
        slide.painPoints && (
          <Card className="p-6">
            <CardContent>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Key Pain Points</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {slide.painPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{point}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
};
