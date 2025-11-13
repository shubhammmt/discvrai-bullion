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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <IconComponent className="w-20 h-20 mx-auto mb-6 text-blue-600" />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{slide.title}</h1>
          <p className="text-2xl text-gray-600">{slide.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Founder Section */}
          <Card className="border-2 border-blue-200 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">{slide.founder.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{slide.founder.title}</p>
              <ul className="space-y-3">
                {slide.founder.background.map((item, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Company Section */}
          <Card className="border-2 border-purple-200 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-6">Company</h2>
              <div className="space-y-4 mb-6">
                <div>
                  <span className="font-semibold text-gray-700">Age: </span>
                  <span className="text-gray-600">{slide.company.age}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Funding: </span>
                  <span className="text-gray-600">{slide.company.funding}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Location: </span>
                  <span className="text-gray-600">{slide.company.location}</span>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800 mb-2">Team Composition:</h3>
                {slide.company.team.map((member, index) => (
                  <div key={index} className="pl-4 border-l-2 border-purple-300">
                    <p className="font-medium text-gray-700">{member.role}</p>
                    <p className="text-sm text-gray-600">{member.focus}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What We Do */}
        <Card className="border-2 border-green-200 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">What We Do</h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              {slide.whatWeDo.map((item, index) => (
                <div key={index} className="flex-1 text-center">
                  <p className="text-lg text-gray-700 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
