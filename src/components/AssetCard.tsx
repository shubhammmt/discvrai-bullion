
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, TrendingUp, TrendingDown, Plus, BarChart3, FolderPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PortfolioAddModal from '@/components/PortfolioAddModal';

interface Asset {
  id: number | string;
  name: string;
  symbol: string;
  type: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  latestEvent: string;
  news: string;
  // Additional mutual fund specific fields
  rawData?: any;
}

interface AssetCardProps {
  asset: Asset;
  showReason?: boolean;
}

const AssetCard = ({ asset, showReason }: AssetCardProps) => {
  const navigate = useNavigate();
  const isPositive = asset.change > 0;

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'stock': return 'bg-blue-100 text-blue-700';
      case 'mutual-fund': return 'bg-green-100 text-green-700';
      case 'crypto': return 'bg-orange-100 text-orange-700';
      case 'etf': return 'bg-purple-100 text-purple-700';
      case 'elss': return 'bg-green-100 text-green-700';
      case 'aggressive hybrid fund': return 'bg-purple-100 text-purple-700';
      case 'index fund': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getReasonText = () => {
    switch (asset.type.toLowerCase()) {
      case 'stock':
        return "Matches your moderate risk profile and shows strong fundamentals with consistent growth.";
      case 'mutual-fund':
      case 'elss':
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

  // Check if this is a mutual fund with raw data
  const isMutualFund = asset.rawData && (
    asset.type.toLowerCase().includes('mutual') || 
    asset.type.toLowerCase().includes('elss') ||
    asset.type.toLowerCase().includes('hybrid') ||
    asset.type.toLowerCase().includes('index')
  );

  // Function to normalize asset type to expected PortfolioAddModal types
  const getNormalizedAssetType = (type: string): "stock" | "mutual-fund" | "ipo" | "insurance" | "credit" | "smallcase" => {
    const normalizedType = type.toLowerCase();
    
    if (normalizedType.includes('stock') || normalizedType.includes('equity')) {
      return 'stock';
    }
    if (normalizedType.includes('mutual') || normalizedType.includes('elss') || normalizedType.includes('hybrid') || normalizedType.includes('index')) {
      return 'mutual-fund';
    }
    if (normalizedType.includes('ipo')) {
      return 'ipo';
    }
    if (normalizedType.includes('insurance')) {
      return 'insurance';
    }
    if (normalizedType.includes('credit')) {
      return 'credit';
    }
    if (normalizedType.includes('smallcase')) {
      return 'smallcase';
    }
    
    // Default fallback
    return 'mutual-fund';
  };

  const renderMutualFundData = () => {
    if (!isMutualFund || !asset.rawData) return null;

    const data = asset.rawData;
    
    return (
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="text-center">
          <p className="text-xs text-gray-500">NAV Price</p>
          <p className="text-lg font-bold text-gray-900">
            ₹{data.nav_price ? Number(data.nav_price).toFixed(2) : 'N/A'}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">6M Return</p>
          <p className={`text-sm font-semibold ${Number(data.ret_6month || 0) > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data.ret_6month ? `${Number(data.ret_6month).toFixed(2)}%` : 'N/A'}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">1Y Return</p>
          <p className={`text-sm font-semibold ${Number(data.ret_1year || 0) > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data.ret_1year ? `${Number(data.ret_1year).toFixed(2)}%` : 'N/A'}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Expense Ratio</p>
          <p className="text-sm font-medium text-gray-900">
            {data.total_expense_ratio ? `${Number(data.total_expense_ratio).toFixed(2)}%` : 'N/A'}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">AUM</p>
          <p className="text-sm font-medium text-gray-900">
            {data.current_aum ? `₹${(Number(data.current_aum) / 100).toFixed(0)} Cr` : 'N/A'}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Min SIP</p>
          <p className="text-sm font-medium text-gray-900">
            ₹{data.sip_minimum || 'N/A'}
          </p>
        </div>
      </div>
    );
  };

  const renderGenericData = () => {
    if (isMutualFund) return null;

    return (
      <>
        <div className="text-center mb-3">
          <p className="font-bold text-xl">₹{asset.price.toLocaleString()}</p>
          <div className={`flex items-center gap-1 justify-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span className="text-sm">
              {isPositive ? '+' : ''}₹{asset.change} ({isPositive ? '+' : ''}{asset.changePercent}%)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 mb-3 text-sm">
          <div className="text-center">
            <span className="text-gray-500">Volume:</span>
            <span className="ml-1 font-medium">{asset.volume}</span>
          </div>
          <div className="text-center">
            <span className="text-gray-500">Event:</span>
            <span className="ml-1 font-medium text-blue-600">{asset.latestEvent}</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <Card className="hover:shadow-md transition-shadow h-full flex flex-col">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className={`font-semibold text-gray-900 text-sm leading-tight ${isMutualFund ? 'text-center w-full' : ''}`}>
                {isMutualFund ? asset.rawData?.scheme_name || asset.name : asset.name}
              </h3>
              {!isMutualFund && (
                <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${getTypeColor(asset.type)}`}>
                  {asset.type.replace('-', ' ').toUpperCase()}
                </span>
              )}
            </div>
            {isMutualFund && (
              <div className="flex justify-center mb-2">
                <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(asset.type)}`}>
                  {asset.rawData?.main_category || asset.type}
                </span>
              </div>
            )}
            <p className={`text-sm text-gray-600 ${isMutualFund ? 'text-center' : ''}`}>{asset.symbol}</p>
          </div>
        </div>

        {/* Render mutual fund specific data or generic data */}
        <div className="flex-1">
          {renderMutualFundData()}
          {renderGenericData()}
        </div>

        <div className="mb-3">
          <p className="text-sm text-gray-700 line-clamp-2">{asset.news}</p>
        </div>

        {showReason && (
          <div className="bg-blue-50 p-3 rounded-lg mb-3">
            <p className="text-xs text-blue-700">
              <strong>Why recommended:</strong> {getReasonText()}
            </p>
          </div>
        )}

        <div className="flex gap-2 flex-wrap">
          <Button size="sm" variant="outline" className="flex-1 min-w-0">
            <Plus size={14} className="mr-1" />
            <span className="truncate">Watchlist</span>
          </Button>
          <Button size="sm" variant="outline" onClick={handleAnalyze}>
            <BarChart3 size={14} className="mr-1" />
            <span className="hidden sm:inline">Analyze</span>
          </Button>
          <PortfolioAddModal
            assetName={isMutualFund ? asset.rawData?.scheme_name || asset.name : asset.name}
            assetSymbol={asset.symbol}
            assetType={getNormalizedAssetType(asset.type)}
            currentPrice={isMutualFund ? asset.rawData?.nav_price : asset.price}
            trigger={
              <Button size="sm" variant="outline">
                <FolderPlus size={14} />
              </Button>
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetCard;
