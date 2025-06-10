
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Brain, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AIResultCardProps {
  asset: {
    id: number;
    name: string;
    symbol: string;
    type: string;
    price: number;
    change: number;
    changePercent: number;
    routePath: string;
  };
  aiReason?: string;
  userQuery?: string;
  matchScore?: number;
}

const AIResultCard = ({ asset, aiReason, userQuery, matchScore }: AIResultCardProps) => {
  const navigate = useNavigate();

  const getAIReason = () => {
    if (aiReason) return aiReason;
    
    // Generate contextual reasoning
    if (userQuery?.toLowerCase().includes('safe')) {
      return `Safe choice: Low volatility (β=0.8), consistent dividends, strong balance sheet with ₹162B cash.`;
    } else if (userQuery?.toLowerCase().includes('growth')) {
      return `Growth potential: Services revenue up 16.9% YoY, AI integration driving next phase, expanding market share.`;
    } else {
      return `AI matched: Aligns with your moderate risk profile and preference for established companies.`;
    }
  };

  const isPositive = asset.change >= 0;

  return (
    <Card className="hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-l-4 border-l-blue-500">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-lg">{asset.name}</h3>
            <p className="text-sm text-gray-600">{asset.symbol} • {asset.type.toUpperCase()}</p>
            {matchScore && (
              <div className="flex items-center gap-1 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600 font-medium">{matchScore}% match</span>
              </div>
            )}
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">₹{asset.price}</p>
            <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="text-sm font-medium">
                {isPositive ? '+' : ''}{asset.changePercent}%
              </span>
            </div>
          </div>
        </div>

        {/* AI Reasoning */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
          <div className="flex items-start gap-2">
            <Brain size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-800 mb-1">Why this matches your query:</p>
              <p className="text-sm text-blue-700">{getAIReason()}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            {userQuery && `Based on: "${userQuery}"`}
          </div>
          <Button 
            onClick={() => navigate(asset.routePath)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Analyze <ArrowRight size={14} className="ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIResultCard;
