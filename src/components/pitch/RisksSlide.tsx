
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

interface RisksSlideProps {
  slide: {
    title: string;
    icon: React.ComponentType<any>;
    criticalRisk: {
      title: string;
      description: string;
      concerns: string[];
    };
    risks: Array<{
      assumption: string;
      level: string;
      validation: string;
      metric: string;
    }>;
    warningSignals: {
      redFlags: string[];
      greenFlags: string[];
    };
  };
}

export const RisksSlide: React.FC<RisksSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-orange-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-8">{slide.title}</h2>
      </div>

      {/* Critical Risk Callout */}
      <Card className="p-6 border-2 border-red-500 bg-red-50">
        <CardContent>
          <h3 className="text-xl font-bold text-red-800 mb-4">{slide.criticalRisk.title}</h3>
          <p className="text-red-700 font-semibold mb-4">{slide.criticalRisk.description}</p>
          <div className="space-y-2">
            {slide.criticalRisk.concerns.map((concern, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-red-700 text-sm">{concern}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-3 text-left">Assumption</th>
              <th className="border border-gray-300 p-3 text-left">Risk Level</th>
              <th className="border border-gray-300 p-3 text-left">Validation Method</th>
              <th className="border border-gray-300 p-3 text-left">Success Metric</th>
            </tr>
          </thead>
          <tbody>
            {slide.risks.map((risk, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-3">{risk.assumption}</td>
                <td className="border border-gray-300 p-3">{risk.level}</td>
                <td className="border border-gray-300 p-3">{risk.validation}</td>
                <td className="border border-gray-300 p-3 text-green-600 font-semibold">{risk.metric}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Warning Signals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border-2 border-red-200 bg-red-50">
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
              <h3 className="text-xl font-bold text-red-800">🚩 Red Flags (Pivot Triggers)</h3>
            </div>
            <div className="space-y-2">
              {slide.warningSignals.redFlags.map((flag, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-red-700 text-sm">{flag}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="p-6 border-2 border-green-200 bg-green-50">
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <h3 className="text-xl font-bold text-green-800">✅ Green Flags (Scale Indicators)</h3>
            </div>
            <div className="space-y-2">
              {slide.warningSignals.greenFlags.map((flag, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-green-700 text-sm">{flag}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
