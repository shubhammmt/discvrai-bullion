
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { X, FolderPlus, Eye } from 'lucide-react';
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

  // Prioritize important columns
  const priorityColumns = ['current_price', 'market_cap', 'pe_ratio', 'roe', 'roic', 'net_margin', 'sector'];
  const sortedKeys = [
    ...priorityColumns.filter(key => allKeys.includes(key)),
    ...allKeys.filter(key => !priorityColumns.includes(key))
  ];

  const startResult = (currentPage - 1) * pageSize + 1;
  const endResult = Math.min(currentPage * pageSize, totalRecords);

  // Mobile card view for small screens
  const MobileStockCard = ({ stock, index }: { stock: any; index: number }) => (
    <Card key={`${stock.company_name}-${index}`} className="mb-3">
      <CardContent className="p-3">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="font-semibold text-sm leading-tight truncate">{stock.company_name}</h3>
            {stock.sector && (
              <p className="text-xs text-gray-500 truncate">{stock.sector}</p>
            )}
          </div>
          <PortfolioAddModal
            assetName={stock.company_name}
            assetSymbol={stock.company_name}
            assetType="stock"
            currentPrice={stock.current_price}
            trigger={
              <Button size="sm" variant="outline" className="text-green-700 border-green-200 hover:bg-green-50 flex-shrink-0">
                <FolderPlus size={12} className="mr-1" />
                Add
              </Button>
            }
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          {sortedKeys.slice(0, 6).map(key => (
            stock[key] !== null && stock[key] !== undefined && (
              <div key={key} className="flex flex-col min-w-0">
                <span className="text-gray-500 text-xs font-medium truncate">
                  {formatFieldName(key)}
                </span>
                <span className="font-semibold truncate">
                  {formatFieldValue(key, stock[key])}
                </span>
              </div>
            )
          ))}
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-3 text-xs"
          onClick={() => {/* TODO: Navigate to stock details */}}
        >
          <Eye size={12} className="mr-1" />
          View Details
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <Card className="mb-4 bg-white/90 backdrop-blur-md border-blue-200">
      <CardHeader className="pb-3 p-3 sm:p-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="flex flex-col gap-2 text-base sm:text-lg min-w-0 flex-1">
              <span className="truncate">Stock Search Results</span>
              <div className="text-xs sm:text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-normal w-fit">
                <span className="block sm:inline">"{query.length > 20 ? query.substring(0, 20) + '...' : query}"</span>
                <span className="block sm:inline sm:ml-1">- {totalRecords} found</span>
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
          <div className="text-xs sm:text-sm text-gray-600">
            Showing {startResult}-{endResult} of {totalRecords} results
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-6">
        {/* Mobile view - Cards */}
        <div className="block md:hidden">
          <div className="space-y-3">
            {results.map((stock, index) => (
              <MobileStockCard key={`mobile-${stock.company_name}-${index}`} stock={stock} index={index} />
            ))}
          </div>
        </div>

        {/* Desktop/Tablet view - Table */}
        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold min-w-[150px]">Company</TableHead>
                  {sortedKeys.slice(0, 6).map(key => (
                    <TableHead key={key} className="font-semibold whitespace-nowrap min-w-[100px]">
                      {formatFieldName(key)}
                    </TableHead>
                  ))}
                  <TableHead className="font-semibold min-w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((stock, index) => (
                  <TableRow key={`${stock.company_name}-${index}`} className="hover:bg-blue-50/50">
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-semibold text-sm lg:text-base">{stock.company_name}</div>
                        {stock.sector && (
                          <div className="text-xs text-gray-500">{stock.sector}</div>
                        )}
                      </div>
                    </TableCell>
                    {sortedKeys.slice(0, 6).map(key => (
                      <TableCell key={key} className="whitespace-nowrap text-sm">
                        {stock[key] !== null && stock[key] !== undefined 
                          ? formatFieldValue(key, stock[key])
                          : 'N/A'
                        }
                      </TableCell>
                    ))}
                    <TableCell>
                      <div className="flex gap-1">
                        <PortfolioAddModal
                          assetName={stock.company_name}
                          assetSymbol={stock.company_name}
                          assetType="stock"
                          currentPrice={stock.current_price}
                          trigger={
                            <Button size="sm" variant="outline" className="text-green-700 border-green-200 hover:bg-green-50">
                              <FolderPlus size={14} className="mr-1" />
                              <span className="hidden lg:inline">Add</span>
                            </Button>
                          }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent className="flex-wrap gap-1">
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                    className={`text-xs sm:text-sm ${currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
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
                        className="cursor-pointer text-xs sm:text-sm min-w-[32px] h-8"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                    className={`text-xs sm:text-sm ${currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
        
        {sortedKeys.length > 6 && (
          <div className="mt-2 text-xs text-gray-500 text-center">
            <span className="hidden sm:inline">Showing top 6 columns.</span>
            <span className="sm:hidden">Showing key metrics.</span>
            {' '}Full details available on individual stock pages.
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
