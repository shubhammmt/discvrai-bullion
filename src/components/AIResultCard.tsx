
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Brain, ShoppingCart } from 'lucide-react';
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
    <Card className="hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-l-4 border-l-blue-500 w-full min-w-0">
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3 min-w-0">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-base sm:text-lg break-words overflow-wrap-anywhere leading-tight">{asset.name}</h3>
            <p className="text-xs sm:text-sm text-gray-600 truncate">{asset.symbol} • {asset.type.toUpperCase()}</p>
            {matchScore && (
              <div className="flex items-center gap-1 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className="text-xs text-green-600 font-medium">{matchScore}% match</span>
              </div>
            )}
          </div>
          <div className="text-left sm:text-right flex-shrink-0">
            <p className="text-base sm:text-lg font-bold">₹{asset.price}</p>
            <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'} justify-start sm:justify-end`}>
              {isPositive ? <TrendingUp size={14} className="flex-shrink-0" /> : <TrendingDown size={14} className="flex-shrink-0" />}
              <span className="text-xs sm:text-sm font-medium">
                {isPositive ? '+' : ''}{asset.changePercent}%
              </span>
            </div>
          </div>
        </div>

        {/* AI Reasoning */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3 min-w-0">
          <div className="flex items-start gap-2 min-w-0">
            <Brain size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-blue-800 mb-1">Why this matches:</p>
              <p className="text-xs sm:text-sm text-blue-700 break-words overflow-wrap-anywhere leading-relaxed">{aiReason || getAIReason()}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 min-w-0">
          <div className="text-xs text-gray-500 min-w-0">
            {userQuery && (
              <span className="break-words overflow-wrap-anywhere">Based on: "{userQuery}"</span>
            )}
          </div>
          <Button 
            onClick={() => navigate(asset.routePath)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xs sm:text-sm w-full sm:w-auto flex-shrink-0"
            size="sm"
          >
            <ShoppingCart size={12} className="mr-1 flex-shrink-0" />
            View & Buy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIResultCard;
