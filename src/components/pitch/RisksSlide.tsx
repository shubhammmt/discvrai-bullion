import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, CheckCircle } from 'lucide-react';

interface RisksSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    risks: Array<{
      risk: string;
      severity: 'High' | 'Medium' | 'Low';
      description: string;
      mitigation: string[];
    }>;
  };
}

export const RisksSlide: React.FC<RisksSlideProps> = ({ slide }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <slide.icon className="w-16 h-16 text-primary" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h1>
          <p className="text-xl text-gray-600">{slide.subtitle}</p>
        </div>
      </div>

      {/* Risks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slide.risks.map((risk, index) => (
          <Card key={index} className="border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Risk Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <h3 className="font-semibold text-gray-900">{risk.risk}</h3>
                  </div>
                  <Badge className={`${getSeverityColor(risk.severity)} border`}>
                    {risk.severity} Risk
                  </Badge>
                </div>

                {/* Risk Description */}
                <p className="text-gray-600 text-sm">{risk.description}</p>

                {/* Mitigation Strategies */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-900">Mitigation</span>
                  </div>
                  <ul className="space-y-1">
                    {risk.mitigation.map((strategy, strategyIndex) => (
                      <li key={strategyIndex} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{strategy}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};