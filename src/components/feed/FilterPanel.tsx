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

  // Enhanced helper function with detailed logging
  const getValidSelectOptions = (options: any[] | undefined, fieldName: string, assetType: string) => {
    console.log(`=== VALIDATING SELECT OPTIONS FOR ${assetType.toUpperCase()} - ${fieldName} ===`);
    console.log('Raw options:', options);
    
    if (!Array.isArray(options)) {
      console.log('Not an array, returning empty array');
      return [];
    }
    
    const validOptions = options.filter((option, index) => {
      console.log(`Checking option ${index}:`, option);
      
      if (!option || typeof option !== 'object') {
        console.log(`Option ${index} rejected: not an object`);
        return false;
      }
      
      // Get the value from different possible fields
      const value = option.value || option.name || option.label;
      console.log(`Option ${index} value extracted:`, value, typeof value);
      
      // STRICT CHECK: Filter out empty strings, null, undefined, and non-strings
      const isValid = value && 
                     typeof value === 'string' && 
                     value.trim() !== '' && 
                     value !== ''; // Explicitly check for empty string
      
      if (!isValid) {
        console.log(`Option ${index} REJECTED - value: "${value}", type: ${typeof value}`);
      } else {
        console.log(`Option ${index} ACCEPTED - value: "${value}"`);
      }
      
      return isValid;
    });
    
    console.log(`Final valid options for ${fieldName}:`, validOptions.length, 'out of', options.length);
    console.log('Valid options:', validOptions);
    return validOptions;
  };

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
    console.log('=== RENDERING STOCK FILTERS ===');
    // Don't render until filter options are loaded
    if (isLoadingOptions || !filterOptions?.stocks) {
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading filter options...</span>
        </div>
      );
    }

    const stockOptions = filterOptions.stocks;
    console.log('Stock options from API:', stockOptions);
    
    const validSectors = getValidSelectOptions(stockOptions?.sectors, 'sectors', 'stock');
    const validGrowthTypes = getValidSelectOptions(stockOptions?.growth_types, 'growth_types', 'stock');

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

        {/* Sector - Only render when we have valid options */}
        {validSectors.length > 0 && (
          <div>
            <Label htmlFor="sector">Sector</Label>
            <Select onValueChange={(value) => updateFilter('sector', [value])}>
              <SelectTrigger>
                <SelectValue placeholder="Select sector" />
              </SelectTrigger>
              <SelectContent>
                {validSectors.map((sector) => {
                  console.log('Rendering sector option:', sector);
                  return (
                    <SelectItem key={sector.value} value={sector.value}>
                      {sector.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Growth Types - Only render when we have valid options */}
        {validGrowthTypes.length > 0 && (
          <div>
            <Label htmlFor="growthType">Growth Type</Label>
            <Select onValueChange={(value) => updateFilter('growthType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select growth type" />
              </SelectTrigger>
              <SelectContent>
                {validGrowthTypes.map((growthType) => {
                  console.log('Rendering growth type option:', growthType);
                  return (
                    <SelectItem key={growthType.value} value={growthType.value}>
                      {growthType.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        )}

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
    console.log('=== RENDERING MUTUAL FUND FILTERS ===');
    // Don't render until filter options are loaded
    if (isLoadingOptions || !filterOptions?.mutual_funds) {
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading filter options...</span>
        </div>
      );
    }

    const mfOptions = filterOptions.mutual_funds;
    console.log('Mutual fund options from API:', mfOptions);
    
    const validCategories = getValidSelectOptions(mfOptions?.categories, 'categories', 'mutual-fund');
    const validRiskLevels = getValidSelectOptions(mfOptions?.risk_levels, 'risk_levels', 'mutual-fund');
    const validExpenseRatios = getValidSelectOptions(mfOptions?.expense_ratio_options, 'expense_ratio_options', 'mutual-fund');
    const validAmcNames = getValidSelectOptions(mfOptions?.amc_names?.slice(0, 20), 'amc_names', 'mutual-fund');
    const validReturn1yOptions = getValidSelectOptions(mfOptions?.return_1y_options, 'return_1y_options', 'mutual-fund');
    const validAumOptions = getValidSelectOptions(mfOptions?.aum_options, 'aum_options', 'mutual-fund');

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Only render Select components when we have valid data */}
        {validCategories.length > 0 && (
          <div>
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => updateFilter('category', [value])}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {validCategories.map((category) => {
                  console.log('Rendering category option:', category);
                  return (
                    <SelectItem key={category.value} value={category.value}>
                      {category.name} ({category.count})
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        )}

        {validRiskLevels.length > 0 && (
          <div>
            <Label htmlFor="riskLevel">Risk Level</Label>
            <Select onValueChange={(value) => updateFilter('riskLevel', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select risk level" />
              </SelectTrigger>
              <SelectContent>
                {validRiskLevels.map((risk) => {
                  console.log('Rendering risk level option:', risk);
                  return (
                    <SelectItem key={risk.value} value={risk.value}>
                      {risk.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        )}

        {validExpenseRatios.length > 0 && (
          <div>
            <Label htmlFor="expenseRatio">Expense Ratio</Label>
            <Select onValueChange={(value) => updateFilter('expenseRatio', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select expense ratio" />
              </SelectTrigger>
              <SelectContent>
                {validExpenseRatios.map((ratio) => {
                  console.log('Rendering expense ratio option:', ratio);
                  return (
                    <SelectItem 
                      key={ratio.label} 
                      value={ratio.value !== null ? ratio.value.toString() : 'any'}
                    >
                      {ratio.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        )}

        {validAmcNames.length > 0 && (
          <div>
            <Label htmlFor="amcName">AMC Name</Label>
            <Select onValueChange={(value) => updateFilter('amcName', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select AMC" />
              </SelectTrigger>
              <SelectContent>
                {validAmcNames.map((amc) => {
                  console.log('Rendering AMC option:', amc);
                  return (
                    <SelectItem key={amc.value} value={amc.value}>
                      {amc.name} ({amc.count})
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        )}

        {validReturn1yOptions.length > 0 && (
          <div>
            <Label>1-Year Returns</Label>
            <Select onValueChange={(value) => updateFilter('returns1y', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select return range" />
              </SelectTrigger>
              <SelectContent>
                {validReturn1yOptions.map((returnOption) => {
                  console.log('Rendering return option:', returnOption);
                  return (
                    <SelectItem 
                      key={returnOption.label} 
                      value={returnOption.value !== null ? returnOption.value.toString() : 'any'}
                    >
                      {returnOption.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        )}

        {validAumOptions.length > 0 && (
          <div>
            <Label>AUM</Label>
            <Select onValueChange={(value) => updateFilter('aum', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select AUM range" />
              </SelectTrigger>
              <SelectContent>
                {validAumOptions.map((aumOption) => {
                  console.log('Rendering AUM option:', aumOption);
                  return (
                    <SelectItem 
                      key={aumOption.label} 
                      value={aumOption.min_value !== null ? aumOption.min_value.toString() : 'any'}
                    >
                      {aumOption.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    );
  };

  const renderIPOFilters = () => {
    console.log('=== RENDERING IPO FILTERS ===');
    // Don't render until filter options are loaded
    if (isLoadingOptions || !filterOptions?.ipos) {
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading filter options...</span>
        </div>
      );
    }

    const ipoOptions = filterOptions.ipos;
    console.log('IPO options from API:', ipoOptions);
    
    const validStatusOptions = getValidSelectOptions(ipoOptions?.status_options, 'status_options', 'ipo');

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {validStatusOptions.length > 0 && (
          <div>
            <Label htmlFor="status">IPO Status</Label>
            <Select onValueChange={(value) => updateFilter('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {validStatusOptions.map((status) => {
                  console.log('Rendering IPO status option:', status);
                  return (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        )}
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
