
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
    <Card key={`${stock.company_name}-${index}`} className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{stock.company_name}</h3>
            {stock.sector && (
              <p className="text-sm text-gray-500">{stock.sector}</p>
            )}
          </div>
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
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          {sortedKeys.slice(0, 6).map(key => (
            stock[key] !== null && stock[key] !== undefined && (
              <div key={key} className="flex flex-col">
                <span className="text-gray-500 text-xs font-medium">
                  {formatFieldName(key)}
                </span>
                <span className="font-semibold">
                  {formatFieldValue(key, stock[key])}
                </span>
              </div>
            )
          ))}
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-3"
          onClick={() => {/* TODO: Navigate to stock details */}}
        >
          <Eye size={14} className="mr-1" />
          View Details
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <Card className="mb-4 bg-white/90 backdrop-blur-md border-blue-200">
      <CardHeader className="pb-3 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-lg">
            <span>Stock Search Results</span>
            <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-normal w-fit">
              "{query}" - {totalRecords} found
            </span>
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onDismiss}
            className="h-8 w-8 p-0 hover:bg-red-50 self-end sm:self-auto"
          >
            <X size={16} className="text-gray-500" />
          </Button>
        </div>
        <div className="text-sm text-gray-600">
          Showing {startResult}-{endResult} of {totalRecords} results
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        {/* Mobile view - Cards */}
        <div className="block sm:hidden">
          <div className="space-y-4">
            {results.map((stock, index) => (
              <MobileStockCard key={`mobile-${stock.company_name}-${index}`} stock={stock} index={index} />
            ))}
          </div>
        </div>

        {/* Desktop view - Table */}
        <div className="hidden sm:block">
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
              <PaginationContent className="flex-wrap">
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                    className={currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => onPageChange(pageNum)}
                        isActive={currentPage === pageNum}
                        className="cursor-pointer"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                    className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
        
        {sortedKeys.length > 6 && (
          <div className="mt-2 text-xs text-gray-500">
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
