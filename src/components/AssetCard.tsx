
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, TrendingUp, TrendingDown, Plus, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Asset {
  id: number;
  name: string;
  symbol: string;
  type: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  latestEvent: string;
  news: string;
}

interface AssetCardProps {
  asset: Asset;
  showReason?: boolean;
}

const AssetCard = ({ asset, showReason }: AssetCardProps) => {
  const navigate = useNavigate();
  const isPositive = asset.change > 0;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'stock': return 'bg-blue-100 text-blue-700';
      case 'mutual-fund': return 'bg-green-100 text-green-700';
      case 'crypto': return 'bg-orange-100 text-orange-700';
      case 'etf': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getReasonText = () => {
    switch (asset.type) {
      case 'stock':
        return "Matches your moderate risk profile and shows strong fundamentals with consistent growth.";
      case 'mutual-fund':
        return "Diversified portfolio aligned with your investment horizon and risk tolerance.";
      case 'crypto':
        return "High growth potential suitable for your aggressive risk appetite.";
      default:
        return "Recommended based on your investment preferences and market analysis.";
    }
  };

  const handleAnalyze = () => {
    if (asset.type === 'stock') {
      navigate(`/research/stock/${asset.symbol.toLowerCase()}`);
    }
    // Add navigation for other asset types later
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900">{asset.name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(asset.type)}`}>
                {asset.type.replace('-', ' ').toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-600">{asset.symbol}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg">₹{asset.price.toLocaleString()}</p>
            <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span className="text-sm">
                {isPositive ? '+' : ''}₹{asset.change} ({isPositive ? '+' : ''}{asset.changePercent}%)
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
          <div>
            <span className="text-gray-500">Volume:</span>
            <span className="ml-1 font-medium">{asset.volume}</span>
          </div>
          <div>
            <span className="text-gray-500">Event:</span>
            <span className="ml-1 font-medium text-blue-600">{asset.latestEvent}</span>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-sm text-gray-700">{asset.news}</p>
        </div>

        {showReason && (
          <div className="bg-blue-50 p-3 rounded-lg mb-3">
            <p className="text-xs text-blue-700">
              <strong>Why recommended:</strong> {getReasonText()}
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Plus size={14} className="mr-1" />
            Add to Watchlist
          </Button>
          <Button size="sm" variant="outline" onClick={handleAnalyze}>
            <BarChart3 size={14} className="mr-1" />
            Analyze
          </Button>
          <Button size="sm" variant="outline">
            <Heart size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetCard;
