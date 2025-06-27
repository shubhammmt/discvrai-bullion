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

  // Compact Mutual Fund Card Component
  const CompactMutualFundCard = ({ fund, index }: { fund: any; index: number }) => {
    const displayName = getDisplayName(fund);
    const navPrice = getPriceValue(fund);
    const oneYearReturn = fund.ret_1year || fund.return1Year || 0;
    const sixMonthReturn = fund.ret_6month || fund.return6Month || 0;
    const aum = fund.current_aum || fund.aum || 0;
    const expenseRatio = fund.total_expense_ratio || fund.expense_ratio || 0;
    const sipMinimum = fund.sip_minimum || 0;
    const amcName = fund.amc_name || fund.amcName || '';
    const category = fund.main_category || fund.category || '';

    return (
      <Card key={`${displayName}-${index}`} className="hover:shadow-md transition-all duration-200 border border-gray-200 bg-white">
        <CardContent className="p-2">
          <div className="flex items-center justify-between">
            {/* Left Section - Fund Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-gray-900 leading-tight break-words mb-1">
                    {displayName}
                  </h3>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-gray-600">
                {amcName && <span>{amcName}</span>}
                {category && <span>• {category}</span>}
              </div>
            </div>

            {/* Middle Section - Performance Metrics */}
            <div className="flex items-center gap-3 mx-3">
              {/* 6M Return */}
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-0.5">6M Return</p>
                <p className="text-sm font-semibold text-green-600">
                  {sixMonthReturn ? `${(sixMonthReturn * 100).toFixed(1)}%` : 'N/A'}
                </p>
              </div>
              
              {/* 1Y Return */}
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-0.5">1Y Return</p>
                <p className="text-sm font-semibold text-green-600">
                  {oneYearReturn ? `${(oneYearReturn * 100).toFixed(1)}%` : 'N/A'}
                </p>
              </div>
              
              {/* Expense Ratio */}
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-0.5">Expense</p>
                <p className="text-sm font-medium text-gray-900">
                  {expenseRatio ? `${expenseRatio.toFixed(2)}%` : 'N/A'}
                </p>
              </div>
              
              {/* Min SIP */}
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-0.5">Min SIP</p>
                <p className="text-sm font-medium text-gray-900">
                  {sipMinimum ? `₹${sipMinimum}` : 'N/A'}
                </p>
              </div>
              
              {/* NAV */}
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-0.5">NAV</p>
                <p className="text-base font-bold text-gray-900">
                  {navPrice ? `₹${navPrice.toFixed(2)}` : 'N/A'}
                </p>
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <PortfolioAddModal
                assetName={displayName}
                assetSymbol={fund.mf_schcode?.toString() || fund.symbol || displayName}
                assetType="mutual-fund"
                currentPrice={navPrice}
                trigger={
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white px-2.5 py-1.5 text-xs">
                    <FolderPlus size={12} className="mr-1" />
                    Add
                  </Button>
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Compact Stock Card Component
  const CompactStockCard = ({ stock, index }: { stock: any; index: number }) => {
    const displayName = getDisplayName(stock);
    const currentPrice = getPriceValue(stock);
    const priceChange = stock.price_momentum_3m || stock.ret_1month || stock.changePercent || 0;
    const isPositive = priceChange >= 0;
    const marketCap = stock.market_cap || 0;
    const peRatio = stock.pe_ratio || 0;
    const roe = stock.roe || 0;
    const roic = stock.roic || 0;
    const netMargin = stock.net_margin || 0;
    const sector = stock.sector || '';

    return (
      <Card key={`${displayName}-${index}`} className="hover:shadow-md transition-all duration-200 border border-gray-200 bg-white">
        <CardContent className="p-2">
          <div className="flex items-center justify-between">
            {/* Left Section - Stock Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <div className="flex-1 min-w-0 text-center">
                  <h3 className="font-semibold text-sm text-gray-900 leading-tight break-words mb-1">
                    {displayName}
                  </h3>
                  {sector && (
                    <div className="text-xs text-gray-600">
                      {sector}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Middle Section - Stock Metrics */}
            <div className="flex items-center gap-3 mx-3">
              {/* Market Cap */}
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-0.5">Market Cap</p>
                <p className="text-sm font-medium text-gray-900">
                  {marketCap ? `₹${(marketCap / 10000000).toFixed(0)}Cr` : 'N/A'}
                </p>
              </div>
              
              {/* PE Ratio */}
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-0.5">PE Ratio</p>
                <p className="text-sm font-medium text-gray-900">
                  {peRatio ? peRatio.toFixed(2) : 'N/A'}
                </p>
              </div>
              
              {/* ROE */}
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-0.5">ROE</p>
                <p className="text-sm font-semibold text-green-600">
                  {roe ? `${(roe * 100).toFixed(1)}%` : 'N/A'}
                </p>
              </div>
              
              {/* Net Margin */}
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-0.5">Net Margin</p>
                <p className="text-sm font-semibold text-green-600">
                  {netMargin ? `${(netMargin * 100).toFixed(1)}%` : 'N/A'}
                </p>
              </div>
              
              {/* Current Price & Change */}
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-0.5">Current Price</p>
                <p className="text-base font-bold text-gray-900">
                  {currentPrice ? `₹${currentPrice.toFixed(2)}` : 'N/A'}
                </p>
                {priceChange !== 0 && (
                  <div className={`flex items-center justify-center gap-1 text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    <span>
                      {isPositive ? '+' : ''}{formatFieldValue('change_percent', priceChange)} (3M)
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <PortfolioAddModal
                assetName={displayName}
                assetSymbol={stock.symbol || displayName}
                assetType="stock"
                currentPrice={currentPrice}
                trigger={
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white px-2.5 py-1.5 text-xs">
                    <FolderPlus size={12} className="mr-1" />
                    Add
                  </Button>
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Card className="mb-4 bg-white/95 backdrop-blur-md border-blue-200">
      <CardHeader className="pb-2 p-4 sm:p-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="flex flex-col gap-2 text-lg min-w-0 flex-1">
              <span>{primaryAssetType === 'mutual-fund' ? 'Mutual Fund' : 'Stock'} Search Results</span>
              <div className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-normal w-fit">
                {totalRecords} {primaryAssetType === 'mutual-fund' ? 'funds' : 'stocks'} found
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
          
          {/* Sorting Controls - Right Aligned */}
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <div className="text-sm text-gray-600">
              Showing {startResult}-{endResult} of {totalRecords} results
              {sortField && sortField !== 'none' && (
                <span className="ml-2 text-blue-600">
                  • Sorted by {formatFieldName(sortField)} ({sortOrder === 'desc' ? 'High to Low' : 'Low to High'})
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <ArrowUpDown size={14} className="text-gray-500" />
                <span className="text-sm text-gray-600 font-medium">Sort by:</span>
              </div>
              <div className="flex items-center gap-2">
                <Select value={sortField} onValueChange={setSortField}>
                  <SelectTrigger className="w-40 h-9 text-sm bg-white">
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-lg z-50">
                    <SelectItem value="none">No sorting</SelectItem>
                    {sortableFields.map(field => (
                      <SelectItem key={field.key} value={field.key}>
                        {field.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {sortField && sortField !== 'none' && (
                  <Select value={sortOrder} onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}>
                    <SelectTrigger className="w-32 h-9 text-sm bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg z-50">
                      <SelectItem value="desc">High to Low</SelectItem>
                      <SelectItem value="asc">Low to High</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        {/* Results Display */}
        <div className="space-y-2 mb-6">
          {sortedResults.map((asset, index) => 
            primaryAssetType === 'mutual-fund' ? (
              <CompactMutualFundCard key={`mf-${getDisplayName(asset)}-${index}`} fund={asset} index={index} />
            ) : (
              <CompactStockCard key={`stock-${getDisplayName(asset)}-${index}`} stock={asset} index={index} />
            )
          )}
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
