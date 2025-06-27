
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { X, Plus, Eye, TrendingUp, TrendingDown, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useIsMobile } from '@/hooks/use-mobile';
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
  const isMobile = useIsMobile();

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
    
    // Handle market cap and AUM with proper formatting
    if (key === 'market_cap' || key === 'aum' || key === 'current_aum') {
      const croreValue = value / 10000000;
      return `₹${croreValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}Cr`;
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

  // Determine the primary asset type from results
  const primaryAssetType = results[0]?.assetType || 'stock';

  // Define essential fields only - limiting to core fields that existed earlier
  const getEssentialKeys = (assetType: string) => {
    if (assetType === 'mutual-fund') {
      return ['nav_price', 'current_aum', 'total_expense_ratio', 'ret_1year'];
    } else {
      return ['current_price', 'market_cap', 'pe_ratio', 'roe'];
    }
  };

  const displayKeys = getEssentialKeys(primaryAssetType);

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

  // Mobile Card Component
  const MobileResultCard = ({ asset, index }: { asset: any; index: number }) => {
    const displayName = getDisplayName(asset);
    const priceValue = getPriceValue(asset);
    
    return (
      <Card key={`${displayName}-${index}`} className="mb-3 border border-gray-200">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-gray-900 leading-tight">
                {displayName}
              </h3>
              {(asset.amc_name || asset.sector) && (
                <div className="text-xs text-gray-600 mt-1">
                  {asset.amc_name || asset.sector}
                  {asset.main_category && <span> • {asset.main_category}</span>}
                </div>
              )}
            </div>
            <PortfolioAddModal
              assetName={displayName}
              assetSymbol={asset.mf_schcode?.toString() || asset.symbol || displayName}
              assetType={primaryAssetType}
              currentPrice={priceValue}
              trigger={
                <button className="bg-green-600 hover:bg-green-700 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm hover:shadow-md ml-2">
                  <Plus size={12} />
                </button>
              }
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {displayKeys.map((key) => (
              <div key={key} className="flex justify-between">
                <span className="text-xs text-gray-500">
                  {formatFieldName(key)}:
                </span>
                <span className="text-xs font-medium text-gray-900">
                  {formatFieldValue(key, asset[key], primaryAssetType)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <TooltipProvider>
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
          {/* Mobile Layout */}
          {isMobile ? (
            <div className="space-y-3">
              {sortedResults.map((asset, index) => (
                <MobileResultCard key={`mobile-${index}`} asset={asset} index={index} />
              ))}
            </div>
          ) : (
            /* Desktop Table Layout */
            <div className="w-full overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full table-fixed border-collapse">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="w-[35%] px-4 py-3 text-left">
                      <div className="flex items-center">
                        <span className="text-sm font-semibold text-gray-700">
                          {primaryAssetType === 'mutual-fund' ? 'Fund Name' : 'Company Name'}
                        </span>
                        <SortButton field="name" />
                      </div>
                    </th>
                    {displayKeys.map((key) => (
                      <th key={key} className="w-[15%] px-2 py-3 text-center">
                        <div className="flex items-center justify-center">
                          <span className="text-xs font-semibold text-gray-700">
                            {formatFieldName(key)}
                          </span>
                          {typeof results[0]?.[key] === 'number' && <SortButton field={key} />}
                        </div>
                      </th>
                    ))}
                    <th className="w-[10%] px-2 py-3 text-center">
                      <span className="text-xs font-semibold text-gray-700">Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedResults.map((asset, index) => {
                    const displayName = getDisplayName(asset);
                    const priceValue = getPriceValue(asset);
                    
                    return (
                      <tr key={`${displayName}-${index}`} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        {/* Name Column with Tooltip and Truncation */}
                        <td className="px-4 py-3">
                          <div className="text-left">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <h3 className="font-semibold text-sm text-gray-900 leading-tight truncate cursor-pointer hover:text-blue-600 transition-colors">
                                  {displayName}
                                </h3>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">{displayName}</p>
                              </TooltipContent>
                            </Tooltip>
                            {(asset.amc_name || asset.sector) && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="text-xs text-gray-600 truncate mt-1 cursor-pointer">
                                    {asset.amc_name || asset.sector}
                                    {asset.main_category && <span> • {asset.main_category}</span>}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">{asset.amc_name || asset.sector}{asset.main_category && <span> • {asset.main_category}</span>}</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                        </td>
                        
                        {/* Data Columns */}
                        {displayKeys.map((key) => (
                          <td key={key} className="px-2 py-3 text-center">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="text-sm font-medium text-gray-900 cursor-pointer truncate block">
                                  {formatFieldValue(key, asset[key], primaryAssetType)}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{formatFieldValue(key, asset[key], primaryAssetType)}</p>
                              </TooltipContent>
                            </Tooltip>
                          </td>
                        ))}
                        
                        {/* Action Column - Fixed centering */}
                        <td className="px-2 py-3">
                          <div className="flex items-center justify-center">
                            <PortfolioAddModal
                              assetName={displayName}
                              assetSymbol={asset.mf_schcode?.toString() || asset.symbol || displayName}
                              assetType={primaryAssetType}
                              currentPrice={priceValue}
                              trigger={
                                <button className="bg-green-600 hover:bg-green-700 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm hover:shadow-md">
                                  <Plus size={12} />
                                </button>
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
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
          
          {isLoading && (
            <div className="mt-4 text-center text-sm text-gray-500">
              Loading...
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default StockResultsTable;
