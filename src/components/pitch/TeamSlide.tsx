
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface TeamSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    team?: Array<{
      name: string;
      role: string;
      background?: string[];
      experience: string;
    }>;
    advisors?: Array<{
      name: string;
      role: string;
      background?: string[];
      experience: string;
    }>;
    executionStrategy?: {
      title: string;
      initiatives: Array<{
        category: string;
        lead: string;
        description: string;
        details: string[];
      }>;
    };
  };
}

export const TeamSlide: React.FC<TeamSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-orange-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>

      {/* Team Members */}
      {slide.team && slide.team.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Core Team</h3>
          {slide.team.map((member, index) => (
            <Card key={index} className="p-6">
              <CardContent>
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-orange-600 font-semibold mb-3">{member.role}</p>
                    <div className="space-y-2 mb-3">
                      {member.background && member.background.map((bg, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-gray-700">{bg}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 italic">{member.experience}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Advisors */}
      {slide.advisors && slide.advisors.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Strategic Advisors</h3>
          {slide.advisors.map((advisor, index) => (
            <Card key={index} className="p-6 bg-gray-50">
              <CardContent>
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {advisor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{advisor.name}</h3>
                    <p className="text-gray-600 font-semibold mb-3">{advisor.role}</p>
                    <div className="space-y-2 mb-3">
                      {advisor.background && advisor.background.map((bg, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-gray-700">{bg}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 italic">{advisor.experience}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Execution Strategy */}
      {slide.executionStrategy && (
        <div className="mt-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{slide.executionStrategy.title}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {slide.executionStrategy.initiatives.map((initiative, index) => (
              <Card key={index} className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-l-4 border-orange-600">
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{initiative.category}</h4>
                      <p className="text-orange-600 font-semibold text-sm mb-2">{initiative.lead}</p>
                      <p className="text-gray-700 mb-4">{initiative.description}</p>
                    </div>
                    
                    <div className="space-y-2">
                      {initiative.details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-gray-700">{detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
