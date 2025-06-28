
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface TeamSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    team: Array<{
      name: string;
      role: string;
      background: string[];
      experience: string;
    }>;
    keyHires: string[];
    executionMilestones: string[];
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
      <div className="space-y-6">
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
                    {member.background.map((bg, i) => (
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

      {/* Key Hires & Execution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <CardContent>
            <h3 className="text-xl font-bold text-blue-600 mb-4">Key Hires Needed</h3>
            <div className="space-y-3">
              {slide.keyHires.map((hire, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">{hire}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardContent>
            <h3 className="text-xl font-bold text-green-600 mb-4">Execution Milestones</h3>
            <div className="space-y-3">
              {slide.executionMilestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">{milestone}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
