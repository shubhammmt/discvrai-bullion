
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

interface BusinessModelSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    whatWeDo: Array<{ title: string; description: string }>;
    whatWeDont: Array<{ title: string; description: string }>;
  };
}

export const BusinessModelSlide: React.FC<BusinessModelSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* What We Do */}
        <Card className="p-6 border-2 border-green-200 bg-green-50">
          <CardContent className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <h3 className="text-2xl font-bold text-green-800">What We Do</h3>
            </div>
            <div className="space-y-4">
              {slide.whatWeDo.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-green-800">{item.title}</h4>
                    <p className="text-green-700 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* What We Don't Do */}
        <Card className="p-6 border-2 border-red-200 bg-red-50">
          <CardContent className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
              <h3 className="text-2xl font-bold text-red-800">What We Don't Do</h3>
            </div>
            <div className="space-y-4">
              {slide.whatWeDont.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-red-800">{item.title}</h4>
                    <p className="text-red-700 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="text-center bg-blue-50 p-6 rounded-lg">
        <p className="text-lg text-blue-800 font-semibold">
          We are the intelligent bridge between users and financial providers - enabling faster, smarter decisions without the operational complexity.
        </p>
      </div>
    </div>
  );
};
