import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface B2BPartnershipsSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    partnerships: Array<{
      partner: string;
      enablers: string[];
      description: string;
    }>;
    coreCapabilities: {
      title: string;
      description: string;
    };
    strategicValue: string[];
  };
}

export const B2BPartnershipsSlide: React.FC<B2BPartnershipsSlideProps> = ({ slide }) => {
  const Icon = slide.icon;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Icon className="w-12 h-12 text-primary" />
          <h1 className="text-4xl font-bold text-gray-900">{slide.title}</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{slide.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold mb-4 text-primary">{slide.coreCapabilities.title}</h3>
            <p className="text-gray-600 mb-6">{slide.coreCapabilities.description}</p>
            
            <div className="space-y-4">
              {slide.partnerships.map((partnership, index) => (
                <div key={index} className="border-l-4 border-primary/30 pl-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{partnership.partner}</h4>
                  <p className="text-sm text-gray-600 mb-3">{partnership.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {partnership.enablers.map((enabler, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {enabler}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-500/20">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold mb-4 text-green-600">Strategic Value</h3>
            <div className="space-y-4">
              {slide.strategicValue.map((value, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};