import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface CompanyIntroSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    founder: {
      name: string;
      title: string;
      background: string[];
    };
    company: {
      age: string;
      funding: string;
      location: string;
      team: Array<{
        role: string;
        focus: string;
      }>;
    };
    whatWeDo: string[];
  };
}

export const CompanyIntroSlide: React.FC<CompanyIntroSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 overflow-auto">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="text-center mb-4">
          <IconComponent className="w-12 h-12 mx-auto mb-3 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{slide.title}</h1>
          <p className="text-lg text-gray-600">{slide.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Founder Section */}
          <Card className="border-2 border-blue-200 shadow-lg">
            <CardContent className="p-4">
              <h2 className="text-lg font-bold text-blue-600 mb-2">{slide.founder.name}</h2>
              <p className="text-sm text-gray-600 mb-3">{slide.founder.title}</p>
              <ul className="space-y-1">
                {slide.founder.background.map((item, index) => (
                  <li key={index} className="text-gray-700 flex items-start text-xs">
                    <span className="text-blue-600 mr-2 mt-0.5">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Company Section */}
          <Card className="border-2 border-purple-200 shadow-lg">
            <CardContent className="p-4">
              <h2 className="text-lg font-bold text-purple-600 mb-3">Company</h2>
              <div className="space-y-2 mb-3">
                <div className="text-xs">
                  <span className="font-semibold text-gray-700">Age: </span>
                  <span className="text-gray-600">{slide.company.age}</span>
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-gray-700">Funding: </span>
                  <span className="text-gray-600">{slide.company.funding}</span>
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-gray-700">Location: </span>
                  <span className="text-gray-600">{slide.company.location}</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-800 text-xs mb-1">Team Composition:</h3>
                {slide.company.team.map((member, index) => (
                  <div key={index} className="pl-3 border-l-2 border-purple-300">
                    <p className="font-medium text-gray-700 text-xs">{member.role}</p>
                    <p className="text-xs text-gray-600">{member.focus}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What We Do */}
        <Card className="border-2 border-green-200 shadow-lg">
          <CardContent className="p-4">
            <h2 className="text-lg font-bold text-green-600 mb-3 text-center">What We Do</h2>
            <div className="flex flex-col md:flex-row gap-3 justify-center">
              {slide.whatWeDo.map((item, index) => (
                <div key={index} className="flex-1 text-center">
                  <p className="text-sm text-gray-700 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
