
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Filter, X } from 'lucide-react';
import { useFilterOptions } from '@/hooks/useFilterOptions';

interface FilterPanelProps {
  assetType: string;
  onFiltersChange: (filters: any) => void;
  onIPOStatusChange?: (status: string) => void;
  selectedIPOStatus?: string;
}

const FilterPanel = ({ assetType, onFiltersChange, onIPOStatusChange, selectedIPOStatus }: FilterPanelProps) => {
  console.log('🔍 FilterPanel render - assetType:', assetType);
  
  const [filters, setFilters] = useState<any>({});
  const [appliedFiltersCount, setAppliedFiltersCount] = useState(0);
  
  const { filterOptions, isLoading: isLoadingOptions, error: optionsError } = useFilterOptions(assetType);
  
  console.log('🔍 FilterPanel state:', {
    assetType,
    shouldFetchOptions: !!assetType && assetType !== '',
    isLoadingOptions,
    hasFilterOptions: !!filterOptions,
    optionsError
  });

  useEffect(() => {
    console.log('🔍 FilterPanel useEffect - Component mounted/updated');
  }, []);

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Count applied filters
    const count = Object.values(newFilters).filter(v => 
      v !== null && v !== undefined && v !== '' && 
      (Array.isArray(v) ? v.length > 0 : true)
    ).length;
    setAppliedFiltersCount(count);
    
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    setAppliedFiltersCount(0);
    onFiltersChange({});
  };

  const renderIPOFilters = () => {
    console.log('🔍 renderIPOFilters called');
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="ipo-status" className="text-sm font-medium">IPO Status</Label>
          <Select 
            value={selectedIPOStatus || "upcoming"} 
            onValueChange={(value) => {
              console.log('IPO status changed to:', value);
              if (onIPOStatusChange) {
                onIPOStatusChange(value);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="listed">Listed</SelectItem>
              <SelectItem value="withdrawn">Withdrawn</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };

  const renderStockFilters = () => {
    if (!filterOptions?.stocks) return null;

    const stockOptions = filterOptions.stocks;

    return (
      <div className="space-y-4">
        {/* Market Cap */}
        {stockOptions.market_cap && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Market Cap (₹ Cr)</Label>
            <div className="px-2">
              <Slider
                value={filters.market_cap || [stockOptions.market_cap.min, stockOptions.market_cap.max]}
                onValueChange={(value) => handleFilterChange('market_cap', value)}
                min={stockOptions.market_cap.min}
                max={stockOptions.market_cap.max}
                step={1000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹{(filters.market_cap?.[0] || stockOptions.market_cap.min).toLocaleString()}</span>
                <span>₹{(filters.market_cap?.[1] || stockOptions.market_cap.max).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* PE Ratio */}
        {stockOptions.pe_ratio && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">P/E Ratio</Label>
            <div className="px-2">
              <Slider
                value={filters.pe_ratio || [stockOptions.pe_ratio.min, stockOptions.pe_ratio.max]}
                onValueChange={(value) => handleFilterChange('pe_ratio', value)}
                min={stockOptions.pe_ratio.min}
                max={stockOptions.pe_ratio.max}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{(filters.pe_ratio?.[0] || stockOptions.pe_ratio.min).toFixed(1)}</span>
                <span>{(filters.pe_ratio?.[1] || stockOptions.pe_ratio.max).toFixed(1)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Sector */}
        {stockOptions.sectors && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Sector</Label>
            <Select onValueChange={(value) => handleFilterChange('sector', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select sector" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                {stockOptions.sectors.map((sector: string) => (
                  <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Price Range */}
        {stockOptions.price_range && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Price Range (₹)</Label>
            <div className="px-2">
              <Slider
                value={filters.price_range || [stockOptions.price_range.min, stockOptions.price_range.max]}
                onValueChange={(value) => handleFilterChange('price_range', value)}
                min={stockOptions.price_range.min}
                max={stockOptions.price_range.max}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹{(filters.price_range?.[0] || stockOptions.price_range.min).toLocaleString()}</span>
                <span>₹{(filters.price_range?.[1] || stockOptions.price_range.max).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderMutualFundFilters = () => {
    if (!filterOptions?.mutual_funds) return null;

    const mfOptions = filterOptions.mutual_funds;

    return (
      <div className="space-y-4">
        {/* Fund Category */}
        {mfOptions.categories && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Category</Label>
            <Select onValueChange={(value) => handleFilterChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                {mfOptions.categories.map((category: string) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* AUM Range */}
        {mfOptions.aum_range && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">AUM (₹ Cr)</Label>
            <div className="px-2">
              <Slider
                value={filters.aum_range || [mfOptions.aum_range.min, mfOptions.aum_range.max]}
                onValueChange={(value) => handleFilterChange('aum_range', value)}
                min={mfOptions.aum_range.min}
                max={mfOptions.aum_range.max}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹{(filters.aum_range?.[0] || mfOptions.aum_range.min).toLocaleString()}</span>
                <span>₹{(filters.aum_range?.[1] || mfOptions.aum_range.max).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Expense Ratio */}
        {mfOptions.expense_ratio && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Expense Ratio (%)</Label>
            <div className="px-2">
              <Slider
                value={filters.expense_ratio || [mfOptions.expense_ratio.min, mfOptions.expense_ratio.max]}
                onValueChange={(value) => handleFilterChange('expense_ratio', value)}
                min={mfOptions.expense_ratio.min}
                max={mfOptions.expense_ratio.max}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{(filters.expense_ratio?.[0] || mfOptions.expense_ratio.min).toFixed(1)}%</span>
                <span>{(filters.expense_ratio?.[1] || mfOptions.expense_ratio.max).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Returns */}
        {mfOptions.returns_1year && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">1 Year Returns (%)</Label>
            <div className="px-2">
              <Slider
                value={filters.returns_1year || [mfOptions.returns_1year.min, mfOptions.returns_1year.max]}
                onValueChange={(value) => handleFilterChange('returns_1year', value)}
                min={mfOptions.returns_1year.min}
                max={mfOptions.returns_1year.max}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{(filters.returns_1year?.[0] || mfOptions.returns_1year.min).toFixed(1)}%</span>
                <span>{(filters.returns_1year?.[1] || mfOptions.returns_1year.max).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Risk Level */}
        {mfOptions.risk_levels && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Risk Level</Label>
            <Select onValueChange={(value) => handleFilterChange('risk_level', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select risk level" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                {mfOptions.risk_levels.map((risk: string) => (
                  <SelectItem key={risk} value={risk}>{risk}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    );
  };

  console.log('🔍 About to render FilterPanel');

  return (
    <Card className="w-full bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-600" />
            <h3 className="font-medium text-gray-900">Filters</h3>
            {appliedFiltersCount > 0 && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {appliedFiltersCount}
              </Badge>
            )}
          </div>
          {appliedFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={14} className="mr-1" />
              Clear
            </Button>
          )}
        </div>

        {isLoadingOptions && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="ml-2 text-sm text-gray-600">Loading filter options...</span>
          </div>
        )}

        {optionsError && (
          <div className="py-4 text-center">
            <p className="text-red-600 text-sm">Failed to load filter options</p>
            <p className="text-gray-500 text-xs">{optionsError}</p>
          </div>
        )}

        {!isLoadingOptions && !optionsError && (
          <div className="space-y-4">
            {assetType === 'stock' && renderStockFilters()}
            {assetType === 'mutual-fund' && renderMutualFundFilters()}
            {assetType === 'ipo' && renderIPOFilters()}
            
            {!assetType && (
              <p className="text-gray-500 text-sm text-center py-4">
                Select an asset type to see available filters
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
