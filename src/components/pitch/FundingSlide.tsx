
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface FundingSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    allocation: Array<{
      percentage: string;
      category: string;
      description: string;
    }>;
    milestones: string[];
    competitiveContext: {
      title: string;
      examples: string[];
    };
    exitStrategy: string[];
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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Budget Allocation */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Budget Allocation:</h3>
          <div className="space-y-4">
            {slide.allocation.map((item, index) => (
              <Card key={index} className="p-4">
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">{item.percentage}</span>
                    <span className="text-lg font-semibold">{item.category}</span>
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Milestones */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Key Milestones:</h3>
          <div className="space-y-4">
            {slide.milestones.map((milestone, index) => (
              <Card key={index} className="p-4">
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{milestone}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Competitive Context */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardContent>
          <h3 className="text-xl font-bold text-center mb-4 text-purple-800">{slide.competitiveContext.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {slide.competitiveContext.examples.map((example, index) => (
              <div key={index} className="text-center p-3 bg-white rounded-lg">
                <p className="text-sm text-gray-700">{example}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exit Strategy */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent>
          <h3 className="text-xl font-bold text-center mb-4 text-green-800">Exit Strategy & Valuation</h3>
          <div className="space-y-3">
            {slide.exitStrategy.map((strategy, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 text-sm">{strategy}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
