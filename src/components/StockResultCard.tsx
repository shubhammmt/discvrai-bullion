
import React from 'react';
import { Button } from '@/components/ui/button';
import { FolderPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PortfolioAddModal from '@/components/PortfolioAddModal';

interface StockResultCardProps {
  stock: any;
}

const StockResultCard = ({ stock }: StockResultCardProps) => {
  const navigate = useNavigate();

  // Helper function to format field names for display
  const formatFieldName = (fieldName: string): string => {
    return fieldName
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  // Helper function to format field values
  const formatFieldValue = (key: string, value: any): string => {
    if (value === null || value === undefined) return 'N/A';
    
    // Handle percentage fields
    if (key.includes('margin') || key.includes('roe') || key.includes('roic') || key.includes('growth') || key.includes('momentum')) {
      return `${(value * 100).toFixed(1)}%`;
    }
    
    // Handle price fields
    if (key.includes('price')) {
      return `₹${typeof value === 'number' ? value.toFixed(2) : value}`;
    }
    
    // Handle market cap
    if (key === 'market_cap') {
      return `₹${(value / 10000000).toFixed(0)}Cr`;
    }
    
    // Handle ratios
    if (key.includes('ratio') || key === 'debt_to_equity') {
      return typeof value === 'number' ? value.toFixed(2) : value;
    }
    
    // Handle boolean fields
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    
    return value.toString();
  };

  // Get primary fields to display prominently
  const primaryFields = ['current_price', 'market_cap', 'pe_ratio'];
  const keyMetrics = ['roe', 'roic', 'net_margin', 'debt_to_equity'];
  
  // Get all other fields except company_name and primary ones
  const otherFields = Object.keys(stock).filter(key => 
    !['company_name', ...primaryFields, ...keyMetrics].includes(key) &&
    stock[key] !== null && 
    stock[key] !== undefined &&
    stock[key] !== 0
  );

  return (
    <div className="flex items-center justify-between p-4 bg-white/70 backdrop-blur-md rounded-lg border border-white/20 hover:shadow-md transition-shadow">
      <div className="flex-1 cursor-pointer" onClick={() => navigate(`/research/stock/${stock.company_name}`)}>
        <div className="flex items-center gap-3 mb-2">
          <h3 className="font-semibold text-gray-900">{stock.company_name}</h3>
          {stock.sector && (
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
              {stock.sector}
            </span>
          )}
          {stock.is_growth_stock && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              Growth
            </span>
          )}
        </div>
        
        {/* Primary Metrics Row */}
        <div className="grid grid-cols-3 gap-4 mb-2">
          {primaryFields.map(field => {
            if (stock[field] !== null && stock[field] !== undefined) {
              return (
                <div key={field} className={field === 'current_price' ? '' : 'text-center'}>
                  <p className={`text-sm text-gray-600 ${field === 'current_price' ? '' : 'text-center'}`}>
                    {formatFieldName(field)}
                  </p>
                  <p className={`font-bold ${field === 'current_price' ? 'text-lg text-gray-900' : 'font-medium'}`}>
                    {formatFieldValue(field, stock[field])}
                  </p>
                  {field === 'current_price' && stock.price_momentum_3m !== undefined && (
                    <p className={`text-sm ${stock.price_momentum_3m > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.price_momentum_3m > 0 ? '+' : ''}{formatFieldValue('price_momentum_3m', stock.price_momentum_3m)} (3M)
                    </p>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-4 gap-2 text-xs text-gray-600 mb-2">
          {keyMetrics.map(field => {
            if (stock[field] !== null && stock[field] !== undefined) {
              return (
                <div key={field}>
                  <span className="block">{formatFieldName(field)}</span>
                  <span className="font-medium text-gray-900">{formatFieldValue(field, stock[field])}</span>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Additional Fields if any */}
        {otherFields.length > 0 && (
          <div className="border-t pt-2 mt-2">
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              {otherFields.slice(0, 4).map(field => (
                <div key={field} className="flex justify-between">
                  <span>{formatFieldName(field)}:</span>
                  <span className="font-medium text-gray-900">{formatFieldValue(field, stock[field])}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="ml-4 flex items-center gap-2">
        <PortfolioAddModal
          assetName={stock.company_name}
          assetSymbol={stock.company_name}
          assetType="stock"
          currentPrice={stock.current_price}
          trigger={
            <Button size="sm" variant="outline" className="text-green-700 border-green-200 hover:bg-green-50">
              <FolderPlus size={14} className="mr-1" />
              Add
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default StockResultCard;
