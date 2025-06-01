
import React from 'react';
import { Brain, TrendingUp, AlertTriangle, Target, Star } from 'lucide-react';

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

  // Scoring system
  const scores = {
    fundamentals: 8.5,
    growth: 7.0,
    technical: 7.5,
    risk: 6.0 // Lower is better for risk
  };

  const getScoreColor = (score: number, isRisk = false) => {
    if (isRisk) {
      if (score <= 4) return 'text-green-600';
      if (score <= 6) return 'text-yellow-600';
      return 'text-red-600';
    }
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

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

      {/* AI Scoring System */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">AI Investment Scores</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-600">Quality</span>
            </div>
            <div className={`text-xl font-bold ${getScoreColor(scores.fundamentals)}`}>
              {scores.fundamentals}/10
            </div>
            <div className="text-xs text-gray-500">Fundamentals</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-600">Growth</span>
            </div>
            <div className={`text-xl font-bold ${getScoreColor(scores.growth)}`}>
              {scores.growth}/10
            </div>
            <div className="text-xs text-gray-500">Prospects</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-600">Technical</span>
            </div>
            <div className={`text-xl font-bold ${getScoreColor(scores.technical)}`}>
              {scores.technical}/10
            </div>
            <div className="text-xs text-gray-500">Momentum</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-gray-600">Risk</span>
            </div>
            <div className={`text-xl font-bold ${getScoreColor(scores.risk, true)}`}>
              {scores.risk}/10
            </div>
            <div className="text-xs text-gray-500">Lower better</div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Investment Rationale</h3>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Key Factors</h3>
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
          <h3 className="font-semibold mb-1">Investment Recommendation</h3>
          <p className="text-sm">{recommendation}</p>
          <p className="text-xs mt-2 opacity-75">
            *Consider your risk tolerance and investment timeline. This analysis is for educational purposes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIInsight;
