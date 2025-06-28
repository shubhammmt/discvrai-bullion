
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface RevenueSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    revenueStreams: Array<{
      name: string;
      timeline: string;
      structure: string;
      details: string[];
      color: string;
    }>;
    totalArpu: string;
  };
}

export const RevenueSlide: React.FC<RevenueSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-green-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>

      <div className="space-y-6">
        {slide.revenueStreams.map((stream, index) => (
          <Card key={index} className="p-6">
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 ${stream.color} rounded-lg flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{stream.name}</h3>
                  <p className="text-sm text-gray-600">{stream.timeline} • {stream.structure}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stream.details.map((detail, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">{detail}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="text-center">
          <h3 className="text-xl font-bold text-green-800 mb-3">Total ARPU Target</h3>
          <p className="text-green-700 text-2xl font-bold">{slide.totalArpu}</p>
        </CardContent>
      </Card>
    </div>
  );
};
