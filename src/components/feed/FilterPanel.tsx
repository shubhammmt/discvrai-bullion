
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Loader2 } from 'lucide-react';
import { AssetType, SearchFilters, RangeFilter } from '@/utils/unifiedSearchApi';
import { useFilterOptions } from '@/hooks/useFilterOptions';

interface FilterPanelProps {
  assetType: AssetType;
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const FilterPanel = ({ assetType, filters, onFiltersChange, onSearch, isLoading }: FilterPanelProps) => {
  const { filterOptions, isLoading: isLoadingOptions, error: optionsError } = useFilterOptions();

  // Add debugging logs
  useEffect(() => {
    console.log('FilterPanel state:', {
      assetType,
      isLoadingOptions,
      hasFilterOptions: !!filterOptions,
      optionsError,
      filterOptionsKeys: filterOptions ? Object.keys(filterOptions) : null
    });
  }, [assetType, isLoadingOptions, filterOptions, optionsError]);

  const updateFilter = (key: string, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const updateRangeFilter = (key: string, field: 'min' | 'max', value: string) => {
    const currentFilter = filters[key] as RangeFilter || {};
    const numValue = value === '' ? undefined : parseFloat(value);
    
    const newFilter = {
      ...currentFilter,
      [field]: numValue
    };
    
    // Remove the filter if both min and max are empty
    if (newFilter.min === undefined && newFilter.max === undefined) {
      const newFilters = { ...filters };
      delete newFilters[key];
      onFiltersChange(newFilters);
    } else {
      updateFilter(key, newFilter);
    }
  };

  const removeFilter = (key: string) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const renderStockFilters = () => {
    if (isLoadingOptions) {
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading filter options...</span>
        </div>
      );
    }

    const stockOptions = filterOptions?.stocks;
    console.log('Stock options:', stockOptions);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Market Cap Range - Min/Max Inputs */}
        <div>
          <Label>Market Cap (₹ Crores)</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Min"
              type="number"
              value={(filters.market_cap as RangeFilter)?.min || ''}
              onChange={(e) => updateRangeFilter('market_cap', 'min', e.target.value)}
            />
            <Input
              placeholder="Max"
              type="number"
              value={(filters.market_cap as RangeFilter)?.max || ''}
              onChange={(e) => updateRangeFilter('market_cap', 'max', e.target.value)}
            />
          </div>
        </div>

        {/* PE Ratio Range - Min/Max Inputs */}
        <div>
          <Label>PE Ratio</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Min"
              type="number"
              value={(filters.pe_ratio as RangeFilter)?.min || ''}
              onChange={(e) => updateRangeFilter('pe_ratio', 'min', e.target.value)}
            />
            <Input
              placeholder="Max"
              type="number"
              value={(filters.pe_ratio as RangeFilter)?.max || ''}
              onChange={(e) => updateRangeFilter('pe_ratio', 'max', e.target.value)}
            />
          </div>
        </div>

        {/* Current Price Range - Min/Max Inputs */}
        <div>
          <Label>Price Range (₹)</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Min"
              type="number"
              value={(filters.current_price as RangeFilter)?.min || ''}
              onChange={(e) => updateRangeFilter('current_price', 'min', e.target.value)}
            />
            <Input
              placeholder="Max"
              type="number"
              value={(filters.current_price as RangeFilter)?.max || ''}
              onChange={(e) => updateRangeFilter('current_price', 'max', e.target.value)}
            />
          </div>
        </div>

        {/* Sector - From API */}
        <div>
          <Label htmlFor="sector">Sector</Label>
          <Select onValueChange={(value) => updateFilter('sector', [value])}>
            <SelectTrigger>
              <SelectValue placeholder="Select sector" />
            </SelectTrigger>
            <SelectContent>
              {stockOptions?.sectors?.filter(sector => sector.value !== "").map((sector) => (
                <SelectItem key={sector.value} value={sector.value}>
                  {sector.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Revenue Growth - Min/Max Inputs */}
        <div>
          <Label>Revenue Growth (YoY %)</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Min"
              type="number"
              value={(filters.revenue_growth_1y as RangeFilter)?.min || ''}
              onChange={(e) => updateRangeFilter('revenue_growth_1y', 'min', e.target.value)}
            />
            <Input
              placeholder="Max"
              type="number"
              value={(filters.revenue_growth_1y as RangeFilter)?.max || ''}
              onChange={(e) => updateRangeFilter('revenue_growth_1y', 'max', e.target.value)}
            />
          </div>
        </div>

        {/* ROE Range - Min/Max Inputs */}
        <div>
          <Label>ROE (%)</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Min"
              type="number"
              value={(filters.roe as RangeFilter)?.min || ''}
              onChange={(e) => updateRangeFilter('roe', 'min', e.target.value)}
            />
            <Input
              placeholder="Max"
              type="number"
              value={(filters.roe as RangeFilter)?.max || ''}
              onChange={(e) => updateRangeFilter('roe', 'max', e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderMutualFundFilters = () => {
    if (isLoadingOptions) {
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading filter options...</span>
        </div>
      );
    }

    const mfOptions = filterOptions?.mutual_funds;
    console.log('Mutual fund options:', mfOptions);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Category */}
        <div>
          <Label htmlFor="category">Category</Label>
          <Select onValueChange={(value) => updateFilter('category', [value])}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {mfOptions?.categories?.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.name} ({category.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Risk Level */}
        <div>
          <Label htmlFor="riskLevel">Risk Level</Label>
          <Select onValueChange={(value) => updateFilter('riskLevel', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select risk level" />
            </SelectTrigger>
            <SelectContent>
              {mfOptions?.risk_levels?.map((risk) => (
                <SelectItem key={risk.value} value={risk.value}>
                  {risk.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Expense Ratio */}
        <div>
          <Label htmlFor="expenseRatio">Expense Ratio</Label>
          <Select onValueChange={(value) => updateFilter('expenseRatio', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select expense ratio" />
            </SelectTrigger>
            <SelectContent>
              {mfOptions?.expense_ratio_options?.map((ratio) => (
                <SelectItem 
                  key={ratio.label} 
                  value={ratio.value !== null ? ratio.value.toString() : 'any'}
                >
                  {ratio.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* AMC Name */}
        <div>
          <Label htmlFor="amcName">AMC Name</Label>
          <Select onValueChange={(value) => updateFilter('amcName', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select AMC" />
            </SelectTrigger>
            <SelectContent>
              {mfOptions?.amc_names?.slice(0, 20).map((amc) => (
                <SelectItem key={amc.value} value={amc.value}>
                  {amc.name} ({amc.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 1-Year Returns */}
        <div>
          <Label>1-Year Returns</Label>
          <Select onValueChange={(value) => updateFilter('returns1y', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select return range" />
            </SelectTrigger>
            <SelectContent>
              {mfOptions?.return_1y_options?.map((returnOption) => (
                <SelectItem 
                  key={returnOption.label} 
                  value={returnOption.value !== null ? returnOption.value.toString() : 'any'}
                >
                  {returnOption.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* AUM */}
        <div>
          <Label>AUM</Label>
          <Select onValueChange={(value) => updateFilter('aum', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select AUM range" />
            </SelectTrigger>
            <SelectContent>
              {mfOptions?.aum_options?.map((aumOption) => (
                <SelectItem 
                  key={aumOption.label} 
                  value={aumOption.min_value !== null ? aumOption.min_value.toString() : 'any'}
                >
                  {aumOption.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };

  const renderIPOFilters = () => {
    if (isLoadingOptions) {
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading filter options...</span>
        </div>
      );
    }

    const ipoOptions = filterOptions?.ipos;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* IPO Status */}
        <div>
          <Label htmlFor="status">IPO Status</Label>
          <Select onValueChange={(value) => updateFilter('status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {ipoOptions?.status_options?.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };

  const formatFilterValue = (value: any): string => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (typeof value === 'object' && value !== null) {
      const rangeValue = value as RangeFilter;
      if (rangeValue.min !== undefined && rangeValue.max !== undefined) {
        return `${rangeValue.min} - ${rangeValue.max}`;
      }
      if (rangeValue.min !== undefined) {
        return `≥ ${rangeValue.min}`;
      }
      if (rangeValue.max !== undefined) {
        return `≤ ${rangeValue.max}`;
      }
    }
    return String(value);
  };

  const getActiveFilters = () => {
    return Object.entries(filters).filter(([_, value]) => 
      value !== undefined && value !== null && 
      (Array.isArray(value) ? value.length > 0 : true)
    );
  };

  const activeFilters = getActiveFilters();

  if (optionsError) {
    return (
      <div className="space-y-4">
        <div className="text-center py-8 text-red-600">
          <p>Failed to load filter options: {optionsError}</p>
          <Button variant="outline" onClick={() => window.location.reload()} className="mt-2">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Active Filters:</span>
          {activeFilters.map(([key, value]) => (
            <Badge key={key} variant="secondary" className="flex items-center gap-1">
              {key}: {formatFilterValue(value)}
              <X 
                size={12} 
                className="cursor-pointer" 
                onClick={() => removeFilter(key)}
              />
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
        </div>
      )}

      {/* Filter Forms */}
      {assetType === 'stock' && renderStockFilters()}
      {assetType === 'mutual-fund' && renderMutualFundFilters()}
      {assetType === 'ipo' && renderIPOFilters()}

      {/* Search Button */}
      <div className="flex justify-end pt-4">
        <Button onClick={onSearch} disabled={isLoading || isLoadingOptions}>
          {isLoading ? 'Searching...' : 'Apply Filters & Search'}
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
