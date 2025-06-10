
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, DollarSign, Target } from 'lucide-react';

interface InvestmentHighlightsSlideProps {
  slide: {
    title: string;
    highlights: string[];
    ask: string;
  };
}

export const InvestmentHighlightsSlide: React.FC<InvestmentHighlightsSlideProps> = ({ slide }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <Target className="w-16 h-16 mx-auto mb-4 text-purple-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-8">{slide.title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slide.highlights.map((highlight, index) => (
          <Card key={index} className="p-6">
            <CardContent className="flex items-center gap-4">
              <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div className="text-lg text-gray-800">{highlight}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="p-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardContent className="text-center space-y-4">
          <DollarSign className="w-16 h-16 mx-auto" />
          <h3 className="text-3xl font-bold">{slide.ask}</h3>
          <p className="text-xl opacity-90">Join us in democratizing financial discovery</p>
        </CardContent>
      </Card>
    </div>
  );
};
