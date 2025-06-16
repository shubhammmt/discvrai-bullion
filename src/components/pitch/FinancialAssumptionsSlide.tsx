
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FinancialAssumptionsSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    assumptions: Array<{
      category: string;
      items: string[];
    }>;
  };
}

export const FinancialAssumptionsSlide: React.FC<FinancialAssumptionsSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {slide.assumptions.map((assumption, index) => (
          <Card key={index} className="p-6 h-full">
            <CardContent className="space-y-4">
              <h3 className="text-xl font-bold text-blue-600 text-center mb-4">
                {assumption.category}
              </h3>
              <div className="space-y-3">
                {assumption.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-bold text-blue-800 mb-2">Key Validation Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-blue-600">₹1,200</div>
            <div className="text-sm text-gray-600">Target CAC</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">18%</div>
            <div className="text-sm text-gray-600">Revenue Conversion</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">₹2,200</div>
            <div className="text-sm text-gray-600">Annual Revenue/User</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">8 months</div>
            <div className="text-sm text-gray-600">CAC Payback</div>
          </div>
        </div>
      </div>
    </div>
  );
};
