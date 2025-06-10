
import React from 'react';
import { Brain, TrendingUp, Shield, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface AIReasoningCardProps {
  title: string;
  reasoning: string;
  confidence: number;
  layers: (1 | 2 | 3 | 4)[];
  type?: 'recommendation' | 'analysis' | 'warning';
  keyFactors?: string[];
}

export const AIReasoningCard: React.FC<AIReasoningCardProps> = ({
  title,
  reasoning,
  confidence,
  layers,
  type = 'recommendation',
  keyFactors
}) => {
  const getTypeConfig = () => {
    switch (type) {
      case 'analysis':
        return { icon: TrendingUp, color: 'border-blue-200 bg-blue-50', textColor: 'text-blue-800' };
      case 'warning':
        return { icon: Shield, color: 'border-yellow-200 bg-yellow-50', textColor: 'text-yellow-800' };
      default:
        return { icon: Brain, color: 'border-green-200 bg-green-50', textColor: 'text-green-800' };
    }
  };

  const config = getTypeConfig();
  const IconComponent = config.icon;

  const layerLabels = {
    1: 'Personal Fit',
    2: 'Goal Alignment', 
    3: 'Product Match',
    4: 'Context Understanding'
  };

  return (
    <Card className={`${config.color} border-l-4`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className={`p-2 rounded-full bg-white shadow-sm`}>
            <IconComponent className={`w-5 h-5 ${config.textColor}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className={`font-semibold ${config.textColor}`}>{title}</h4>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-600">{confidence}% confidence</span>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-3">{reasoning}</p>
            
            {keyFactors && keyFactors.length > 0 && (
              <div className="mb-3">
                <p className="text-xs font-medium text-gray-600 mb-1">Key Factors:</p>
                <div className="flex flex-wrap gap-1">
                  {keyFactors.map((factor, index) => (
                    <span key={index} className="text-xs bg-white px-2 py-1 rounded-full text-gray-600">
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap gap-1">
              <span className="text-xs text-gray-500">AI Layers:</span>
              {layers.map(layer => (
                <span key={layer} className="text-xs bg-white px-2 py-0.5 rounded text-gray-600">
                  L{layer}: {layerLabels[layer]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
