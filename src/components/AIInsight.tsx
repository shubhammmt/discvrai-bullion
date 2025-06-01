
import React from 'react';
import { Brain, TrendingUp, AlertTriangle, Target } from 'lucide-react';

interface AIInsightProps {
  sentiment: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  summary: string;
  keyPoints: string[];
  recommendation: string;
}

const AIInsight = ({ sentiment, confidence, summary, keyPoints, recommendation }: AIInsightProps) => {
  const sentimentConfig = {
    bullish: { color: 'text-green-600', bg: 'bg-green-50', icon: TrendingUp },
    bearish: { color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle },
    neutral: { color: 'text-yellow-600', bg: 'bg-yellow-50', icon: Target }
  };

  const config = sentimentConfig[sentiment];
  const IconComponent = config.icon;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-3 rounded-full ${config.bg}`}>
          <Brain className={`${config.color} w-6 h-6`} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">AI Quick Analysis</h2>
          <div className="flex items-center gap-2">
            <IconComponent className={`w-4 h-4 ${config.color}`} />
            <span className={`font-semibold capitalize ${config.color}`}>{sentiment}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-600">{confidence}% confidence</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">30-Second Summary</h3>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Key Points</h3>
          <ul className="space-y-1">
            {keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className={`p-4 rounded-lg ${config.bg} border-l-4 border-l-current ${config.color}`}>
          <h3 className="font-semibold mb-1">AI Recommendation</h3>
          <p className="text-sm">{recommendation}</p>
        </div>
      </div>
    </div>
  );
};

export default AIInsight;
