
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface RevenueSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    revenueStreams: Array<{
      title: string;
      launch: string;
      commission: string;
      target: string;
      revenue: string;
      details?: string;
    }>;
    userProjections: {
      month6: { users: string; revenue: string; description: string };
      month12: { users: string; revenue: string; description: string };
      month18: { users: string; revenue: string; description: string };
      month24: { users: string; revenue: string; description: string };
    };
    unitEconomics: {
      revenuePerUser: string;
      revenuePerMAU: string;
      conversionRate: string;
      cac: string;
    };
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
      
      {/* Revenue Streams */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {slide.revenueStreams.map((stream, index) => (
          <Card key={index} className="p-6">
            <CardContent className="space-y-4">
              <h3 className="text-xl font-bold text-green-600">{stream.title}</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Launch:</strong> {stream.launch}</p>
                <p><strong>Commission:</strong> {stream.commission}</p>
                <p><strong>Target:</strong> {stream.target}</p>
                <p className="text-green-600 font-semibold">{stream.revenue}</p>
                {stream.details && <p className="text-gray-500 italic">{stream.details}</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User Projections Timeline */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50">
        <CardContent>
          <h3 className="text-2xl font-bold text-center mb-6 text-blue-800">User Growth & Revenue Timeline</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-blue-600">Month 6</div>
              <div className="text-lg font-semibold">{slide.userProjections.month6.users}</div>
              <div className="text-sm text-green-600">{slide.userProjections.month6.revenue}</div>
              <div className="text-xs text-gray-600">{slide.userProjections.month6.description}</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-blue-600">Month 12</div>
              <div className="text-lg font-semibold">{slide.userProjections.month12.users}</div>
              <div className="text-sm text-green-600">{slide.userProjections.month12.revenue}</div>
              <div className="text-xs text-gray-600">{slide.userProjections.month12.description}</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-blue-600">Month 18</div>
              <div className="text-lg font-semibold">{slide.userProjections.month18.users}</div>
              <div className="text-sm text-green-600">{slide.userProjections.month18.revenue}</div>
              <div className="text-xs text-gray-600">{slide.userProjections.month18.description}</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-blue-600">Month 24</div>
              <div className="text-lg font-semibold">{slide.userProjections.month24.users}</div>
              <div className="text-sm text-green-600">{slide.userProjections.month24.revenue}</div>
              <div className="text-xs text-gray-600">{slide.userProjections.month24.description}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Unit Economics */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent>
          <h3 className="text-2xl font-bold text-center mb-6 text-green-800">Unit Economics (Month 18)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">Revenue/User</div>
              <div className="text-sm">{slide.unitEconomics.revenuePerUser}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">Revenue/MAU</div>
              <div className="text-sm">{slide.unitEconomics.revenuePerMAU}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">Conversion</div>
              <div className="text-sm">{slide.unitEconomics.conversionRate}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">CAC Target</div>
              <div className="text-sm">{slide.unitEconomics.cac}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
