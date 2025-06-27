
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Plus } from 'lucide-react';

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
  // Fixed logic: Check if this is a mutual fund with raw data
  // A mutual fund can be identified by having rawData AND containing mutual fund specific fields
  const isMutualFund = asset.rawData && (
    asset.rawData.scheme_name || 
    asset.rawData.mf_schcode || 
    asset.rawData.nav_price !== undefined ||
    asset.rawData.amc_name ||
    asset.rawData.main_category
  );

  // Check if this is a stock with raw data
  const isStock = asset.rawData && (
    asset.rawData.company_name ||
    asset.rawData.current_price !== undefined ||
    asset.rawData.pe_ratio !== undefined ||
    asset.rawData.pb_ratio !== undefined
  );

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

  const renderMutualFundData = () => {
    if (!isMutualFund || !asset.rawData) return null;

    const data = asset.rawData;
    
    return (
      <div className="grid grid-cols-5 gap-2 mb-2">
        <div className="text-center">
          <p className="text-xs text-gray-500">NAV</p>
          <p className="text-sm font-bold text-gray-900">
            ₹{data.nav_price ? Number(data.nav_price).toFixed(2) : 'N/A'}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">6M Return</p>
          <p className={`text-xs font-semibold ${Number(data.ret_6month || 0) > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data.ret_6month ? `${Number(data.ret_6month).toFixed(1)}%` : 'N/A'}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">1Y Return</p>
          <p className={`text-xs font-semibold ${Number(data.ret_1year || 0) > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data.ret_1year ? `${Number(data.ret_1year).toFixed(1)}%` : 'N/A'}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Expense</p>
          <p className="text-xs font-medium text-gray-900">
            {data.total_expense_ratio ? `${Number(data.total_expense_ratio).toFixed(2)}%` : 'N/A'}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Min SIP</p>
          <p className="text-xs font-medium text-gray-900">
            {data.sip_minimum ? `${Number(data.sip_minimum)}` : 'N/A'}
          </p>
        </div>
      </div>
    );
  };

  const renderStockData = () => {
    if (!isStock || !asset.rawData) return null;

    const data = asset.rawData;
    const price = data.current_price || asset.price || 0;
    const momentum3m = data.price_momentum_3m || 0;
    const isPositive = momentum3m > 0;
    
    return (
      <div className="grid grid-cols-4 gap-2 mb-2">
        <div className="text-center">
          <p className="text-xs text-gray-500">Price</p>
          <p className="text-sm font-bold text-gray-900">
            ₹{price.toLocaleString()}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">3M</p>
          <div className={`flex items-center justify-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            <span className="text-xs font-semibold">
              {isPositive ? '+' : ''}{(momentum3m * 100).toFixed(1)}%
            </span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">P/E</p>
          <p className="text-xs font-medium text-gray-900">
            {data.pe_ratio ? Number(data.pe_ratio).toFixed(1) : 'N/A'}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">P/B</p>
          <p className="text-xs font-medium text-gray-900">
            {data.pb_ratio ? Number(data.pb_ratio).toFixed(1) : 'N/A'}
          </p>
        </div>
      </div>
    );
  };

  const renderGenericData = () => {
    if (isMutualFund || isStock) return null;

    const isPositive = asset.change > 0;

    return (
      <>
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="font-bold text-lg">₹{asset.price.toLocaleString()}</p>
            <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              <span className="text-xs">
                {isPositive ? '+' : ''}₹{asset.change} ({isPositive ? '+' : ''}{asset.changePercent}%)
              </span>
            </div>
          </div>
          <div className="text-right text-xs text-gray-500">
            <div>Vol: {asset.volume}</div>
            <div className="text-blue-600">{asset.latestEvent}</div>
          </div>
        </div>
      </>
    );
  };

  return (
    <Card className="hover:shadow-md transition-shadow h-full flex flex-col">
      <CardContent className="p-3 flex flex-col h-full">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className={`font-semibold text-gray-900 text-sm leading-tight ${(isMutualFund || isStock) ? 'text-center w-full' : ''}`}>
                {isMutualFund ? 
                  (asset.rawData?.scheme_name || asset.name) : 
                  isStock ? 
                    (asset.rawData?.company_name || asset.name) : 
                    asset.name
                }
              </h3>
              {!isMutualFund && !isStock && (
                <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${getTypeColor(asset.type)}`}>
                  {asset.type.replace('-', ' ').toUpperCase()}
                </span>
              )}
            </div>
            {(isMutualFund || isStock) && (
              <div className="flex justify-center mb-1">
                <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(asset.type)}`}>
                  {isMutualFund ? 
                    `${asset.rawData?.plan_type || asset.rawData?.main_category || asset.type} • ${asset.rawData?.main_category || ''}`.trim() : 
                    'STOCK'
                  }
                </span>
              </div>
            )}
          </div>
          {/* Add button with smaller icon for mutual funds and stocks */}
          {(isMutualFund || isStock) && (
            <button className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs flex items-center gap-1 ml-2 flex-shrink-0">
              <Plus size={12} />
              Add
            </button>
          )}
        </div>

        {/* Render mutual fund, stock, or generic data */}
        <div className="flex-1">
          {renderMutualFundData()}
          {renderStockData()}
          {renderGenericData()}
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetCard;
