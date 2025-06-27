
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { X, FolderPlus, Eye, TrendingUp, TrendingDown } from 'lucide-react';
import PortfolioAddModal from '@/components/PortfolioAddModal';

interface StockResultsTableProps {
  results: any[];
  query: string;
  onDismiss: () => void;
  totalRecords: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const StockResultsTable = ({ 
  results, 
  query, 
  onDismiss, 
  totalRecords, 
  currentPage, 
  totalPages, 
  pageSize, 
  onPageChange,
  isLoading = false 
}: StockResultsTableProps) => {
  if (!results || results.length === 0) return null;

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

  // Get all unique keys from all results to determine columns
  const allKeys = Array.from(new Set(
    results.flatMap(stock => Object.keys(stock).filter(key => 
      stock[key] !== null && 
      stock[key] !== undefined &&
      key !== 'company_name' // We'll handle this separately
    ))
  ));

  // Prioritize important columns for card display
  const priorityColumns = ['current_price', 'market_cap', 'pe_ratio', 'roe', 'roic', 'net_margin'];
  const displayKeys = [
    ...priorityColumns.filter(key => allKeys.includes(key)),
    ...allKeys.filter(key => !priorityColumns.includes(key)).slice(0, 6) // Limit additional fields
  ];

  const startResult = (currentPage - 1) * pageSize + 1;
  const endResult = Math.min(currentPage * pageSize, totalRecords);

  // Stock Card Component
  const StockCard = ({ stock, index }: { stock: any; index: number }) => {
    const currentPrice = stock.current_price;
    const priceChange = stock.price_momentum_3m || 0;
    const isPositive = priceChange >= 0;

    return (
      <Card key={`${stock.company_name}-${index}`} className="hover:shadow-lg transition-all duration-200 border border-gray-200 bg-white">
        <CardContent className="p-4">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-gray-900 leading-tight break-words">
                {stock.company_name}
              </h3>
              {stock.sector && (
                <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {stock.sector}
                </span>
              )}
            </div>
            <PortfolioAddModal
              assetName={stock.company_name}
              assetSymbol={stock.company_name}
              assetType="stock"
              currentPrice={stock.current_price}
              trigger={
                <Button size="sm" variant="outline" className="text-green-700 border-green-200 hover:bg-green-50 ml-3 flex-shrink-0">
                  <FolderPlus size={14} className="mr-1" />
                  Add
                </Button>
              }
            />
          </div>

          {/* Price Section */}
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {currentPrice ? formatFieldValue('current_price', currentPrice) : 'N/A'}
                </p>
                {priceChange !== 0 && (
                  <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span className="text-sm font-medium">
                      {isPositive ? '+' : ''}{formatFieldValue('price_momentum_3m', priceChange)} (3M)
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            {displayKeys.slice(1, 7).map(key => (
              stock[key] !== null && stock[key] !== undefined && (
                <div key={key} className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 font-medium">
                    {formatFieldName(key)}
                  </p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {formatFieldValue(key, stock[key])}
                  </p>
                </div>
              )
            ))}
          </div>

          {/* Additional Info */}
          {stock.is_growth_stock && (
            <div className="mb-3">
              <span className="inline-block text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Growth Stock
              </span>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-3 border-t border-gray-100">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-blue-600 hover:bg-blue-50"
              onClick={() => {/* TODO: Navigate to stock details */}}
            >
              <Eye size={14} className="mr-2" />
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Card className="mb-4 bg-white/95 backdrop-blur-md border-blue-200">
      <CardHeader className="pb-3 p-4 sm:p-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="flex flex-col gap-2 text-lg min-w-0 flex-1">
              <span>Stock Search Results</span>
              <div className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-normal w-fit">
                "{query.length > 30 ? query.substring(0, 30) + '...' : query}" - {totalRecords} found
              </div>
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onDismiss}
              className="h-8 w-8 p-0 hover:bg-red-50 flex-shrink-0"
            >
              <X size={16} className="text-gray-500" />
            </Button>
          </div>
          <div className="text-sm text-gray-600">
            Showing {startResult}-{endResult} of {totalRecords} results
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        {/* Cards Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {results.map((stock, index) => (
            <StockCard key={`stock-${stock.company_name}-${index}`} stock={stock} index={index} />
          ))}
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent className="flex-wrap gap-1">
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                    className={`text-sm ${currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage <= 2) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 1) {
                    pageNum = totalPages - 2 + i;
                  } else {
                    pageNum = currentPage - 1 + i;
                  }
                  
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => onPageChange(pageNum)}
                        isActive={currentPage === pageNum}
                        className="cursor-pointer text-sm min-w-[36px] h-9"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                    className={`text-sm ${currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
        
        {displayKeys.length > 6 && (
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Showing key metrics. Full details available on individual stock pages.
            </p>
          </div>
        )}
        
        {isLoading && (
          <div className="mt-4 text-center text-sm text-gray-500">
            Loading...
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StockResultsTable;
