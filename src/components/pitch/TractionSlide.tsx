
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface TractionSlideProps {
  slide: {
    title: string;
    icon: React.ComponentType<any>;
    metrics: Array<{
      metric: string;
      value: string;
      growth: string;
    }>;
    testimonials: Array<{
      name: string;
      company: string;
      quote: string;
    }>;
  };
}

export const TractionSlide: React.FC<TractionSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-8">{slide.title}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {slide.metrics.map((metric, index) => (
          <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">{metric.metric}</h3>
              <div className="text-3xl font-bold text-blue-600">{metric.value}</div>
              <p className="text-gray-600">{metric.growth}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50">
        <CardContent>
          <h3 className="text-2xl font-bold text-center mb-6 text-blue-800">User Testimonials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {slide.testimonials.map((testimonial, index) => (
              <div key={index} className="p-4 bg-white rounded-lg">
                <p className="text-gray-700 italic mb-3">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
