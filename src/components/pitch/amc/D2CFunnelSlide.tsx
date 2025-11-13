import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search, BarChart3, MessageSquare, Users } from 'lucide-react';

interface D2CFunnelSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    forConsumers: {
      discovery: string[];
      intelligence: string[];
      conversion: string[];
    };
    forDistributors: string[];
    timeline: string;
    bottomLine: string;
  };
}

export const D2CFunnelSlide: React.FC<D2CFunnelSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-5 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-3">
        <div className="text-center">
          <IconComponent className="w-10 h-10 mx-auto mb-2 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{slide.title}</h1>
          <p className="text-base text-gray-600 mb-1">{slide.subtitle}</p>
        </div>

        {/* For End Consumers */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-green-600 mb-2">For End Consumers:</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Card className="border-2 border-green-200 shadow-lg">
              <CardContent className="p-3 space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Search className="w-5 h-5 text-green-600" />
                  <h3 className="text-sm font-bold text-green-600">Discovery Layer</h3>
                </div>
                <ul className="space-y-1">
                  {slide.forConsumers.discovery.map((item, index) => (
                    <li key={index} className="text-xs text-gray-700 flex items-start">
                      <span className="text-green-600 mr-1.5">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 shadow-lg">
              <CardContent className="p-3 space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm font-bold text-blue-600">Intelligence Layer</h3>
                </div>
                <ul className="space-y-1">
                  {slide.forConsumers.intelligence.map((item, index) => (
                    <li key={index} className="text-xs text-gray-700 flex items-start">
                      <span className="text-blue-600 mr-1.5">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 shadow-lg">
              <CardContent className="p-3 space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  <h3 className="text-sm font-bold text-purple-600">Conversion Layer</h3>
                </div>
                <ul className="space-y-1">
                  {slide.forConsumers.conversion.map((item, index) => (
                    <li key={index} className="text-xs text-gray-700 flex items-start">
                      <span className="text-purple-600 mr-1.5">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* For Distributors */}
        <Card className="border-2 border-orange-200 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-6 h-6 text-orange-600" />
              <h2 className="text-lg font-bold text-orange-600">For Distributors:</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {slide.forDistributors.map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-orange-600 mr-1.5 text-sm">●</span>
                  <span className="text-gray-700 text-xs">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Timeline & Bottom Line */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card className="bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-300">
            <CardContent className="p-3 text-center">
              <h3 className="font-semibold text-gray-800 mb-1 text-xs">Timeline:</h3>
              <p className="text-sm font-bold text-blue-600">{slide.timeline}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-300">
            <CardContent className="p-3 text-center">
              <p className="text-sm font-bold text-green-600">{slide.bottomLine}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
