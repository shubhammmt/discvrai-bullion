
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Calendar, Target } from 'lucide-react';

interface TeamBreakdownSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    teamPlan: {
      month6: {
        total: number;
        breakdown: Array<{
          role: string;
          count: number;
          description: string;
        }>;
      };
      month12: {
        total: number;
        breakdown: Array<{
          role: string;
          count: number;
          description: string;
        }>;
      };
      month18: {
        total: number;
        breakdown: Array<{
          role: string;
          count: number;
          description: string;
        }>;
      };
    };
    keyhires: string[];
  };
}

export const TeamBreakdownSlide: React.FC<TeamBreakdownSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  const renderTeamPhase = (phase: string, data: any) => (
    <Card className="p-6">
      <CardContent className="space-y-4">
        <div className="text-center">
          <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-600" />
          <h3 className="text-xl font-bold text-blue-600">{phase}</h3>
          <div className="text-2xl font-bold text-gray-800">{data.total} People</div>
        </div>
        
        <div className="space-y-3">
          {data.breakdown.map((item: any, index: number) => (
            <div key={index} className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-semibold text-sm">{item.role}</p>
                <p className="text-xs text-gray-600">{item.description}</p>
              </div>
              <div className="text-lg font-bold text-blue-600 ml-2">{item.count}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>
      
      {/* Team Growth Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderTeamPhase("Month 6", slide.teamPlan.month6)}
        {renderTeamPhase("Month 12", slide.teamPlan.month12)}
        {renderTeamPhase("Month 18", slide.teamPlan.month18)}
      </div>

      {/* Key Hires */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent>
          <h3 className="text-2xl font-bold text-center mb-6 text-blue-800">Critical Hires (Next 6 Months)</h3>
          <div className="space-y-4">
            {slide.keyhires.map((hire, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg">
                <Target className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{hire}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Scaling Metrics */}
      <div className="grid grid-cols-3 gap-6 text-center">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">4x</div>
          <div className="text-sm text-gray-600">Team Growth (6-18 months)</div>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">60%</div>
          <div className="text-sm text-gray-600">Engineering Team Ratio</div>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">₹1.4Cr</div>
          <div className="text-sm text-gray-600">Annual Team Cost (Month 18)</div>
        </div>
      </div>
    </div>
  );
};
