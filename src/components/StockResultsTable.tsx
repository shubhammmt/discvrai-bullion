
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { X, FolderPlus, Eye, TrendingUp, TrendingDown, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
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

  // Handle sort click
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

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

  // Get sortable fields
  const sortableFields = [
    { key: 'name', label: primaryAssetType === 'mutual-fund' ? 'Fund Name' : 'Company Name', isSortable: true },
    ...displayKeys
      .filter(key => typeof results[0]?.[key] === 'number')
      .map(key => ({ key, label: formatFieldName(key), isSortable: true }))
  ];

  // Sort button component
  const SortButton = ({ field }: { field: string }) => {
    const isActive = sortField === field;
    const Icon = isActive ? (sortOrder === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown;
    
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleSort(field)}
        className={`h-6 px-1 ml-1 ${isActive ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <Icon size={12} />
      </Button>
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
          
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
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
        {/* Header Row with Labels and Sort Buttons */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg mb-4 overflow-x-auto">
          <div className="flex items-center min-w-max">
            {/* Name Column */}
            <div className="flex items-center justify-center px-3 py-3 border-r border-gray-200 min-w-[200px]">
              <span className="text-sm font-semibold text-gray-700">
                {primaryAssetType === 'mutual-fund' ? 'Fund Name' : 'Company Name'}
              </span>
              <SortButton field="name" />
            </div>
            
            {/* Data Columns */}
            {displayKeys.map((key) => (
              <div key={key} className="flex items-center justify-center px-3 py-3 border-r border-gray-200 last:border-r-0 min-w-[120px]">
                <span className="text-xs font-semibold text-gray-700 text-center">
                  {formatFieldName(key)}
                </span>
                {typeof results[0]?.[key] === 'number' && <SortButton field={key} />}
              </div>
            ))}
            
            {/* Action Column */}
            <div className="flex items-center justify-center px-3 py-3 min-w-[80px]">
              <span className="text-xs font-semibold text-gray-700">Action</span>
            </div>
          </div>
        </div>

        {/* Results Display - Values Only */}
        <div className="space-y-2 mb-6 overflow-x-auto">
          {sortedResults.map((asset, index) => {
            const displayName = getDisplayName(asset);
            const priceValue = getPriceValue(asset);
            
            return (
              <Card key={`${displayName}-${index}`} className="hover:shadow-md transition-all duration-200 border border-gray-200 bg-white">
                <CardContent className="p-0">
                  <div className="flex items-center min-w-max">
                    {/* Name Column */}
                    <div className="px-3 py-3 border-r border-gray-100 min-w-[200px]">
                      <div className="text-center">
                        <h3 className="font-semibold text-sm text-gray-900 leading-tight break-words mb-1">
                          {displayName}
                        </h3>
                        {(asset.amc_name || asset.sector) && (
                          <div className="text-xs text-gray-600">
                            {asset.amc_name || asset.sector}
                            {asset.main_category && <span> • {asset.main_category}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Data Columns */}
                    {displayKeys.map((key) => (
                      <div key={key} className="px-3 py-3 border-r border-gray-100 last:border-r-0 min-w-[120px]">
                        <div className="text-center">
                          <span className="text-sm font-medium text-gray-900">
                            {formatFieldValue(key, asset[key], primaryAssetType)}
                          </span>
                        </div>
                      </div>
                    ))}
                    
                    {/* Action Column */}
                    <div className="px-3 py-3 min-w-[80px]">
                      <div className="flex justify-center">
                        <PortfolioAddModal
                          assetName={displayName}
                          assetSymbol={asset.mf_schcode?.toString() || asset.symbol || displayName}
                          assetType={primaryAssetType}
                          currentPrice={priceValue}
                          trigger={
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white px-2.5 py-1.5 text-xs">
                              <FolderPlus size={12} className="mr-1" />
                              Add
                            </Button>
                          }
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
