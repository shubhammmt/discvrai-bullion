
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { X, FolderPlus, Eye, TrendingUp, TrendingDown, ArrowUpDown } from 'lucide-react';
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
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  if (!results || results.length === 0) return null;

  // Helper function to get the correct price field based on asset type
  const getPriceValue = (item: any): number | null => {
    if (item.assetType === 'mutual-fund') {
      return item.nav_price || item.nav || item.current_nav || item.price || null;
    }
    return item.current_price || item.price || null;
  };

  // Helper function to get display price string
  const getDisplayPrice = (item: any): string => {
    const priceValue = getPriceValue(item);
    if (priceValue === null || priceValue === undefined) return 'N/A';
    return `₹${typeof priceValue === 'number' ? priceValue.toFixed(2) : priceValue}`;
  };

  // Helper function to format field names for display
  const formatFieldName = (fieldName: string): string => {
    return fieldName
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  // Helper function to format field values
  const formatFieldValue = (key: string, value: any, assetType?: string): string => {
    if (value === null || value === undefined) return 'N/A';
    
    // Handle price fields based on asset type
    if (key.includes('price') || key === 'nav' || key === 'nav_price' || key === 'current_nav') {
      return `₹${typeof value === 'number' ? value.toFixed(2) : value}`;
    }
    
    // Handle percentage fields
    if (key.includes('margin') || key.includes('roe') || key.includes('roic') || key.includes('growth') || key.includes('momentum') || key.includes('ret_')) {
      return `${(value * 100).toFixed(1)}%`;
    }
    
    // Handle market cap and AUM
    if (key === 'market_cap' || key === 'aum' || key === 'current_aum') {
      return `₹${(value / 10000000).toFixed(0)}Cr`;
    }
    
    // Handle ratios
    if (key.includes('ratio') || key === 'debt_to_equity' || key === 'expense_ratio' || key === 'total_expense_ratio') {
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
    results.flatMap(item => Object.keys(item).filter(key => 
      item[key] !== null && 
      item[key] !== undefined &&
      key !== 'company_name' &&
      key !== 'scheme_name' &&
      key !== 'name'
    ))
  ));

  // Prioritize important columns based on asset type
  const getDisplayKeys = (assetType: string) => {
    if (assetType === 'mutual-fund') {
      const mutualFundPriorityColumns = ['nav_price', 'nav', 'current_aum', 'aum', 'total_expense_ratio', 'expense_ratio', 'ret_1year', 'ret_3year'];
      return [
        ...mutualFundPriorityColumns.filter(key => allKeys.includes(key)),
        ...allKeys.filter(key => !mutualFundPriorityColumns.includes(key)).slice(0, 6)
      ];
    } else {
      const stockPriorityColumns = ['current_price', 'market_cap', 'pe_ratio', 'roe', 'roic', 'net_margin'];
      return [
        ...stockPriorityColumns.filter(key => allKeys.includes(key)),
        ...allKeys.filter(key => !stockPriorityColumns.includes(key)).slice(0, 6)
      ];
    }
  };

  // Determine the primary asset type from results
  const primaryAssetType = results[0]?.assetType || 'stock';
  const displayKeys = getDisplayKeys(primaryAssetType);

  // Get display name for the item
  const getDisplayName = (item: any): string => {
    return item.company_name || item.scheme_name || item.name || 'Unknown';
  };

  // Sortable fields - include name and all numeric fields
  const sortableFields = [
    { key: 'name', label: primaryAssetType === 'mutual-fund' ? 'Scheme Name' : 'Company Name' },
    ...displayKeys
      .filter(key => typeof results[0]?.[key] === 'number')
      .map(key => ({ key, label: formatFieldName(key) }))
  ];

  // Sort results based on selected field and order
  const sortedResults = useMemo(() => {
    if (!sortField) return results;

    return [...results].sort((a, b) => {
      let aValue, bValue;
      
      if (sortField === 'name') {
        aValue = getDisplayName(a);
        bValue = getDisplayName(b);
      } else {
        aValue = a[sortField];
        bValue = b[sortField];
      }

      // Handle null/undefined values
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      // String comparison for names
      if (sortField === 'name') {
        const comparison = aValue.localeCompare(bValue);
        return sortOrder === 'asc' ? comparison : -comparison;
      }

      // Numeric comparison
      const comparison = Number(aValue) - Number(bValue);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [results, sortField, sortOrder]);

  const startResult = (currentPage - 1) * pageSize + 1;
  const endResult = Math.min(currentPage * pageSize, totalRecords);

  // Asset Card Component (works for both stocks and mutual funds)
  const AssetCard = ({ asset, index }: { asset: any; index: number }) => {
    const displayName = getDisplayName(asset);
    const displayPrice = getDisplayPrice(asset);
    const priceChange = asset.price_momentum_3m || asset.ret_1month || asset.changePercent || 0;
    const isPositive = priceChange >= 0;

    return (
      <Card key={`${displayName}-${index}`} className="hover:shadow-lg transition-all duration-200 border border-gray-200 bg-white">
        <CardContent className="p-4">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-gray-900 leading-tight break-words">
                {displayName}
              </h3>
              {(asset.sector || asset.category || asset.amc_name) && (
                <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {asset.sector || asset.category || asset.amc_name}
                </span>
              )}
            </div>
            <PortfolioAddModal
              assetName={displayName}
              assetSymbol={asset.symbol || displayName}
              assetType={asset.assetType || 'stock'}
              currentPrice={getPriceValue(asset)}
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
                  {displayPrice}
                </p>
                {priceChange !== 0 && (
                  <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span className="text-sm font-medium">
                      {isPositive ? '+' : ''}{formatFieldValue('change_percent', priceChange, asset.assetType)} 
                      {asset.assetType === 'mutual-fund' ? ' (1M)' : ' (3M)'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            {displayKeys.slice(1, 7).map(key => (
              asset[key] !== null && asset[key] !== undefined && (
                <div key={key} className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 font-medium">
                    {formatFieldName(key)}
                  </p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {formatFieldValue(key, asset[key], asset.assetType)}
                  </p>
                </div>
              )
            ))}
          </div>

          {/* Additional Info */}
          {(asset.is_growth_stock || asset.risk_level) && (
            <div className="mb-3">
              <span className="inline-block text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                {asset.is_growth_stock ? 'Growth Stock' : asset.risk_level}
              </span>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-3 border-t border-gray-100">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-blue-600 hover:bg-blue-50"
              onClick={() => {/* TODO: Navigate to asset details */}}
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
              <span>{primaryAssetType === 'mutual-fund' ? 'Mutual Fund' : 'Stock'} Search Results</span>
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
          
          {/* Sorting Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <ArrowUpDown size={16} className="text-gray-500" />
              <span className="text-sm text-gray-600 font-medium">Sort by:</span>
            </div>
            <div className="flex items-center gap-2">
              <Select value={sortField} onValueChange={setSortField}>
                <SelectTrigger className="w-48 h-8 text-sm">
                  <SelectValue placeholder="Select field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No sorting</SelectItem>
                  {sortableFields.map(field => (
                    <SelectItem key={field.key} value={field.key}>
                      {field.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {sortField && (
                <Select value={sortOrder} onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}>
                  <SelectTrigger className="w-32 h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">High to Low</SelectItem>
                    <SelectItem value="asc">Low to High</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            Showing {startResult}-{endResult} of {totalRecords} results
            {sortField && (
              <span className="ml-2 text-blue-600">
                • Sorted by {formatFieldName(sortField)} ({sortOrder === 'desc' ? 'High to Low' : 'Low to High'})
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        {/* Cards Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {sortedResults.map((asset, index) => (
            <AssetCard key={`asset-${getDisplayName(asset)}-${index}`} asset={asset} index={index} />
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
              Showing key metrics. Full details available on individual asset pages.
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
