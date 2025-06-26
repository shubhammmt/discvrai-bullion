
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { X, FolderPlus } from 'lucide-react';
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

  return (
    <Card className="mb-4 bg-white/90 backdrop-blur-md border-blue-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            Stock Search Results
            <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-normal">
              "{query}" - {totalRecords} found
            </span>
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onDismiss}
            className="h-8 w-8 p-0 hover:bg-red-50"
          >
            <X size={16} className="text-gray-500" />
          </Button>
        </div>
        <div className="text-sm text-gray-600">
          Showing {startResult}-{endResult} of {totalRecords} results
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Company</TableHead>
                {sortedKeys.slice(0, 8).map(key => (
                  <TableHead key={key} className="font-semibold whitespace-nowrap">
                    {formatFieldName(key)}
                  </TableHead>
                ))}
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((stock, index) => (
                <TableRow key={`${stock.company_name}-${index}`} className="hover:bg-blue-50/50">
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-semibold">{stock.company_name}</div>
                      {stock.sector && (
                        <div className="text-xs text-gray-500">{stock.sector}</div>
                      )}
                    </div>
                  </TableCell>
                  {sortedKeys.slice(0, 8).map(key => (
                    <TableCell key={key} className="whitespace-nowrap">
                      {stock[key] !== null && stock[key] !== undefined 
                        ? formatFieldValue(key, stock[key])
                        : 'N/A'
                      }
                    </TableCell>
                  ))}
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
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
        
        {sortedKeys.length > 8 && (
          <div className="mt-2 text-xs text-gray-500">
            Showing top 8 columns. Full details available on individual stock pages.
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
